# C1 Werkstatt — Coding Rules

These are hard-won rules from actual bugs and lost work. Follow them.

---

## 1. COMMIT YOUR WORK

The single most important rule. If you build something that works, commit it immediately. Don't wait for "the right moment." Don't batch changes. Days of work have been lost because a session ended without committing. If in doubt, commit.

## 2. Test locally first

Always start the Vite dev server (`npm run dev`) and test on localhost before pushing. Pushing triggers a slow build/deploy cycle. Iterate locally.

## 3. No shortcuts, no quick fixes

Develop with maintainability, quality, scalability in mind. If the architecture has a proper mechanism (like `refreshProfile` in AuthContext), use it. Every quick fix has caused a follow-up bug.

## 4. Check existing code before building new

Search the codebase first. If there's already a component, utility, or pattern that does what's needed, reuse it. Don't duplicate. Ask: "does this already exist somewhere?"

## 5. Fix patterns, not symptoms

When a problem comes back a second time, don't patch the symptom. Propose a structural fix.

## 6. Audit symmetric cases

When you find a correct pattern, check whether every other file doing the same thing follows the same pattern. The DailyPracticePage had the right logic — three other files didn't. Use correct implementations as an answer key.

## 7. Map the full lifecycle

When analyzing mutations or state changes: "what happens on re-attempt? on failure? on restart?" State corruption lives in the second pass, not the first.

## 8. Never modify structural identifiers in migrations

NEVER apply data transforms to JSON keys, DB table names, column names. Only touch data VALUES. When transforming JSON, walk the tree. Never do `content::text` → REPLACE → `::jsonb`. The umlaut migration turned "question" into "qüstion" and broke 26 exercises.

## 9. German text: validate umlauts before DB insert

Always validate German text has proper ä/ö/ü/ß BEFORE inserting into the database.

## 10. Exercises derive from vocabulary

Exercises must test vocabulary from existing static arrays (NOUNS, VERBS, COLLOCATIONS, etc.), not invent new terms. The Vokabular page is the source of truth. If the pool is too small, expand the static arrays first.

## 11. Never display credentials

Never cat, echo, or print .env files, API keys, or service role keys. Source files and use variables.

## 12. Supabase migrations

`supabase db push` is broken (duplicate version history). Use:
```bash
npx supabase db query --linked -f supabase/migrations/YYYYMMDDHHMMSS_name.sql
npx supabase migration repair --status applied YYYYMMDDHHMMSS
```

Do NOT try to "fix" the migration history.

## 13. Audio: Google Cloud TTS only
Never use browser SpeechSynthesis for TTS. All audio in this app uses Google Cloud TTS (de-DE-Neural2-D, rate 0.95). If a feature needs audio, generate MP3s via the Google Cloud TTS API and store them in `src/assets/audio/`. See `scripts/generate-schreiben-tts.py` for the pattern.

## 14. Mobile-first

iPhone 16 is the primary device. All UI work must be considered at mobile viewport widths first.

## 14. Proactive about problems

Don't just answer what's asked — flag adjacent concerns (security, legal, GDPR, accessibility). Don't wait to be asked "what am I missing?"

## 15. If you disagree, say so

Don't comply silently. If a change seems wrong, say so before executing it. Ioana wants real pushback, not obedience.
