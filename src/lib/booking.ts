import { markLeadBookedInSheet } from "@/lib/google-sheets";
import { sendBookingConfirmation } from "@/lib/email";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { LeadRecord } from "@/lib/validation";

/**
 * Shared booking update used by /api/booking and /api/cal-webhook.
 * Idempotent: if the lead is already booked, skips email/sheet side effects.
 */
export async function markLeadBooked(opts: {
  email: string;
  bookedAt: string;
  bookingRef?: string;
}): Promise<{ ok: boolean; alreadyBooked?: boolean; error?: string }> {
  const email = opts.email.trim().toLowerCase();
  if (!email || !opts.bookedAt) {
    return { ok: false, error: "email and bookedAt are required." };
  }

  const supabase = getSupabaseAdmin();
  const { data: lead, error } = await supabase
    .from("leads")
    .select("*")
    .ilike("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[booking] lead lookup failed", error);
    return { ok: false, error: "Could not find that application." };
  }

  if (!lead) {
    return { ok: false, error: "No application found for that email." };
  }

  if (lead.status === "booked") {
    return { ok: true, alreadyBooked: true };
  }

  const { error: updateError } = await supabase
    .from("leads")
    .update({
      status: "booked",
      booked_at: opts.bookedAt,
      booking_ref: opts.bookingRef ?? lead.booking_ref ?? null,
    })
    .eq("id", lead.id);

  if (updateError) {
    console.error("[booking] update failed", updateError);
    return { ok: false, error: "Could not update booking." };
  }

  const record: LeadRecord = {
    full_name: lead.full_name,
    email: lead.email,
    brand_name: lead.brand_name,
    lane: lead.lane,
    socials: lead.socials ?? {},
    follower_range: lead.follower_range,
    has_product: lead.has_product,
    biggest_bottleneck: lead.biggest_bottleneck,
    investment_range: lead.investment_range,
    ready_to_start: lead.ready_to_start ?? undefined,
    terms_ack: lead.terms_ack ?? false,
    qualified: lead.qualified !== false,
    utm: lead.utm ?? {},
  };

  const results = await Promise.allSettled([
    markLeadBookedInSheet(lead.email, opts.bookedAt),
    sendBookingConfirmation(record, opts.bookedAt),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("[booking] side-effect failed", result.reason);
    }
  }

  return { ok: true };
}
