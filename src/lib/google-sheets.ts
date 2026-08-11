import { google } from "googleapis";
import type { LeadRecord } from "@/lib/validation";

function formatTimestamp(d = new Date()): string {
  return d.toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " UTC");
}

/**
 * Append a lead row to Google Sheets. Fail-soft: logs and returns, never throws.
 * Column order matches supabase/schema.sql + denormalised socials/utm.
 */
export async function appendLeadToSheet(
  lead: LeadRecord & { id?: string; created_at?: string }
): Promise<void> {
  try {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!email || !privateKey || !sheetId) {
      console.warn("[google-sheets] Missing credentials, skipping append");
      return;
    }

    const auth = new google.auth.JWT({
      email,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const socials = lead.socials ?? {};
    const utm = lead.utm ?? {};

    const row = [
      lead.id ?? "",
      lead.created_at ?? formatTimestamp(),
      lead.full_name,
      lead.email,
      lead.brand_name ?? "",
      lead.lane,
      socials.instagram ?? "",
      socials.tiktok ?? "",
      socials.youtube ?? "",
      socials.website ?? "",
      lead.follower_range ?? "",
      lead.has_product ?? "",
      lead.biggest_bottleneck ?? "",
      lead.ready_to_start ?? "",
      lead.terms_ack ? "yes" : "no",
      "new",
      "", // notes
      utm.utm_source ?? "",
      utm.utm_medium ?? "",
      utm.utm_campaign ?? "",
      utm.referrer ?? "",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Leads!A:U",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });
  } catch (err) {
    console.error("[google-sheets] appendLeadToSheet failed", err);
  }
}
