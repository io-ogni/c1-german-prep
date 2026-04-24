#!/usr/bin/env python3
"""Generate Google Cloud TTS MP3s for Schreiben Beispiele texts.

Reads example_texts from writing_prompts via Supabase REST API,
generates one MP3 per example text, stores in src/assets/audio/schreiben-beispiele/.

Naming: {prompt_sort_order}-beispiel-{1,2,3}.mp3
"""

import json
import base64
import os
import subprocess
import urllib.request

PROJECT = "german-app-490611"
VOICE = "de-DE-Neural2-D"
RATE = 0.95
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(BASE, "src", "assets", "audio", "schreiben-beispiele")


def get_token():
    return subprocess.check_output(["gcloud", "auth", "print-access-token"]).decode().strip()


def get_supabase_key():
    key_file = os.path.expanduser("~/.claude/projects/-Users-ioana-Ioanas-claude-code/.supabase-service-key")
    with open(key_file) as f:
        for line in f:
            if line.startswith("SUPABASE_SERVICE_ROLE_KEY="):
                return line.strip().split("=", 1)[1]
    raise RuntimeError("SUPABASE_SERVICE_ROLE_KEY not found")


def fetch_prompts_with_examples():
    key = get_supabase_key()
    url = "https://okoxjlhmjamacvlrnidr.supabase.co/rest/v1/writing_prompts"
    params = "?select=id,title_de,sort_order,example_texts&level=eq.almost_c1&order=sort_order"
    req = urllib.request.Request(
        url + params,
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
        }
    )
    resp = urllib.request.urlopen(req)
    return json.loads(resp.read())


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
    prompts = fetch_prompts_with_examples()
    token = get_token()

    total = 0
    generated = 0

    for p in prompts:
        examples = p.get("example_texts") or []
        if not examples:
            continue
        sort = p["sort_order"]
        title = p["title_de"]

        for i, ex in enumerate(examples):
            total += 1
            outfile = os.path.join(AUDIO_DIR, f"{str(sort).zfill(2)}-beispiel-{i+1}.mp3")
            text = ex.get("text", "")
            if not text:
                continue
            status = synthesize(text, outfile, token)
            if status == "ok":
                generated += 1
            print(f"  [{status}] {title} — Beispiel {i+1}")

    print(f"\nDone: {generated} generated, {total - generated} skipped (already exist)")
