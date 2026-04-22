# C1 Werkstatt — Project Structure

Full architecture reference. Read this before making changes to understand how things connect.

---

## Tech Stack

- React 18 + TypeScript + Vite 5
- Tailwind CSS + shadcn/ui (Radix UI primitives)
- Supabase (auth, PostgreSQL, storage, edge functions)
- React Router 6, TanStack Query 5
- Framer Motion for animations
- PostHog (EU cloud, cookieless) for analytics
- Sentry for error tracking
- Google Cloud TTS for pronunciation audio
- Vitest + Playwright for testing

## Deployment

- GitHub Pages from `production` branch
- Custom domain: `c1-deutsch.ioana-ognibeni.eu`
- Dev server: `npm run dev` → localhost:8080

---

## Directory Layout

```
src/
├── App.tsx                    # Router config (all routes defined here)
├── main.tsx                   # Entry point + Sentry init
├── index.css                  # Global styles
│
├── assets/audio/              # 1,100+ MP3 files (Google Cloud TTS)
│   ├── nouns/ (235)           # IT noun pronunciation
│   ├── praepositionen/ (97)   # Preposition examples
│   ├── nv-verbindungen/ (80)  # Noun-verb combinations
│   ├── it-redewendungen/ (72) # IT idioms
│   ├── expressions/ (72)      # C1 expressions
│   ├── dialoge/ (62)          # IT dialogue scenes
│   ├── verbs/ (50)            # Verb pronunciation
│   ├── kollokationen/ (50)    # Collocations
│   ├── workshop/ (50)         # Workshop phrases
│   ├── refinement/ (50)       # Refinement phrases
│   ├── sprechen-*/ (110)      # Speaking sections (4 dirs)
│   ├── schreiben-*/ (89)      # Writing sections (4 dirs)
│   ├── reading/ (40)          # Reading text audio
│   ├── notfallkit/ (25)       # Emergency phrases
│   └── souveranitaet/ (19)    # Composure phrases
│
├── components/
│   ├── layout/                # AppLayout, Navbar, ITDeutschNav
│   ├── shared/                # Reusable: ReviewCard, ScrollNav, TertiaryNav,
│   │                          #   SelectableText, SelectionHint, StarredButton,
│   │                          #   TelcBadge, VerbFlashcard, WordPopup, navStyles
│   ├── reading/               # ReadingInterface, ClickableText, questions/
│   ├── listening/             # AudioPlayer, Global/Detail/Informationstransfer
│   ├── grammar/exercises/     # FillIn, Match, MC, SentenceBuild, Sprachbausteine, Transform
│   ├── vocabulary/            # ExerciseFlow + exercise types
│   ├── writing-tips/          # AddConnectorInput, AddPhraseInput
│   ├── it-deutsch/            # DialogueReader
│   └── ui/                    # shadcn/ui primitives (30+ files)
│
├── pages/                     # One file per route (see Routing below)
├── data/                      # Static content (see Data Files below)
├── hooks/                     # Custom hooks (see Hooks below)
├── contexts/                  # AuthContext (user, session, profile)
├── i18n/                      # translations.ts + useTranslation hook
├── lib/                       # utils, posthog, syncStarredVocab, flashcardAudio
└── integrations/supabase/     # client.ts + generated types.ts
```

---

## Routing (App.tsx)

**Public:** `/welcome`, `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/about`, `/datenschutz`

**Protected (require auth):**

| Route | Page | Purpose |
|-------|------|---------|
| `/home` | HomePage | Dashboard with stats |
| `/vocabulary` | VocabularyPage | Vocab topics → ExerciseFlow |
| `/grammar` | GrammarPage | Grammar topic grid |
| `/grammar/verbs` | VerbTablePage | Verb conjugation table |
| `/writing` | WritingPage | Writing prompts + AI eval + Redemittel |
| `/reading` | ReadingPage | Reading texts (4 types) |
| `/listening` | ListeningPage | Listening exercises |
| `/speaking` | SpeakingPage | Speaking practice |
| `/exam-prep` | ExamPrepPage | Exam prep tips |
| `/my-vocabulary` | MyVocabularyPage | Personal vocab (Leitner review) |
| `/my-texts` | MyTextsPage | Saved reading texts |
| `/daily-practice` | DailyPracticePage | Daily streak |
| `/it-deutsch` | ITDeutschPage | IT German hub (fuchsia) |
| `/it-deutsch/uebungen` | ITUebungenPage | IT exercises |
| `/it-deutsch/redewendungen` | ITRedewendungenPage | IT idioms |
| `/it-deutsch/vokabular` | ITVokabularPage | IT vocabulary |
| `/it-deutsch/user-stories` | ITUserStoriesPage | User story practice |
| `/flashcards` | FlashcardsPage | Verb + concept flashcards |
| `/settings` | SettingsPage | User settings |

---

## Key Patterns

### Navigation
- **ScrollNav** — Horizontal scrollable tabs with fade hints (mobile)
- **TertiaryNav** — Pill buttons in blue or fuchsia
- **LevelTabs** — B2/C1/Advanced selector
- **StarredButton** — Toggles "show only starred items" filter

### Vocabulary Flow (the full pipeline)
```
Content page (Reading/Speaking/Writing/IT)
    ↓ click word / mark phrase
localStorage highlight key (per section)
    ↓ syncStarredToDb() runs on MyVocabularyPage load
personal_vocabulary table (Supabase)
    ↓ fetch due cards (next_review_at <= now)
ReviewCard UI (Leitner 6-box system)
    ↓ "knew it" / "didn't know it"
box_number++ or reset, next_review_at updated
```

Leitner intervals: 1 / 3 / 7 / 14 / 30 / 90 days.

### Audio
- Static MP3s in `src/assets/audio/` loaded via `import.meta.glob()`
- Resolved through `lib/flashcardAudio.ts` by source_type + word_de
- TTS generated with Google Cloud TTS (`de-DE-Neural2-D`, rate 0.95)

### Highlighting
- `useHighlightedPhrases(storageKey)` — localStorage Set per section
- `SelectionHint` — Shimmer animation, dismisses after first interaction
- `StarredButton` — Filters to only starred items

### Reading (reference pattern for content pages)
ReadingPage (grid by text_type) → ReadingInterface (ClickableText + questions + audio) → ClickableText (gaps with dropdowns + annotated words → WordPopup → add to Wortschatz)

---

## Supabase

### Tables

| Table | Purpose |
|-------|---------|
| `profiles` | User settings, streak, language prefs |
| `personal_vocabulary` | User's vocab (Leitner boxes, review dates, source_type) |
| `reading_texts` | Reading content + questions JSON + word_annotations |
| `reading_progress` | User's reading scores + answers |
| `exercises` | All exercises (area, topic, level, content JSON) |
| `exercise_progress` | Exercise completion tracking |
| `writing_prompts` | Writing prompts by level |
| `writing_submissions` | User writing + LLM feedback + scores |
| `daily_sessions` | Daily practice logs |
| `dictionary` | Static dictionary |
| `verb_conjugations` | Verb conjugation reference |

### Storage Buckets

- `listening-audio` — 6 MP3s (SET1/SET2 × Teil1/Teil2/Teil3)
- `Media IT` — 3 podcasts + 1 video

### Edge Functions

- `evaluate-writing` — LLM evaluation against telc criteria
- `delete-account` — Full account deletion
- `set-api-key` / `test-api-key` — User API key management

---

## Static Data Files (src/data/)

| File | Content | Count |
|------|---------|-------|
| `c1Expressions.ts` | C1 expressions with examples | 50+ |
| `flashcards.ts` | IT/concept flashcards | 43+ |
| `itDialogues.ts` | IT dialogue scenarios | 4 |
| `nvVerbindungen.ts` | Noun-verb combos (8 categories) | 100+ |
| `praepositionen.ts` | Verb/adj + preposition combos (15 categories) | 150+ |
| `techIdioms.ts` | IT idioms and expressions | 50+ |
| `userStories.ts` | User story examples | 200+ |

---

## Hooks

| Hook | Purpose |
|------|---------|
| `useAuth()` / `useRequiredAuth()` | Auth state, profile, login/logout |
| `useTranslation()` | i18n `{ t, lang }` |
| `useIsMobile()` | Boolean for <1024px |
| `useToast()` | Toast notifications |
| `useHighlightedPhrases(key)` | localStorage Set for starred items |
| `useCustomPhrases()` | localStorage for custom Writing phrases |
| `useNumberKeys()` | Keyboard shortcuts 1-9 |
| `usePlayAll()` | Audio playlist manager |
| `useTextSize()` | Text size preference |

---

## IT Deutsch Section

- Fuchsia/pink branding (not primary blue)
- Sub-nav: Ubungen | Medien | IT-Vokabular | Redewendungen | Lernkarten
- Media from Supabase Storage `Media IT`
- 72 idiom illustrations in `src/assets/idioms/`
- Exercises: `area = 'berufssprache_it'` in Supabase
- Static data: `techIdioms.ts`, `itDialogues.ts`, `userStories.ts`
