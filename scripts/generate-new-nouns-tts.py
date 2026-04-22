#!/usr/bin/env python3
"""Generate TTS for new IT Nomen entries (index 51+)."""

import json
import base64
import os
import subprocess
import urllib.request

PROJECT = "german-app-490611"
VOICE = "de-DE-Neural2-D"
RATE = 0.95

def get_token():
    return subprocess.check_output(["gcloud", "auth", "print-access-token"]).decode().strip()

def synthesize(text, outfile, token):
    if os.path.exists(outfile):
        return "skip"
    body = json.dumps({
        "input": {"text": text},
        "voice": {"languageCode": "de-DE", "name": VOICE},
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
    resp = urllib.request.urlopen(req)
    data = json.loads(resp.read())
    audio = base64.b64decode(data["audioContent"])
    os.makedirs(os.path.dirname(outfile), exist_ok=True)
    with open(outfile, "wb") as f:
        f.write(audio)
    return "ok"

if __name__ == "__main__":
    with open("/tmp/new_noun_examples.json") as f:
        sentences = json.load(f)

    token = get_token()
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    print(f"Generating {len(sentences)} new noun audio files (index 51+)...")
    for i, text in enumerate(sentences):
        idx = i + 51  # Continue from existing 50
        outfile = os.path.join(base, "src", "assets", "audio", "nouns", f"nouns-{str(idx).zfill(2)}.mp3")
        status = synthesize(text, outfile, token)
        print(f"  [{i+1}/{len(sentences)}] {status}: {text[:60]}...")

    print("\nDone!")
