#!/usr/bin/env python3
"""
Merge word annotations from all reading texts into the dictionary table.

Reads all reading_texts.word_annotations from Supabase, merges them into
one deduplicated dictionary, skips entries that already exist, and inserts
the rest into public.dictionary.

Also generates a SQL migration file for reproducibility.

Usage:
  export SUPABASE_SERVICE_ROLE_KEY=eyJ...
  python3 scripts/merge-reading-annotations-to-dictionary.py

  Add --dry-run to see what would be inserted without writing anything.
"""

import os
import sys
import json
import re
import requests

SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
SUPABASE_URL = "https://okoxjlhmjamacvlrnidr.supabase.co"

if not SUPABASE_SERVICE_ROLE_KEY:
    print("ERROR: Set SUPABASE_SERVICE_ROLE_KEY environment variable")
    sys.exit(1)

DRY_RUN = "--dry-run" in sys.argv

HEADERS = {
    "apikey": SUPABASE_SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
    "Content-Type": "application/json",
}

ARTICLE_RE = re.compile(r"^(der|die|das)\s+(.+)", re.IGNORECASE)

# Known prepositions
PREPOSITIONS = {
    "an", "auf", "aus", "bei", "bis", "durch", "für", "gegen", "hinter",
    "in", "mit", "nach", "neben", "ohne", "seit", "statt", "trotz", "um",
    "unter", "von", "vor", "während", "wegen", "zu", "zwischen", "ab",
    "außer", "gegenüber", "gemäß", "laut", "mitsamt", "samt", "entlang",
    "innerhalb", "außerhalb", "oberhalb", "unterhalb", "diesseits",
    "jenseits", "anstatt", "aufgrund", "infolge", "anhand", "mithilfe",
    "hinsichtlich", "bezüglich", "anlässlich",
}

# Known conjunctions
CONJUNCTIONS = {
    "und", "oder", "aber", "sondern", "denn", "weil", "dass", "ob",
    "wenn", "als", "obwohl", "damit", "sodass", "bevor", "nachdem",
    "während", "seitdem", "bis", "falls", "indem", "je", "desto",
    "sowohl", "weder", "noch", "entweder", "jedoch", "dennoch",
    "trotzdem", "deshalb", "deswegen", "daher", "darum", "zumal",
    "sofern", "sobald", "solange", "soweit", "ehe",
}

# Known pronouns
PRONOUNS = {
    "ich", "du", "er", "sie", "es", "wir", "ihr", "sich", "mich",
    "dich", "uns", "euch", "mir", "dir", "ihm", "ihnen", "mein",
    "dein", "sein", "unser", "euer", "dieser", "jener", "welcher",
    "jeder", "alle", "einige", "manche", "man",
}

ARTICLES = {"der", "die", "das", "den", "dem", "des", "ein", "eine", "einem", "einen", "einer", "eines"}

# Adjective suffixes
ADJ_SUFFIXES = ("lich", "ig", "isch", "bar", "sam", "los", "voll", "haft", "ös", "iv", "ell", "ant", "ent")


def fetch_all_pages(endpoint, select="*"):
    """Fetch all rows from a Supabase table, handling pagination."""
    all_rows = []
    offset = 0
    page_size = 1000
    while True:
        resp = requests.get(
            f"{SUPABASE_URL}/rest/v1/{endpoint}?select={select}&limit={page_size}&offset={offset}",
            headers=HEADERS,
        )
        resp.raise_for_status()
        page = resp.json()
        all_rows.extend(page)
        if len(page) < page_size:
            break
        offset += page_size
    return all_rows


def classify_word(de_form, en_translation, key):
    """Classify a word annotation into dictionary fields."""
    de = de_form.strip()
    en = en_translation.strip()

    # Check for article → noun
    m = ARTICLE_RE.match(de)
    if m:
        return {
            "article": m.group(1).lower(),
            "word_de": m.group(2).strip(),
            "translation_en": en,
            "word_type": "noun",
        }

    # No article — determine type from the base form
    base = de.split("(")[0].strip()  # strip case info like (+Dat.)

    if base.lower() in ARTICLES:
        return {"article": None, "word_de": de, "translation_en": en, "word_type": "article"}
    if base.lower() in PRONOUNS:
        return {"article": None, "word_de": de, "translation_en": en, "word_type": "pronoun"}
    if "(+" in de or base.lower() in PREPOSITIONS:
        return {"article": None, "word_de": de, "translation_en": en, "word_type": "preposition"}
    if base.lower() in CONJUNCTIONS:
        return {"article": None, "word_de": de, "translation_en": en, "word_type": "conjunction"}

    # Verbs: English starts with "to " or German base ends in -en/-eln/-ern
    if en.startswith("to ") or re.search(r"(en|eln|ern)$", base):
        return {"article": None, "word_de": de, "translation_en": en, "word_type": "verb"}

    # Adjectives by suffix
    if any(base.lower().endswith(s) for s in ADJ_SUFFIXES):
        return {"article": None, "word_de": de, "translation_en": en, "word_type": "adjective"}

    # Adverbs — common ones
    adverb_markers = {"sehr", "fast", "schon", "noch", "immer", "nie", "oft", "gern",
                      "bereits", "kaum", "ziemlich", "besonders", "außerdem", "ebenfalls",
                      "hingegen", "insbesondere", "lediglich", "mittlerweile", "zunehmend",
                      "demnach", "folglich", "somit", "überhaupt", "durchaus", "ebenso",
                      "einerseits", "andererseits", "zudem", "zwar", "allerdings", "etwa",
                      "sogar", "wiederum", "beispielsweise", "tatsächlich", "grundsätzlich",
                      "letztlich", "dementsprechend", "vielmehr", "gleichzeitig"}
    if base.lower() in adverb_markers:
        return {"article": None, "word_de": de, "translation_en": en, "word_type": "adverb"}

    return {"article": None, "word_de": de, "translation_en": en, "word_type": "other"}


def escape_sql(s):
    """Escape a string for SQL single-quoted literal."""
    return s.replace("'", "''")


def main():
    print("Fetching reading text annotations...")
    reading_rows = fetch_all_pages("reading_texts", "word_annotations")
    print(f"  Found {len(reading_rows)} reading texts")

    # Merge all annotations
    merged = {}
    for row in reading_rows:
        annots = row.get("word_annotations")
        if annots and isinstance(annots, dict):
            for key, val in annots.items():
                if key not in merged:
                    merged[key] = val
    print(f"  Merged into {len(merged)} unique word keys")

    # Fetch existing dictionary
    print("Fetching existing dictionary...")
    existing_rows = fetch_all_pages("dictionary", "word_de")
    existing_lower = set(d["word_de"].lower() for d in existing_rows)
    print(f"  Existing dictionary has {len(existing_lower)} unique entries")

    # Process annotations
    new_entries = []
    seen_lower = set()  # for dedup within new entries
    skipped_existing = 0
    skipped_junk = 0

    for key, val in sorted(merged.items()):
        de = val.get("de", "").strip()
        en = val.get("en", "").strip()

        # Skip empty, single non-alpha chars, pure numbers, label markers
        if not de or not en:
            skipped_junk += 1
            continue
        if key.isdigit():
            skipped_junk += 1
            continue
        if len(key) <= 1 and not key.isalpha():
            skipped_junk += 1
            continue
        if re.match(r"^[a-z]\)$", de):
            skipped_junk += 1
            continue
        # Skip numerical expressions (decimal numbers, written-out large numbers)
        if re.match(r"^\d", key):
            skipped_junk += 1
            continue
        if re.search(r"Komma", de):
            skipped_junk += 1
            continue
        if en and re.match(r"^[\d,.\s]+$", en):
            skipped_junk += 1
            continue
        # Skip proper names (cities, people)
        if "Eigenname" in de or "Vorname" in de or "proper name" in en.lower():
            skipped_junk += 1
            continue
        # Skip abbreviations that are just themselves
        if key == de.lower() and len(key) <= 2 and not key.isalpha():
            skipped_junk += 1
            continue

        entry = classify_word(de, en, key)

        # Check if this word already exists in dictionary
        word_lower = entry["word_de"].lower()
        if word_lower in existing_lower:
            skipped_existing += 1
            continue
        # Also check the raw key (some entries store the inflected form)
        if key.lower() in existing_lower or key.capitalize() in [d["word_de"] for d in existing_rows]:
            skipped_existing += 1
            continue

        # Dedup within new entries
        if word_lower in seen_lower:
            continue
        seen_lower.add(word_lower)

        new_entries.append(entry)

    print(f"\nResults:")
    print(f"  Skipped (junk/labels): {skipped_junk}")
    print(f"  Skipped (already in dictionary): {skipped_existing}")
    print(f"  New entries to insert: {len(new_entries)}")

    # Type breakdown
    from collections import Counter
    types = Counter(e["word_type"] for e in new_entries)
    for t, c in types.most_common():
        print(f"    {t}: {c}")

    if not new_entries:
        print("\nNothing to insert.")
        return

    if DRY_RUN:
        print("\n--dry-run: not inserting. Showing first 20 entries:")
        for e in new_entries[:20]:
            art = e["article"] or "-"
            print(f"  [{e['word_type']:12}] {art:4} {e['word_de']:40} → {e['translation_en']}")
        return

    # Generate SQL migration
    migration_path = "supabase/migrations/20260422100000_seed_dictionary_from_reading_annotations.sql"
    print(f"\nGenerating SQL migration: {migration_path}")

    sql_lines = [
        "-- Seed dictionary with words extracted from reading text annotations",
        "-- Source: reading_texts.word_annotations merged into unique entries",
        "-- Generated by scripts/merge-reading-annotations-to-dictionary.py",
        "",
        "INSERT INTO public.dictionary (word_de, article, translation_en, word_type) VALUES",
    ]

    for i, e in enumerate(new_entries):
        art_sql = f"'{escape_sql(e['article'])}'" if e["article"] else "NULL"
        comma = "," if i < len(new_entries) - 1 else ""
        sql_lines.append(
            f"('{escape_sql(e['word_de'])}', {art_sql}, '{escape_sql(e['translation_en'])}', '{escape_sql(e['word_type'])}'){comma}"
        )

    sql_lines.append("ON CONFLICT (word_de) DO NOTHING;")

    with open(migration_path, "w") as f:
        f.write("\n".join(sql_lines) + "\n")
    print(f"  Written {len(new_entries)} entries to migration file")

    # Insert via Supabase REST API in batches
    print("\nInserting into Supabase...")
    batch_size = 200
    inserted = 0
    errors = 0

    for i in range(0, len(new_entries), batch_size):
        batch = new_entries[i : i + batch_size]
        payload = [
            {
                "word_de": e["word_de"],
                "article": e["article"],
                "translation_en": e["translation_en"],
                "word_type": e["word_type"],
            }
            for e in batch
        ]

        resp = requests.post(
            f"{SUPABASE_URL}/rest/v1/dictionary",
            headers={**HEADERS, "Prefer": "return=minimal,resolution=ignore-duplicates"},
            json=payload,
        )
        if resp.status_code in (200, 201):
            inserted += len(batch)
            print(f"  Batch {i // batch_size + 1}: inserted {len(batch)} rows")
        else:
            errors += len(batch)
            print(f"  Batch {i // batch_size + 1}: ERROR {resp.status_code} — {resp.text[:200]}")

    print(f"\nDone! Inserted: {inserted}, Errors: {errors}")
    print(f"Dictionary now has ~{len(existing_lower) + inserted} entries")


if __name__ == "__main__":
    main()
