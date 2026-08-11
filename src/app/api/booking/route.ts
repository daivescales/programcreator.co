import { NextRequest, NextResponse } from "next/server";
import { markLeadBooked } from "@/lib/booking";

export const runtime = "nodejs";

type BookingBody = {
  email?: string;
  bookedAt?: string;
  bookingRef?: string;
};

export async function POST(req: NextRequest) {
  try {
    let body: BookingBody;
    try {
      body = (await req.json()) as BookingBody;
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    if (!body.email || !body.bookedAt) {
      return NextResponse.json(
        { ok: false, error: "email and bookedAt are required." },
        { status: 400 }
      );
    }

    const result = await markLeadBooked({
      email: body.email,
      bookedAt: body.bookedAt,
      bookingRef: body.bookingRef,
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error ?? "Booking update failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/booking] unexpected error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
