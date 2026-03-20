#!/usr/bin/env python3
"""Generate German TTS mp3s for IT dialogues using Google Cloud TTS API (Neural2).

Each speaker gets a distinct voice for natural dialogue flow.
"""

import json
import base64
import os
import re
import subprocess
import urllib.request

PROJECT = "german-app-490611"
RATE = 1.0

# Voice assignments -- distinct voice per speaker
SPEAKER_VOICES = {
    "Sarah": "de-DE-Neural2-A",   # Female 1
    "Jan":   "de-DE-Neural2-D",   # Male 1
    "Lukas": "de-DE-Neural2-B",   # Male 2
    "Katja": "de-DE-Neural2-C",   # Female 2
    "Marco": "de-DE-Wavenet-E",    # Male 3 (Neural2 only has A-D for de-DE)
}

DEFAULT_VOICE = "de-DE-Neural2-D"

def get_token():
    return subprocess.check_output(["gcloud", "auth", "print-access-token"]).decode().strip()

def synthesize(text, voice, outfile, token):
    if os.path.exists(outfile):
        return "skip"
    body = json.dumps({
        "input": {"text": text},
        "voice": {"languageCode": "de-DE", "name": voice},
        "audioConfig": {"audioEncoding": "MP3", "speakingRate": RATE}
    }).encode()
    req = urllib.request.Request(
        "https://texttospeech.googleapis.com/v1/text:synthesize",
        data=body,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "x-goog-user-project": PROJECT,
        }
    )
    try:
        resp = urllib.request.urlopen(req)
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", errors="replace")
        print(f"  ERROR {e.code}: {body_text[:200]}")
        return "error"
    data = json.loads(resp.read())
    audio = base64.b64decode(data["audioContent"])
    os.makedirs(os.path.dirname(outfile), exist_ok=True)
    with open(outfile, "wb") as f:
        f.write(audio)
    return "ok"


def clean_for_tts(text):
    """Remove smart quotes, stray quotes, and clean up for speech synthesis."""
    # Remove all types of quotation marks
    text = re.sub(r'[\u201C\u201D\u201E\u201F\u2018\u2019\u201A\u201B"\']+', '', text)
    # Remove @here
    text = text.replace('@here ', '')
    # Clean up double spaces
    text = re.sub(r'  +', ' ', text)
    return text.strip()


# --- Dialogue data ---
# We use triple-quoted strings to avoid escaping issues with quotes in dialogue text

DIALOGUES = []

# 1. Discovery Session
DIALOGUES.append(("discovery-session", [
    ("Sarah", """Okay Team, lasst uns den Opportunity Solution Tree von Teresa Torres heranziehen. Unser Desired Outcome ist die Steigerung des Customer Lifetime Value um 15 Prozent. Die Opportunity Hoher Drop-off im Checkout ist validiert. Jan, du hast die Solution One-Click Checkout im Baum. Aber bevor wir ins Delivery gehen, muessen wir die Four Big Risks nach Marty Cagan pruefen.""".replace("muessen", "m\u00fcssen").replace("pruefen", "pr\u00fcfen")),
    ("Jan", """Absolut. Ich fange beim Usability Risk an. Die Loesung klingt einfach, aber wir muessen evaluieren, ob die kognitive Last fuer den User zu hoch ist, wenn die Bestaetigung fehlt. Wir duerfen nicht in die Build Trap von Melissa Perri tappen und einfach Features raushauen, die am Ende niemand kapiert. Ich will diese Woche noch User Interviews fuehren, um die Desirability zu klaeren.""".replace("Loesung", "L\u00f6sung").replace("muessen", "m\u00fcssen").replace("fuer", "f\u00fcr").replace("Bestaetigung", "Best\u00e4tigung").replace("duerfen", "d\u00fcrfen").replace("fuehren", "f\u00fchren").replace("klaeren", "kl\u00e4ren")),
]))

# OK this is getting ridiculous. Let me just read the data file and extract the German text.

# Actually, let me take a completely different approach:
# Read the dialogue data from the TypeScript file and parse it.

DIALOGUES = []  # Reset

import sys
sys.path.insert(0, os.path.dirname(__file__))

# Hardcode the dialogues using a data file approach
DIALOGUE_FILE = os.path.join(os.path.dirname(__file__), "dialogue-texts.json")

def extract_dialogues_from_ts():
    """Parse the TypeScript data file to extract dialogue text."""
    ts_file = os.path.join(os.path.dirname(__file__), "..", "src", "data", "itDialogues.ts")
    with open(ts_file, "r", encoding="utf-8") as f:
        content = f.read()

    dialogues = []
    # Split by dialogue blocks
    blocks = content.split("id: '")[1:]
    for block in blocks:
        dialogue_id = block.split("'")[0]
        lines_section = block.split("lines: [")[1].split("\n    ],")[0] if "lines: [" in block else ""

        dialogue_lines = []
        # Find each { speaker: '...', de: '...', en: '...' }
        import re as re2
        pattern = r"speaker:\s*'([^']+)'.*?de:\s*'((?:[^'\\]|\\.)*?)'"
        for m in re2.finditer(pattern, lines_section, re2.DOTALL):
            speaker = m.group(1)
            de_text = m.group(2).replace("\\'", "'")
            dialogue_lines.append((speaker, de_text))

        if dialogue_lines:
            dialogues.append((dialogue_id, dialogue_lines))

    return dialogues


# --- Generate ---

if __name__ == "__main__":
    token = get_token()
    base = os.path.join(os.path.dirname(__file__), "..", "src", "assets", "audio", "dialoge")

    dialogues = extract_dialogues_from_ts()

    total = sum(len(lines) for _, lines in dialogues)
    done = 0

    for dialogue_id, lines in dialogues:
        for i, (speaker, text) in enumerate(lines):
            idx = str(i + 1).zfill(2)
            outfile = os.path.join(base, dialogue_id, f"{dialogue_id}-{idx}.mp3")
            voice = SPEAKER_VOICES.get(speaker, DEFAULT_VOICE)
            tts_text = clean_for_tts(text)
            status = synthesize(tts_text, voice, outfile, token)
            done += 1
            print(f"[{done}/{total}] {status}: {speaker} ({voice[-1]}) -> {dialogue_id}/{dialogue_id}-{idx}.mp3")

    print(f"\nDone! Generated audio for {total} lines across {len(dialogues)} dialogues.")
    print("\nVoice assignments:")
    for name, voice in SPEAKER_VOICES.items():
        print(f"  {name}: {voice}")
