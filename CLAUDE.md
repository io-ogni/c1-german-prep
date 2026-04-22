# CLAUDE.md — C1 Werkstatt

## Rule #1: COMMIT YOUR WORK
If you build something that works, commit it immediately. Days of work have been lost to uncommitted sessions. Don't batch. Don't wait. Commit.

## Reference Docs (read before making changes)
- `docs/PROJECT_STRUCTURE.md` — Full architecture, routing, tables, hooks, patterns
- `docs/CODING_RULES.md` — Engineering rules, migration gotchas, non-negotiable practices

## Git & Branch Strategy

- **`production`** is the working branch. All development happens here. Deployed via GitHub Pages.
- **`main`** is Lovable's branch. Never commit to it manually. Never merge `main` into `production`.
- Lovable may still push to `main`. It was used for AI-generated images only. May be disconnected soon.
- Always test on localhost:8080 before pushing to production.

## Heavily Customized Files (do not overwrite from main)

- `src/pages/ITDeutschPage.tsx`, `ITVokabularPage.tsx`, `ITRedewendungenPage.tsx`, `ITUebungenPage.tsx`
- `src/components/reading/ClickableText.tsx`, `ReadingInterface.tsx`
- `src/components/reading/questions/TextrekonstruktionQuestions.tsx`
- `src/components/layout/Navbar.tsx`, `ITDeutschNav.tsx`
- `src/pages/WelcomePage.tsx`, `LoginPage.tsx`, `HomePage.tsx`
- `src/App.tsx`, `index.html`

## IT Deutsch Section

- Fuchsia/pink branding (not primary blue)
- Sub-nav: Ubungen | Medien | IT-Vokabular | Redewendungen | Lernkarten
- Media files from Supabase Storage bucket `Media IT`
- Exercise data: `area = 'berufssprache_it'` in Supabase

## Quick Reminders

- Mobile-first (iPhone 16 is primary device)
- German text: validate ä/ö/ü/ß before DB insert
- Never display .env or credentials
- Exercises must use existing vocabulary arrays, not invent new terms
- `supabase db push` is broken — use `npx supabase db query --linked` instead
- If you disagree with a change, say so before executing it
