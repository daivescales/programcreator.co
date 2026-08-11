# ProgramCreator

Production landing site + application funnel for **ProgramCreator**, Creator Product Scaling by Daive (`@daivescales`).

Creators and digital brands work on a **revenue split** (nothing upfront for my time; client still funds ads, tooling, product costs). Physical product brands work on a **monthly retainer**. Every CTA goes to `/apply`. Qualified leads book via Cal.com on `/book`.

## Stack

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4
- Framer Motion (restrained: MaskText, HandUnderline, Reveal, HoverRow, StaggerList, MagneticButton, ScrollProgress, marks)
- Supabase (`leads` table)
- Google Sheets API (journey tracking through to booked)
- Resend
- Cal.com embed (`@calcom/embed-react`) + webhook backup

**Not used:** Lenis, GSAP, ScrollTrigger, custom cursor, scramble/glitch, marquees, counters, pulse dots, mockups, scroll-pin / parallax, Signature, grain.

## Design (v5)

Quiet expensive consultancy: mid-navy page (`#0B2038`), soft `rounded-panel` / `rounded-control`, tonal navy layering, Inter Tight + Caveat handwriting accents only. See `.cursorrules`.

Landing is **7 blocks**: Hero, Model, Lanes, Process, AboutStrip, FAQ, FinalCTA.

`/apply` is an **11-step** two-panel flow (36/64) with an investment gate on step 9. Selecting "Nothing right now" closes the application (status `not_qualified`), sends `sendNotQualifiedNotice`, and never routes to `/book`.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Landing (7 blocks) |
| `/apply` | 11-step two-panel application + DQ gate (noindex) |
| `/book` | Cal.com booking + thank-you state (noindex) |
| `/legal` | Legal index |
| `/terms` | Terms of Service (15 sections) |
| `/privacy` | Privacy Policy (12 sections) |
| `/cookies` | Cookie Policy |
| `/disclaimer` | Results and Earnings Disclaimer |
| `/dev/marks` | Temporary marks playground (disallowed in robots, delete before launch) |

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
3. SQL Editor → paste and run `supabase/schema.sql` (drops and recreates `leads` with investment / qualified / booking / sheet_row fields).
4. Set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server only, never expose to the client)

### 2. Google Sheets

1. [Google Cloud Console](https://console.cloud.google.com/) → create a project (or pick one).
2. Enable **Google Sheets API**.
3. Create a **service account** → download JSON key.
4. Create a Google Sheet (or use an existing one). Share it with the service account email as **Editor**.
5. Set:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` = `client_email` from the JSON
   - `GOOGLE_PRIVATE_KEY` = `private_key` from the JSON (keep `\n` escapes; wrap in quotes)
   - `GOOGLE_SHEET_ID` = the ID from the sheet URL (`/d/<THIS_ID>/edit`)

On first append, `ensureSheetHeaders()` creates a **Leads** tab and writes headers if needed. Columns track the full journey: Status, Qualified, Investment, Booked at, etc. `appendLeadToSheet` returns the row number stored on the lead as `sheet_row`. `markLeadBookedInSheet` updates Status → Booked and fills Booked at when a call is booked.

Sheets writes fail soft. A Sheets outage will not block a lead (Supabase is the hard dependency).

### 3. Resend

1. Create an API key at [resend.com](https://resend.com).
2. Verify your sending domain before production.
3. Set:
   - `RESEND_API_KEY`
   - `LEAD_NOTIFY_EMAIL` (your inbox for new applications; use a real address you own)

Emails fail soft. Templates are dark navy, no images, no em dashes. If `site.email` in `src/lib/site-config.ts` is empty (the default), confirmation emails omit the reply address line and the site shows **Email coming soon** instead of inventing an address or a broken mailto.

### 4. Cal.com

1. Create event type: **ProgramCreator Brand Audit Call**, 20 min, video, with buffer.
2. Copy the link slug (e.g. `daivescales/discovery`).
3. Set `NEXT_PUBLIC_CAL_LINK=daivescales/discovery`
4. Also update `calLink` in `src/lib/site-config.ts` if you change the default.

#### Cal webhook (booking sync backup)

People who book from an email link (not the `/book` embed) still need the sheet and lead status updated.

1. Generate a long random string and set `CAL_WEBHOOK_SECRET` in Vercel / `.env.local`.
2. In Cal.com → Settings → Developer → Webhooks → New webhook:
   - Subscriber URL: `https://programcreator.com/api/cal-webhook?secret=YOUR_CAL_WEBHOOK_SECRET`
     (query secret is verified; you can also send the same value as `x-cal-webhook-secret` or as HMAC via `x-cal-signature-256`)
   - Event triggers: **BOOKING_CREATED**
   - Secret: the same `CAL_WEBHOOK_SECRET` value if Cal asks for one
3. Save. Test a booking. The handler is idempotent: a lead already marked `booked` is not double-emailed.

`npm run check-env` **warns** if `CAL_WEBHOOK_SECRET` is missing. It does not hard-fail the local build for that var alone.

The `/book` page also POSTs to `/api/booking` on embed success (email, bookedAt, bookingRef), updates the lead, marks the sheet, and sends `sendBookingConfirmation`.

### 5. Site URL and contact email

Set `NEXT_PUBLIC_SITE_URL=https://programcreator.com` (metadata, sitemap, OG).

Leave `site.email` as `""` until you have a real address. Never invent a contact address.

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

Optional but recommended for production booking sync:

```
CAL_WEBHOOK_SECRET
```

### `check-env` behaviour

`npm run check-env` (also runs before `npm run build`) **warns** by default when required vars are missing so Vercel deploys are not blocked while credentials are still being wired. Set `FORCE_ENV_CHECK=1` to fail the build on missing required vars. `CAL_WEBHOOK_SECRET` is always warn-only.

## Funnel notes

- Step 9 investment gate: "Nothing right now" → `qualified=false`, `status=not_qualified`, soft DQ screen, `sendNotQualifiedNotice`. Never say unqualified / rejected / denied on screen.
- Investment copy is launch costs (ads, tooling, product), not my fee. Must not contradict "nothing upfront".
- Booking: `/api/booking` + Cal webhook → status `booked`, sheet Status/Booked at, booking confirmation. Idempotent.
- `sheet_row` stored on the lead for sheet updates.

## Before launch, content / legal TODOs

1. **Photo** - add Daive's photo in the About strip when ready.
2. **site.email** - set a real address in `src/lib/site-config.ts`.
3. **Socials + Cal** - fill `src/lib/site-config.ts` (`socials`, `calLink` if needed).
4. **Governing law** - insert jurisdiction in `/terms` section 14 (HTML TODO comment).
5. **Cookies / analytics** - update `/cookies` if you add PostHog, GA, or a Meta pixel (HTML TODO comment).
6. **Delete** `/dev/marks` before launch.
7. **Bio link** - point Instagram/TikTok bio to `https://programcreator.com/apply`, not the homepage.

## Scripts

```bash
npm run dev          # local dev (Turbopack)
npm run check-env    # warn if env vars missing (FORCE_ENV_CHECK=1 to fail required)
npm run build        # production build (runs check-env first)
npm run start        # serve production build
npm run lint         # ESLint
npx tsc --noEmit     # typecheck
```

## Deploy checklist (Vercel via GitHub)

1. Push this repo to GitHub.
2. Import the repo in Vercel (Framework: Next.js).
3. Paste all env vars listed above into Vercel → Project → Settings → Environment Variables (include `CAL_WEBHOOK_SECRET`).
4. Deploy (Vercel builds from GitHub on every push to `main`).
5. Add custom domain `programcreator.com` (+ `www` redirect).
6. Verify the Resend sending domain (SPF/DKIM/DMARC).
7. Confirm Cal.com embed loads on `/book` (dark theme, brand `#4D9BFF`).
8. Re-run `supabase/schema.sql` when upgrading (v5 drops and recreates `leads`).
9. Submit a test lead through `/apply` → check Supabase, Sheet, and emails. Test the investment DQ path. Book a call and confirm status / sheet / confirmation email.
10. Configure the Cal webhook as above.
11. Submit `https://programcreator.com/sitemap.xml` in Google Search Console.

Do **not** use `vercel --prod` as the primary path. Push to GitHub and let Vercel auto-deploy.

## Design tokens

Defined in `src/app/globals.css` as `--pc-*` and wired into Tailwind (`bg-navy-800`, `text-pc-white`, `bg-accent`, etc.). Dark theme only. See `.cursorrules` for voice, funnel, and visual rules.
