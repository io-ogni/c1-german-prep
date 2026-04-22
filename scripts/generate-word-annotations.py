#!/usr/bin/env python3
"""
Generate word-level annotations for all reading texts.
Uses Claude API to produce smart translations that recognize expressions,
separable verbs, and contextual meanings.

Usage:
  export ANTHROPIC_API_KEY=sk-ant-...
  export SUPABASE_SERVICE_ROLE_KEY=eyJ...
  python3 scripts/generate-word-annotations.py

Optional: pass a text sort_order to process a single text:
  python3 scripts/generate-word-annotations.py 1
"""

import os
import sys
import json
import re
import time
import requests

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
SUPABASE_URL = "https://okoxjlhmjamacvlrnidr.supabase.co"

if not ANTHROPIC_API_KEY:
    print("ERROR: Set ANTHROPIC_API_KEY environment variable")
    sys.exit(1)
if not SUPABASE_SERVICE_ROLE_KEY:
    print("ERROR: Set SUPABASE_SERVICE_ROLE_KEY environment variable")
    sys.exit(1)

HEADERS = {
    "apikey": SUPABASE_SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
    "Content-Type": "application/json",
}

PROMPT = """You are a German C1-level language expert. Given a German reading text, produce a JSON word annotation map.

For EVERY distinct word in the text (lowercased, stripped of punctuation), produce an entry:

```json
{
  "word_lower": {
    "de": "base form with article for nouns, infinitive for verbs",
    "en": "English translation"
  }
}
```

Rules:
1. **Nouns**: Include article. "Patientenakten" → {"de": "die Patientenakte", "en": "patient record"}
2. **Verbs**: Use infinitive. "verändert" → {"de": "verändern", "en": "to change"}
3. **Separable verbs**: Recognize separated prefixes. If text says "weist...darauf hin", the word "weist" should map to {"de": "hinweisen auf (+Akk.)", "en": "to point out"}
4. **Expressions**: If a word is primarily part of a fixed expression in this context, show the expression. "Rolle" in "eine Rolle spielen" → {"de": "eine Rolle spielen", "en": "to play a role"}
5. **Prepositions/particles in expressions**: "darauf" before "hinweisen" → {"de": "darauf hinweisen", "en": "to point out (something)"}
6. **Common words**: Include ALL words, even simple ones like "und", "der", "ist". C1 learners may still want to verify.
7. **Compound nouns**: Break down if helpful. "Gesundheitswesen" → {"de": "das Gesundheitswesen", "en": "healthcare system"}
8. **Context matters**: Same word can have different meanings. Use the meaning from THIS text.
9. **Skip gap markers**: Ignore [___1___] etc.

Return ONLY valid JSON, no markdown, no explanation. The JSON should be a single object with lowercase word keys."""


def fetch_texts(sort_order=None):
    """Fetch reading texts from Supabase."""
    url = f"{SUPABASE_URL}/rest/v1/reading_texts?select=id,title_de,text_content,sort_order&order=sort_order"
    if sort_order is not None:
        url += f"&sort_order=eq.{sort_order}"
    resp = requests.get(url, headers=HEADERS)
    resp.raise_for_status()
    return resp.json()


def extract_words(text):
    """Extract unique words from text, ignoring gap markers."""
    clean = re.sub(r'\[___\d+___\]', '', text)
    words = re.findall(r'[a-zA-ZäöüÄÖÜß]+', clean)
    return sorted(set(w.lower() for w in words if len(w) > 0))


def generate_annotations(text_content, title):
    """Call Claude API to generate word annotations."""
    words = extract_words(text_content)

    user_msg = f"""Text title: {title}

Text:
{text_content}

Unique words to annotate ({len(words)} words):
{', '.join(words)}

Generate the JSON annotation map for ALL these words."""

    resp = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers={
            "x-api-key": ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        json={
            "model": "claude-sonnet-4-6",
            "max_tokens": 8192,
            "messages": [
                {"role": "user", "content": PROMPT + "\n\n" + user_msg}
            ],
        },
        timeout=120,
    )
    resp.raise_for_status()
    data = resp.json()

    content = data["content"][0]["text"]
    # Strip markdown fences if present
    content = re.sub(r'^```json\s*', '', content)
    content = re.sub(r'\s*```$', '', content)

    return json.loads(content)


def update_text(text_id, annotations):
    """Update reading_texts row with annotations."""
    resp = requests.patch(
        f"{SUPABASE_URL}/rest/v1/reading_texts?id=eq.{text_id}",
        headers={**HEADERS, "Prefer": "return=minimal"},
        json={"word_annotations": annotations},
    )
    resp.raise_for_status()


def main():
    target = int(sys.argv[1]) if len(sys.argv) > 1 else None
    texts = fetch_texts(target)

    print(f"Processing {len(texts)} text(s)...\n")

    for i, text in enumerate(texts):
        title = text["title_de"]
        words = extract_words(text["text_content"])
        print(f"[{i+1}/{len(texts)}] {title} ({len(words)} unique words)...")

        try:
            annotations = generate_annotations(text["text_content"], title)
            update_text(text["id"], annotations)
            print(f"  ✓ Generated {len(annotations)} annotations")
        except json.JSONDecodeError as e:
            print(f"  ✗ JSON parse error: {e}")
        except requests.HTTPError as e:
            print(f"  ✗ API error: {e}")
        except Exception as e:
            print(f"  ✗ Error: {e}")

        # Rate limit: wait between requests
        if i < len(texts) - 1:
            time.sleep(2)

    print("\nDone!")


if __name__ == "__main__":
    main()
