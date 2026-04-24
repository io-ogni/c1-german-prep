# Schreiben Beispiele Feature — Status (2026-04-24)

## What's Done

### UI (all committed on `production`)
- TertiaryNav toggle: **Beispiele** | **Schreiben** in WritingInterface
- Header matches Lesen pattern (ArrowLeft + title + subtitle)
- Context box + quotes shown above BOTH tabs (compact, xs text)
- **Beispiel 1/2/3 dropdown** selector
- **ClickableExampleText** component: click any word → popup with translation → "Zum Wortschatz hinzufügen"
- Accepts `wordAnnotations` prop for smart translations (de phrase + en translation)
- Words without annotations show the word + add button (no error message)
- **"Text anhören"** button with Google Cloud TTS audio (play/stop toggle)
- Audio stops on example switch or tab change
- SelectionHint shimmer dismisses after first vocab add
- `TEXT_TYPE_LABELS` map for proper display (Erörterung, Stellungnahme, etc.)
- Starter quotes fixed: object → array format, now render inside context box

### Data (in Supabase)
- `example_texts` JSONB column on `writing_prompts`
- **3 prompts have full data:**
  - "Soll man Geld spenden?" (sort_order: 1) — 3 examples + 25-28 annotations each
  - "Überwachungssoftware für Kinder?" (sort_order: 2) — 3 examples + 25-28 annotations each
  - "Tierversuche verbieten?" (sort_order: 9) — 3 examples + 25-28 annotations each

### Audio (in src/assets/audio/schreiben-beispiele/)
- 9 MP3s generated via Google Cloud TTS (de-DE-Neural2-D, rate 0.95)
- Naming: `{sort_order_padded}-beispiel-{1,2,3}.mp3`

### Scripts
- `scripts/generate-beispiele-tts.py` — batch TTS generation from Supabase data

## What's In Progress

### Full word annotations (background agent running)
- Generating 80-120 annotations per text (vs current 25-28)
- Covers ALL meaningful words, not just C1 vocabulary
- File: `tmp/word-annotations-full.json`
- When done: merge into DB via Python script (same pattern as before)

## What's Left (17 remaining C1 telc prompts)

For each prompt, the pipeline is:
1. **Generate 3 example texts** (~350 words each, C1 Erörterung/Stellungnahme)
   - Must use Redemittel from the app's Schreiben section
   - Each text takes a different argumentative position
2. **Generate full word annotations** (80-120 per text)
   - Every meaningful word translated smartly
   - Trennbare Verben in dictionary form
   - Funktionsverbgefüge as phrases
   - Nouns with articles
3. **Generate Google Cloud TTS MP3s** (run `scripts/generate-beispiele-tts.py`)
4. **Insert into Supabase** (PATCH example_texts with annotations merged)
5. **Commit MP3s to git**

### Remaining prompts (sort_order : title):
- 3: Ehrenamtliche Arbeit als Pflicht?
- 5: Social-Media-Verbot für Unter-16-Jährige?
- 7: Tempolimit auf Autobahnen?
- 8: Bargeld abschaffen?
- 10: Pflichtjahr für Jugendliche?
- 12: Gentechnik in Lebensmitteln?
- 14: Führerschein ab 16?
- 15: Brauchen wir noch Universitäten?
- 17: Digitalisierung im Hörsaal
- 18: Verpflichtende Umschulung alle fünf Jahre?
- 19: Studiengebühren: Qualität oder Ungerechtigkeit?
- 20: Pflicht-Fremdsprache im Kindergarten?
- 21: Die 4-Tage-Woche bei vollem Lohnausgleich
- 22: Künstliche Intelligenz am Arbeitsplatz
- 23: Generation Z: Faul oder klüger?
- 24: Gesetzliche Frauenquote in Führungspositionen
- 25-32: (Autofreie Innenstädte, Kurzstreckenflüge, Kernenergie, Nachhaltiger Konsum, Grundeinkommen, Soziale Medien, Gendersprache, Überwachungskameras)

### Formeller Brief prompts (sort_order 6, 13) — different format
- These need letter examples, not Erörterungen
- Different template needed

## Git Status
- Branch: `production`
- 8 commits ahead of `origin/production` (not pushed)
- All work committed locally

## Key Files
- `src/pages/WritingPage.tsx` — main page with Beispiele/Schreiben toggle
- `src/components/writing/ClickableExampleText.tsx` — clickable text component
- `scripts/generate-beispiele-tts.py` — TTS generation script
- `src/assets/audio/schreiben-beispiele/` — generated MP3s
- `tmp/example-texts-eroerterung.json` — source example texts
- `tmp/word-annotations.json` — initial annotations (25/text)
- `tmp/word-annotations-full.json` — comprehensive annotations (when ready)
