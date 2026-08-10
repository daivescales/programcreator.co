/**
 * Warns (or fails if FORCE_ENV_CHECK=1) when required env vars are missing.
 * Does not block Vercel deploys by default — the marketing site can ship while
 * Supabase / Sheets / Resend are still being configured. Lead capture will fail
 * at runtime until those vars are set.
 */

import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

const REQUIRED = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "GOOGLE_SHEET_ID",
  "RESEND_API_KEY",
  "LEAD_NOTIFY_EMAIL",
  "NEXT_PUBLIC_CAL_LINK",
  "NEXT_PUBLIC_SITE_URL",
] as const;

function loadEnvFile(filename: string) {
  const path = resolve(process.cwd(), filename);
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

// Back-compat with older Vercel / local configs
if (!process.env.NEXT_PUBLIC_CAL_LINK && process.env.NEXT_PUBLIC_CALCOM_LINK) {
  process.env.NEXT_PUBLIC_CAL_LINK = process.env.NEXT_PUBLIC_CALCOM_LINK;
}

const missing = REQUIRED.filter((key) => {
  const value = process.env[key];
  return !value || value.trim().length === 0;
});

const strict = process.env.FORCE_ENV_CHECK === "1";

if (missing.length > 0) {
  const lines = [
    "",
    "Missing environment variables for lead capture:",
    "",
    ...missing.map((key) => `  • ${key}`),
    "",
    "Add these in Vercel → Project → Settings → Environment Variables",
    "(or .env.local locally). See README.md → Setup.",
    "",
  ];
  if (strict) {
    console.error(lines.join("\n"));
    process.exit(1);
  }
  console.warn(lines.join("\n"));
  console.warn(
    "Build continuing. /api/lead will not work until these are set.\n"
  );
} else {
  console.log("All required environment variables are set.");
}
