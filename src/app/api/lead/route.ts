import { NextRequest, NextResponse } from "next/server";
import { appendLeadToSheet } from "@/lib/google-sheets";
import {
  sendApplicantConfirmation,
  sendLeadNotification,
  sendNotQualifiedNotice,
} from "@/lib/email";
import { getSupabaseAdmin } from "@/lib/supabase";
import { leadSchema, type LeadRecord } from "@/lib/validation";

export const runtime = "nodejs";

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MIN_FILL_MS = 4000;

type RateEntry = { count: number; resetAt: number };
const rateMap = new Map<string, RateEntry>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

function fakeOk() {
  return NextResponse.json({ ok: true, id: "ok" });
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many submissions. Try again in a few minutes." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed.",
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (data.company_website && data.company_website.trim().length > 0) {
      return fakeOk();
    }

    if (
      typeof data.startedAt !== "number" ||
      Date.now() - data.startedAt < MIN_FILL_MS
    ) {
      return fakeOk();
    }

    const qualified =
      data.qualified !== false && data.investment_range !== "Nothing right now";
    const status = qualified ? "new" : "not_qualified";

    const lead: LeadRecord = {
      full_name: data.full_name,
      email: data.email,
      brand_name: data.brand_name,
      lane: data.lane,
      socials: data.socials,
      follower_range: data.follower_range,
      has_product: data.has_product,
      biggest_bottleneck: data.biggest_bottleneck,
      investment_range: data.investment_range,
      ready_to_start: data.ready_to_start,
      terms_ack: data.terms_ack ?? false,
      qualified,
      utm: data.utm,
    };

    const supabase = getSupabaseAdmin();
    const { data: inserted, error } = await supabase
      .from("leads")
      .insert({
        full_name: lead.full_name,
        email: lead.email,
        brand_name: lead.brand_name,
        lane: lead.lane,
        socials: lead.socials,
        follower_range: lead.follower_range,
        has_product: lead.has_product,
        biggest_bottleneck: lead.biggest_bottleneck,
        investment_range: lead.investment_range,
        ready_to_start: lead.ready_to_start ?? null,
        terms_ack: lead.terms_ack ?? false,
        qualified,
        status,
        utm: lead.utm,
      })
      .select("id, created_at")
      .single();

    if (error || !inserted) {
      console.error("[api/lead] Supabase insert failed", error);
      return NextResponse.json(
        { ok: false, error: "Could not save your application. Try again." },
        { status: 500 }
      );
    }

    const leadWithMeta = {
      ...lead,
      id: inserted.id as string,
      created_at: inserted.created_at as string,
      status,
    };

    const results = await Promise.allSettled([
      (async () => {
        const row = await appendLeadToSheet(leadWithMeta);
        if (row != null) {
          const { error: updateError } = await supabase
            .from("leads")
            .update({ sheet_row: row })
            .eq("id", inserted.id);
          if (updateError) {
            console.error("[api/lead] sheet_row update failed", updateError);
          }
        }
      })(),
      sendLeadNotification(leadWithMeta),
      qualified
        ? sendApplicantConfirmation(lead)
        : sendNotQualifiedNotice(lead),
    ]);

    for (const result of results) {
      if (result.status === "rejected") {
        console.error("[api/lead] side-effect failed", result.reason);
      }
    }

    return NextResponse.json({ ok: true, id: inserted.id });
  } catch (err) {
    console.error("[api/lead] unexpected error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
