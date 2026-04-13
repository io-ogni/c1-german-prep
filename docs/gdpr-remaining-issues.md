# GDPR Remaining Issues — Before Public Launch

## PHASE 1: Legal Pages (content needed from Ioana)

### 1. Datenschutzerklärung (Privacy Policy) — REQUIRED
Must disclose:
- Controller: Ioana Ognibeni, address, contact
- What data is collected (email, display name, exercise progress, essays, vocabulary)
- Third parties: Supabase (Ireland), PostHog (EU), Anthropic (US — essays), Cloudflare (US — CAPTCHA), Brevo (EU — email)
- Legal basis: consent (signup checkbox) + legitimate interest (learning analytics)
- Retention: how long data is kept, when it's deleted
- Rights: access, correction, deletion, portability, objection
- Session replay disclosure (paused on sensitive pages, inputs masked)
- Contact for data requests

### 2. Impressum — REQUIRED (German TMG §5)
- Full name
- Address
- Email
- Phone (optional but recommended)
- No company registration needed if individual

### 3. Nutzungsbedingungen (Terms of Service)
- App is free, no warranties
- User-generated content (essays, vocabulary) belongs to user
- Account deletion is permanent
- Acceptable use policy

### 4. Consent Checkboxes on Signup
Add required checkboxes to SignupPage.tsx:
- [ ] Ich akzeptiere die Datenschutzerklärung (required)
- [ ] Ich akzeptiere die Nutzungsbedingungen (required)
Add disclosure text (not checkbox) on WritingPage before first essay submission:
- "Dein Text wird zur Bewertung an Anthropic (USA) gesendet."

## PHASE 2: Infrastructure Verification

### 5. Supabase Region — CONFIRMED EU (Ireland) ✅

### 6. Cloudflare Turnstile DPA
- Verify Cloudflare has Data Processing Agreement
- Check: https://www.cloudflare.com/trust-hub/gdpr/
- Alternative: switch back to hCaptcha (EU-based, already in package.json)

### 7. Anthropic DPA
- Check if Anthropic offers a DPA for API usage
- Document in privacy policy that essays are processed by US-based AI
- Consider: add explicit consent before first essay submission

### 8. Brevo DPA
- Verify Brevo (Sendinblue) DPA is in place
- They're EU-based (Paris) so lower risk

## PHASE 3: Data Handling Improvements

### 9. Writing Submissions Retention
- Currently stored forever
- Consider: delete essay text after 90 days, keep scores/feedback only
- Or: let user delete individual submissions from MyTextsPage

### 10. Right to Data Export
- Add "Download my data" button in Settings
- Export: profile, vocabulary, exercise progress, writing scores
- Format: JSON or CSV

### 11. PostHog Data Deletion on Account Delete
- PostHog retains session data even after account deletion
- Document this in privacy policy
- Consider: call PostHog API to delete user data on account deletion

## Status
- [x] Session replay paused on sensitive pages (2026-04-13)
- [x] maskAllInputs enabled globally (2026-04-13)
- [x] ph-no-capture on PII elements (2026-04-13)
- [x] Supabase confirmed EU (Ireland)
- [x] PostHog EU cloud, cookieless mode
- [ ] Datenschutzerklärung
- [ ] Impressum
- [ ] Nutzungsbedingungen
- [ ] Signup consent checkboxes
- [ ] Anthropic disclosure on WritingPage
- [ ] Cloudflare DPA verification
- [ ] Anthropic DPA verification
- [ ] Writing retention policy
- [ ] Data export feature
