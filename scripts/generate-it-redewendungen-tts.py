#!/usr/bin/env python3
"""Generate German TTS mp3s for IT Redewendungen example sentences."""

import json
import base64
import os
import re
import subprocess
import urllib.request

PROJECT = "german-app-490611"
RATE = 1.0
VOICE = "de-DE-Neural2-D"

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

def extract_examples_from_ts():
    """Parse the techIdioms.ts file to extract example sentences."""
    ts_file = os.path.join(os.path.dirname(__file__), "..", "src", "data", "techIdioms.ts")
    with open(ts_file, "r", encoding="utf-8") as f:
        content = f.read()

    examples = []
    pattern = r"example:\s*'((?:[^'\\]|\\.)*?)'"
    for m in re.finditer(pattern, content):
        text = m.group(1).replace("\\'", "'")
        examples.append(text)
    return examples

if __name__ == "__main__":
    token = get_token()
    base = os.path.join(os.path.dirname(__file__), "..", "src", "assets", "audio", "it-redewendungen")

    examples = extract_examples_from_ts()
    total = len(examples)

    for i, text in enumerate(examples):
        idx = str(i + 1).zfill(2)
        outfile = os.path.join(base, f"it-redewendungen-{idx}.mp3")
        # Clean text for TTS
        clean = re.sub(r'[\u201C\u201D\u201E\u201F\u2018\u2019\u201A\u201B"\']+', '', text)
        clean = re.sub(r'  +', ' ', clean).strip()
        status = synthesize(clean, outfile, token)
        print(f"[{i+1}/{total}] {status}: {outfile.split('/')[-1]}")

    print(f"\nDone! Generated {total} audio files.")
