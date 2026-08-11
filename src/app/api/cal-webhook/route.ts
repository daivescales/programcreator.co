import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { markLeadBooked } from "@/lib/booking";

export const runtime = "nodejs";

function verifySecret(req: NextRequest, rawBody: string): boolean {
  const expected = process.env.CAL_WEBHOOK_SECRET?.trim();
  if (!expected) {
    console.warn("[api/cal-webhook] CAL_WEBHOOK_SECRET is not set");
    return false;
  }

  const querySecret = req.nextUrl.searchParams.get("secret");
  if (querySecret && querySecret === expected) return true;

  const headerSecret =
    req.headers.get("x-cal-webhook-secret") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (headerSecret && headerSecret === expected) return true;

  const signature = req.headers.get("x-cal-signature-256");
  if (signature) {
    const digest = createHmac("sha256", expected)
      .update(rawBody)
      .digest("hex");
    try {
      const a = Buffer.from(digest, "utf8");
      const b = Buffer.from(signature.replace(/^sha256=/i, ""), "utf8");
      if (a.length === b.length && timingSafeEqual(a, b)) return true;
    } catch {
      return false;
    }
  }

  return false;
}

function extractBooking(payload: Record<string, unknown>): {
  email?: string;
  bookedAt?: string;
  bookingRef?: string;
} {
  const data = (payload.data ?? payload.payload ?? payload) as Record<
    string,
    unknown
  >;

  const attendees = (data.attendees ?? data.attendee) as
    | Array<Record<string, unknown>>
    | Record<string, unknown>
    | undefined;

  let email: string | undefined;
  if (Array.isArray(attendees) && attendees[0]) {
    email = String(attendees[0].email ?? attendees[0].Email ?? "");
  } else if (attendees && typeof attendees === "object") {
    email = String(
      (attendees as Record<string, unknown>).email ??
        (attendees as Record<string, unknown>).Email ??
        ""
    );
  }

  if (!email) {
    email = String(
      data.email ??
        data.attendeeEmail ??
        (data.organizer as Record<string, unknown> | undefined)?.email ??
        ""
    );
  }

  const bookedAt = String(
    data.startTime ?? data.start ?? data.bookingStart ?? data.beginTime ?? ""
  );

  const bookingRef = String(
    data.uid ?? data.id ?? data.bookingId ?? data.reference ?? ""
  );

  return {
    email: email || undefined,
    bookedAt: bookedAt || undefined,
    bookingRef: bookingRef || undefined,
  };
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    if (!verifySecret(req, rawBody)) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }

    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const trigger = String(
      payload.triggerEvent ?? payload.type ?? payload.event ?? ""
    ).toUpperCase();

    if (trigger && trigger !== "BOOKING_CREATED") {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const { email, bookedAt, bookingRef } = extractBooking(payload);
    if (!email || !bookedAt) {
      console.warn("[api/cal-webhook] missing email or start time", payload);
      return NextResponse.json({ ok: true, skipped: true });
    }

    const result = await markLeadBooked({ email, bookedAt, bookingRef });
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error ?? "Update failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      alreadyBooked: result.alreadyBooked ?? false,
    });
  } catch (err) {
    console.error("[api/cal-webhook] unexpected error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
