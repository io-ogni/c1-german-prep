#!/usr/bin/env python3
"""Generate TTS mp3s for ALL reading texts using Google Cloud TTS API (Neural2).

For textrekonstruktion texts, fills in the gaps with correct answers
to produce a complete version of the text.

Reads text data directly from SQL migration files (no Supabase API needed).

Usage:
  1. Make sure you have gcloud CLI authenticated
  2. Run: python3 scripts/generate-reading-tts.py

Audio files: src/assets/audio/reading/reading-{sort_order:02d}.mp3
"""

import json
import base64
import os
import subprocess
import urllib.request
import re
import glob

PROJECT = "german-app-490611"
VOICE = "de-DE-Neural2-D"
RATE = 0.90  # Slightly slower for longer reading texts
BASE = "src/assets/audio/reading"
MIGRATIONS_DIR = "supabase/migrations"


def get_token():
    return subprocess.check_output(["gcloud", "auth", "print-access-token"]).decode().strip()


def synthesize(text, outfile, token):
    """Call Google Cloud TTS and write MP3 to outfile. Skip if file exists."""
    if os.path.exists(outfile):
        return "skip"

    # Google Cloud TTS has a 5000 byte limit per request.
    # For long texts, we need to split into chunks and concatenate.
    text_bytes = text.encode("utf-8")
    if len(text_bytes) > 4800:
        return synthesize_long(text, outfile, token)

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


def synthesize_long(text, outfile, token):
    """Split long text into paragraph chunks and concatenate MP3s."""
    # Split on paragraph breaks, keeping chunks under 4800 bytes
    paragraphs = text.split("\n\n")
    chunks = []
    current = ""
    for para in paragraphs:
        candidate = (current + "\n\n" + para).strip() if current else para
        if len(candidate.encode("utf-8")) > 4800:
            if current:
                chunks.append(current)
            current = para
        else:
            current = candidate
    if current:
        chunks.append(current)

    # If a single chunk is still too long, split on sentences
    final_chunks = []
    for chunk in chunks:
        if len(chunk.encode("utf-8")) > 4800:
            sentences = re.split(r'(?<=[.!?])\s+', chunk)
            sub = ""
            for s in sentences:
                candidate = (sub + " " + s).strip() if sub else s
                if len(candidate.encode("utf-8")) > 4800:
                    if sub:
                        final_chunks.append(sub)
                    sub = s
                else:
                    sub = candidate
            if sub:
                final_chunks.append(sub)
        else:
            final_chunks.append(chunk)

    # Synthesize each chunk
    audio_parts = []
    for i, chunk in enumerate(final_chunks):
        body = json.dumps({
            "input": {"text": chunk},
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
        audio_parts.append(base64.b64decode(data["audioContent"]))

    # Concatenate MP3 chunks (MP3 frames are self-contained, so simple concat works)
    os.makedirs(os.path.dirname(outfile), exist_ok=True)
    with open(outfile, "wb") as f:
        for part in audio_parts:
            f.write(part)
    return f"ok ({len(final_chunks)} chunks)"


def fill_gaps(text_content, questions):
    """Replace [___N___] markers with the correct answer text."""
    result = text_content
    if isinstance(questions, list):
        # Format B: per-gap array
        for item in questions:
            pos = str(item.get("position", ""))
            correct = item.get("correct", "")
            result = result.replace(f"[___{pos}___]", correct)
    elif isinstance(questions, dict) and "correct" in questions:
        # Format A: shared pool with correct map {gap_num: option_id}
        correct_map = questions["correct"]
        options = {opt["id"]: opt["text"] for opt in questions.get("options", [])}
        for gap_num, option_id in correct_map.items():
            answer_text = options.get(option_id, "")
            result = result.replace(f"[___{gap_num}___]", answer_text)
    return result


def clean_for_tts(text):
    """Clean text for better TTS output."""
    # Remove leftover gap markers
    text = re.sub(r'\[___\d+___\]', '', text)
    # Normalize quotes for speech
    text = text.replace('\u201e', '"').replace('\u201c', '"')
    # Clean up double spaces
    text = re.sub(r'  +', ' ', text)
    return text.strip()


def parse_sql_migrations():
    """Parse reading_texts INSERT statements from SQL migration files."""
    texts = []
    migration_files = sorted(glob.glob(os.path.join(MIGRATIONS_DIR, "*.sql")))

    for fpath in migration_files:
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()

        # Skip files that don't insert into reading_texts
        if "INSERT INTO reading_texts" not in content:
            continue

        # Extract each VALUES block — each INSERT may have multiple rows separated by ),\n\n
        # Find all INSERT statements
        insert_pattern = re.compile(
            r"INSERT INTO reading_texts\s*\([^)]+\)\s*VALUES\s*\n*(.*?);\s*$",
            re.DOTALL | re.MULTILINE
        )

        for insert_match in insert_pattern.finditer(content):
            values_block = insert_match.group(1)
            # Split into individual row value tuples
            # Each row starts with a comment line and then a parenthesized tuple
            # We need to find balanced parentheses for each row
            rows = split_sql_rows(values_block)
            for row_sql in rows:
                parsed = parse_row(row_sql)
                if parsed:
                    texts.append(parsed)

    texts.sort(key=lambda x: x["sort_order"])
    return texts


def split_sql_rows(values_block):
    """Split a VALUES block into individual row strings, handling nested parens and quotes."""
    rows = []
    i = 0
    length = len(values_block)

    while i < length:
        # Skip whitespace and comments
        while i < length and (values_block[i] in ' \t\n\r' or values_block[i:i+2] == '--'):
            if values_block[i:i+2] == '--':
                # Skip to end of line
                nl = values_block.find('\n', i)
                i = nl + 1 if nl != -1 else length
            else:
                i += 1

        if i >= length:
            break

        # Expect opening paren
        if values_block[i] != '(':
            i += 1
            continue

        # Find matching closing paren
        depth = 0
        start = i
        in_single_quote = False
        j = i
        while j < length:
            c = values_block[j]
            if in_single_quote:
                if c == "'" and j + 1 < length and values_block[j + 1] == "'":
                    j += 2  # escaped quote
                    continue
                elif c == "'":
                    in_single_quote = False
            else:
                if c == "'":
                    in_single_quote = True
                elif c == '(':
                    depth += 1
                elif c == ')':
                    depth -= 1
                    if depth == 0:
                        rows.append(values_block[start:j + 1])
                        i = j + 1
                        break
            j += 1
        else:
            break  # malformed, stop

        # Skip comma between rows
        while i < length and values_block[i] in ' \t\n\r,':
            i += 1

    return rows


def parse_row(row_sql):
    """Parse a single SQL VALUES row into a dict."""
    # Remove outer parens
    inner = row_sql.strip()
    if inner.startswith('(') and inner.endswith(')'):
        inner = inner[1:-1]

    # Extract fields by parsing SQL values
    fields = extract_sql_fields(inner)

    if len(fields) < 10:
        return None

    # Fields order: title_de, title_en, text_content, text_type, exam_format, level, word_count, estimated_minutes, questions, sort_order
    title_de = unescape_sql(fields[0])
    text_content = unescape_sql(fields[2])
    text_type = unescape_sql(fields[3])
    questions_str = unescape_sql(fields[8])
    sort_order = int(fields[9].strip())

    try:
        questions = json.loads(questions_str)
    except (json.JSONDecodeError, TypeError):
        questions = None

    return {
        "sort_order": sort_order,
        "title_de": title_de,
        "text_type": text_type,
        "text_content": text_content,
        "questions": questions,
    }


def extract_sql_fields(inner):
    """Extract comma-separated SQL values, respecting quotes and JSON."""
    fields = []
    i = 0
    length = len(inner)

    while i < length:
        # Skip whitespace
        while i < length and inner[i] in ' \t\n\r':
            i += 1

        if i >= length:
            break

        if inner[i] == "'":
            # Quoted string — find matching end quote
            i += 1  # skip opening quote
            value_parts = []
            while i < length:
                if inner[i] == "'" and i + 1 < length and inner[i + 1] == "'":
                    value_parts.append("'")
                    i += 2
                elif inner[i] == "'":
                    i += 1  # skip closing quote
                    break
                else:
                    value_parts.append(inner[i])
                    i += 1
            fields.append("'" + "".join(value_parts) + "'")
        else:
            # Unquoted value (number, NULL, etc)
            start = i
            while i < length and inner[i] != ',':
                i += 1
            fields.append(inner[start:i].strip())

        # Skip comma
        while i < length and inner[i] in ' \t\n\r':
            i += 1
        if i < length and inner[i] == ',':
            i += 1

    return fields


def unescape_sql(val):
    """Remove surrounding quotes and unescape SQL string."""
    val = val.strip()
    if val.startswith("'") and val.endswith("'"):
        val = val[1:-1]
    val = val.replace("''", "'")
    return val


if __name__ == "__main__":
    token = get_token()
    os.makedirs(BASE, exist_ok=True)

    print("Parsing reading texts from SQL migrations...")
    texts = parse_sql_migrations()
    print(f"Found {len(texts)} reading texts.\n")
    print(f"Voice: {VOICE}, Rate: {RATE}")
    print(f"Output: {BASE}/reading-XX.mp3\n")

    done = 0
    errors = 0

    for row in texts:
        sort_order = row["sort_order"]
        title = row["title_de"]
        text_type = row["text_type"]
        text_content = row["text_content"]
        questions = row["questions"]

        padded = str(sort_order).zfill(2)
        outfile = os.path.join(BASE, f"reading-{padded}.mp3")

        # For textrekonstruktion, fill gaps with correct answers
        if text_type == "textrekonstruktion" and questions:
            full_text = fill_gaps(text_content, questions)
        else:
            full_text = text_content

        full_text = clean_for_tts(full_text)
        short = title[:50]

        try:
            result = synthesize(full_text, outfile, token)
            if result == "skip":
                print(f"  [{padded}] skip (exists) — {short}")
            else:
                print(f"  [{padded}] {result} — {short}")
            done += 1
        except Exception as e:
            print(f"  [{padded}] ERROR — {short}: {e}")
            errors += 1

    print(f"\nDone! {done} processed, {errors} errors.")
