# ProgramCreator

Production landing site + application funnel for **ProgramCreator** — Creator Product Scaling by Daive (`@daivescales`).

Creators and digital brands work on a **revenue split** (no upfront). Physical product brands work on a **monthly retainer**. Every CTA goes to `/apply` → leads land in Supabase, Google Sheets, and email → applicant books via Cal.com on `/book`.

## Stack

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4
- Framer Motion only (ambient loops + one-shot `whileInView` reveals — no scroll hijack)
- Supabase (`leads` table)
- Google Sheets API
- Resend
- Cal.com embed (`@calcom/embed-react`)

**Not used (removed in v3):** Lenis, GSAP, ScrollTrigger, custom cursor, scramble/glitch text, scroll-pin / parallax.

## Design

Editorial dossier layout: mid-navy page (`#0B2038`), white type, accent `#4D9BFF`. Inter Tight + Instrument Serif (italic emphasis only). Radius 0. Grain overlay sitewide; soft Glow bloom on hero and Final CTA only. Sticky spine rail on landing sections. See `.cursorrules` for tokens, voice, and motion doctrine.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Landing (9 blocks) |
| `/apply` | 10-step application (noindex) |
| `/book` | Cal.com booking after apply (noindex) |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |

## Local setup

```bash
npm install
cp .env.local.example .env.local
# fill env vars (see Setup below)
npm run check-env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setup

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Project Settings → API: copy **Project URL**, **anon key**, and **service role key**.
3. SQL Editor → paste and run `supabase/schema.sql` (creates `leads`, indexes, RLS insert-only for anon).
4. Set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server only — never expose to the client)

### 2. Google Sheets

1. [Google Cloud Console](https://console.cloud.google.com/) → create a project (or pick one).
2. Enable **Google Sheets API**.
3. Create a **service account** → download JSON key.
4. Create a Google Sheet with a tab named exactly **`Leads`**.
5. Share that sheet with the service account email as **Editor**.
6. Set:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` = `client_email` from the JSON
   - `GOOGLE_PRIVATE_KEY` = `private_key` from the JSON (keep `\n` escapes; wrap in quotes)
   - `GOOGLE_SHEET_ID` = the ID from the sheet URL (`/d/<THIS_ID>/edit`)

Sheets writes fail soft — a Sheets outage will not block a lead (Supabase is the hard dependency).

### 3. Resend

1. Create an API key at [resend.com](https://resend.com).
2. Verify your sending domain before production.
3. Set:
   - `RESEND_API_KEY`
   - `LEAD_NOTIFY_EMAIL` (inbox that receives new-lead notifications, e.g. `hello@programcreator.com`)

Emails fail soft. HTML templates use the dark navy brand (`#0B2038`, `#4D9BFF`).

### 4. Cal.com

1. Create event type: **ProgramCreator Brand Audit Call**, 20 min, video, with buffer.
2. Copy the link slug (e.g. `daivescales/discovery`).
3. Set `NEXT_PUBLIC_CAL_LINK=daivescales/discovery`
4. Also update `calLink` in `src/lib/site-config.ts` if you change the default.

### 5. Site URL

Set `NEXT_PUBLIC_SITE_URL=https://programcreator.com` (used for metadata, sitemap, OG).

## Environment variables

See `.env.local.example`. Required for lead capture:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
GOOGLE_SHEET_ID
RESEND_API_KEY
LEAD_NOTIFY_EMAIL
NEXT_PUBLIC_CAL_LINK
NEXT_PUBLIC_SITE_URL
```

### `check-env` behaviour

`npm run check-env` (also runs before `npm run build`) **warns** by default when vars are missing so Vercel deploys are not blocked while credentials are still being wired. Set `FORCE_ENV_CHECK=1` to fail the build on missing vars.

## Before launch — content / legal TODOs

1. **Proof / results** — replace placeholders when you have real outcomes.
2. **Photo** — add Daive’s photo in the About strip when ready.
3. **Socials + Cal** — fill `src/lib/site-config.ts` (`socials`, `calLink`).
4. **Governing law** — insert jurisdiction in `/terms` (HTML TODO comment in section 14).
5. **Cookies / analytics** — update `/privacy` section 9 if you add PostHog, GA, or a Meta pixel (HTML TODO comment).
6. **Bio link** — point Instagram/TikTok bio to `https://programcreator.com/apply`, not the homepage.

## Scripts

```bash
npm run dev          # local dev (Turbopack)
npm run check-env    # warn if env vars missing (FORCE_ENV_CHECK=1 to fail)
npm run build        # production build (runs check-env first)
npm run start        # serve production build
npm run lint         # ESLint
npx tsc --noEmit     # typecheck
```

## Deploy checklist (Vercel via GitHub)

1. Push this repo to GitHub.
2. Import the repo in Vercel (Framework: Next.js).
3. Paste all env vars listed above into Vercel → Project → Settings → Environment Variables.
4. Deploy (Vercel builds from GitHub on every push to `main`). `check-env` warns by default — set `FORCE_ENV_CHECK=1` in Vercel only when you want the build to fail on missing lead-capture vars.
5. Add custom domain `programcreator.com` (+ `www` redirect).
6. Verify the Resend sending domain (SPF/DKIM/DMARC).
7. Confirm Cal.com embed loads on `/book` (dark theme, brand `#4D9BFF`).
8. Re-run `supabase/schema.sql` if upgrading from an older leads schema (v3 drops revenue/goal/budget/source; adds `terms_ack` and expanded status values).
9. Submit a test lead through `/apply` → check Supabase, Sheet, and both emails.
10. Submit `https://programcreator.com/sitemap.xml` in Google Search Console.

Do **not** use `vercel --prod` as the primary path — push to GitHub and let Vercel auto-deploy.

## Design tokens

Defined in `src/app/globals.css` as `--pc-*` and wired into Tailwind (`bg-navy-800`, `text-pc-white`, `bg-accent`, etc.). Dark theme only — see `.cursorrules` for voice, funnel, and visual rules.
