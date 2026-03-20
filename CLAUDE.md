# CLAUDE.md — C1 Werkstatt

## Git & Branch Strategy

- **`production`** is the working branch. All development happens here. This is what gets deployed.
- **`main`** is Lovable's branch. Lovable pushes here automatically. Never commit to it manually.
- **Never merge `main` into `production` wholesale.** The branches are intentionally diverged.
- Cherry-pick only: when Ioana finds something good on Lovable's `main`, read it with `git show origin/main:<path>` and manually port the relevant parts into `production`.
- Lovable should only be used to build **new pages or components** — not to modify files we've heavily customized on `production`.

## Heavily Customized Files (do not overwrite from main)

- `src/pages/ITDeutschPage.tsx`
- `src/pages/ITVokabularPage.tsx`
- `src/pages/ITRedewendungenPage.tsx`
- `src/pages/ITUebungenPage.tsx`
- `src/components/reading/ClickableText.tsx`
- `src/components/reading/ReadingInterface.tsx`
- `src/components/reading/questions/TextrekonstruktionQuestions.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/ITDeutschNav.tsx`
- `src/pages/WelcomePage.tsx`
- `src/pages/LoginPage.tsx`
- `src/pages/HomePage.tsx`
- `src/App.tsx`
- `index.html`

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS + ShadCN UI components
- Supabase (auth, database, storage)
- React Router, TanStack Query
- framer-motion for animations

## IT Deutsch Section

- Fuchsia/pink branding (not primary blue)
- Sub-nav: Medien | Übungen | IT-Vokabular | Redewendungen | Lernkarten
- Media files served from Supabase Storage bucket `Media IT`
- 72 idiom illustrations in `src/assets/idioms/`
- Exercise data stored in Supabase with `area = 'berufssprache_it'`
