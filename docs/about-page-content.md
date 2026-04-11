# About This App — Proposed Content

Location: SettingsPage, expandable accordion UNDER "Konto löschen"

---

## Section 1: "Die Story"

One PM. One dog. Zero patience for boring language apps.

C1 Werkstatt was born because Ioana — a Product Manager with 19 years across 12+ industries — was preparing for the telc C1 exam and couldn't find a single tool that didn't feel like a PowerPoint from 2008. So she built one. With AI. While Jerry supervised from the couch.

This is not a startup. There's no Series A. There's no growth team. Just one person who wanted to finally say "Das lässt sich einrichten" in a meeting without googling it first.

---

## Section 2: "Built With"

**Frontend:** React + TypeScript + Tailwind CSS + shadcn/ui — because life's too short for ugly buttons.

**Backend:** Supabase (PostgreSQL, Auth, Edge Functions, Storage) — the database that doesn't judge your migration history.

**AI:** Claude by Anthropic — powers the writing feedback. Your Erörterung gets evaluated by an AI that actually reads it.

**Code:** Built with Claude Code + Lovable — yes, AI built an AI-powered app. Very meta.

**Audio:** Google Cloud Text-to-Speech (Neural2) — every IT vocabulary word has a native-sounding pronunciation.

**Podcasts:** Generated with NotebookLM — because recording 3 podcasts about Konjunktiv II yourself would be... a choice.

**CAPTCHA:** Cloudflare Turnstile — no "click all the traffic lights" here.

**Hosting:** GitHub Pages — free, fast, Jerry-approved.

**QA Lead:** Jerry 🐕 — mostly sleeps through deployments but has never approved a bug.

---

## Section 3: "Sicherheit"

Your data is treated better than most startups treat their Series A pitch deck.

- 🔐 **API keys** — encrypted with AES-256-GCM (PBKDF2, 100K iterations). Never stored in your browser. Only decrypted briefly in secure server functions.
- 🛡️ **Row-Level Security** — every database table has RLS policies. You can only see your own data. Not your neighbor's Wortschatz.
- 🤖 **CAPTCHA** — Cloudflare Turnstile on login, signup, and password reset. Bots get nothing.
- 📧 **Email** — SPF, DKIM, and DMARC configured. Your confirmation emails land in inbox, not spam (meistens).
- 🗑️ **Account deletion** — deletes everything. All tables, auth user, localStorage. Like you were never here. Except Jerry will remember.
- 🔒 **Passwords** — minimum 8 characters, hashed by Supabase Auth (bcrypt). We never see your password.

---

## Section 4: "Kein Tracking, kein Bullshit"

- No Google Analytics
- No Facebook Pixel
- No third-party tracking scripts
- No selling your data
- No ads, ever

The only thing we track is your exercise progress — because that's literally the app. Jerry doesn't believe in surveillance capitalism.

---

## Section 5: "Kontakt"

Built by [Ioana Ognibeni](https://ioana-ognibeni.eu)

Found a bug? Have an idea? Want to say danke?
→ ioana@ioana-ognibeni.eu

Or just tell Jerry he's a good boy. He likes that.
