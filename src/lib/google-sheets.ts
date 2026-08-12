import { google } from "googleapis";
import type { LeadRecord } from "@/lib/validation";

const SHEET_TAB = "Leads";
const HEADER_ROW = [
  "Date",
  "Name",
  "Email",
  "Brand",
  "Lane",
  "Status",
  "Qualified",
  "Followers",
  "Sells already",
  "Investment",
  "Timeline",
  "What's broken",
  "Instagram",
  "TikTok",
  "YouTube",
  "Website",
  "Booked at",
  "Source",
  "Notes",
] as const;

function formatTimestamp(d = new Date()): string {
  return d.toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " UTC");
}

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !privateKey || !sheetId) {
    return null;
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return {
    sheets: google.sheets({ version: "v4", auth }),
    sheetId,
  };
}

/**
 * Ensure the Leads tab exists with the expected header row. Fail-soft.
 */
export async function ensureSheetHeaders(): Promise<void> {
  try {
    const client = getSheetsClient();
    if (!client) {
      console.warn("[google-sheets] Missing credentials, skipping ensureSheetHeaders");
      return;
    }

    const { sheets, sheetId } = client;
    const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
    const hasTab = meta.data.sheets?.some(
      (s) => s.properties?.title === SHEET_TAB
    );

    if (!hasTab) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: SHEET_TAB } } }],
        },
      });
    }

    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${SHEET_TAB}!A1:S1`,
    });

    const first = existing.data.values?.[0];
    if (!first || first.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: `${SHEET_TAB}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[...HEADER_ROW]] },
      });
    }
  } catch (err) {
    console.error("[google-sheets] ensureSheetHeaders failed", err);
  }
}

/**
 * Append a lead row. Returns the 1-based sheet row number, or null on failure.
 * Fail-soft: logs and returns null, never throws.
 */
export async function appendLeadToSheet(
  lead: LeadRecord & {
    id?: string;
    created_at?: string;
    status?: string;
    qualified?: boolean;
  }
): Promise<number | null> {
  try {
    const client = getSheetsClient();
    if (!client) {
      console.warn("[google-sheets] Missing credentials, skipping append");
      return null;
    }

    await ensureSheetHeaders();

    const { sheets, sheetId } = client;
    const socials = lead.socials ?? {};
    const utm = lead.utm ?? {};
    const sourceBits = [
      utm.utm_source,
      utm.utm_medium,
      utm.utm_campaign,
      utm.referrer,
    ]
      .filter(Boolean)
      .join(" / ");

    const status =
      lead.status ??
      (lead.qualified === false ? "not_qualified" : "new");

    const row = [
      lead.created_at ?? formatTimestamp(),
      lead.full_name,
      lead.email,
      lead.brand_name ?? "",
      lead.lane,
      status,
      lead.qualified === false ? "no" : "yes",
      lead.follower_range ?? "",
      lead.has_product ?? "",
      lead.investment_range ?? "",
      lead.ready_to_start ?? "",
      lead.biggest_bottleneck ?? "",
      socials.instagram ?? "",
      socials.tiktok ?? "",
      socials.youtube ?? "",
      socials.website ?? "",
      "", // Booked at
      sourceBits,
      "", // Notes
    ];

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${SHEET_TAB}!A:S`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });

    const updatedRange = result.data.updates?.updatedRange;
    if (updatedRange) {
      const match = updatedRange.match(/![A-Z]+(\d+)/);
      if (match?.[1]) return Number(match[1]);
    }

    return null;
  } catch (err) {
    console.error("[google-sheets] appendLeadToSheet failed", err);
    return null;
  }
}

/**
 * Mark the most recent sheet row for this email as Booked. Fail-soft.
 */
export async function markLeadBookedInSheet(
  email: string,
  bookedAt: string
): Promise<void> {
  try {
    const client = getSheetsClient();
    if (!client) {
      console.warn("[google-sheets] Missing credentials, skipping markLeadBookedInSheet");
      return;
    }

    const { sheets, sheetId } = client;
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${SHEET_TAB}!A:S`,
    });

    const rows = res.data.values;
    if (!rows || rows.length < 2) return;

    const needle = email.trim().toLowerCase();
    let targetIndex = -1;

    for (let i = rows.length-1; i >= 1; i -= 1) {
      const rowEmail = String(rows[i]?.[2] ?? "").trim().toLowerCase();
      if (rowEmail === needle) {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex < 0) return;

    const sheetRow = targetIndex + 1;
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        valueInputOption: "USER_ENTERED",
        data: [
          {
            range: `${SHEET_TAB}!F${sheetRow}`,
            values: [["Booked"]],
          },
          {
            range: `${SHEET_TAB}!Q${sheetRow}`,
            values: [[bookedAt]],
          },
        ],
      },
    });
  } catch (err) {
    console.error("[google-sheets] markLeadBookedInSheet failed", err);
  }
}
