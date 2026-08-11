import { Resend } from "resend";
import { contactEmail, site } from "@/lib/site-config";
import type { LeadRecord } from "@/lib/validation";

const NAVY = "#0B2038";
const NAVY_CARD = "#102C4C";
const LINE = "rgba(255,255,255,0.09)";
const WHITE = "#FFFFFF";
const TEXT = "#C2D4E8";
const MUTED = "#94AAC4";
const ACCENT = "#4D9BFF";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | undefined, emphasise = false): string {
  const display = value?.trim() ? escapeHtml(value) : "-";
  const style = emphasise
    ? `padding:12px 0;border-bottom:1px solid ${LINE};background:rgba(77,155,255,0.08);`
    : `padding:10px 0;border-bottom:1px solid ${LINE};`;
  return `<tr>
    <td style="${style}width:160px;vertical-align:top;color:${MUTED};font-size:13px;padding-right:16px;">${escapeHtml(label)}</td>
    <td style="${style}color:${WHITE};font-size:14px;white-space:pre-wrap;">${display}</td>
  </tr>`;
}

function shell(body: string): string {
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:${NAVY};font-family:Inter,Helvetica,Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:${NAVY_CARD};border:1px solid ${LINE};padding:28px;">
    ${body}
  </div>
</body></html>`;
}

function replyLineHtml(): string {
  const email = contactEmail();
  if (!email) return "";
  return `<p style="margin:20px 0 0;color:${MUTED};font-size:13px;line-height:1.5;">Reply to ${escapeHtml(email)}</p>`;
}

function replyLineText(): string {
  const email = contactEmail();
  if (!email) return "";
  return `\n\nReply to ${email}`;
}

/**
 * Notify Daive of a new lead. Fail-soft.
 */
export async function sendLeadNotification(
  lead: LeadRecord & { id?: string }
): Promise<void> {
  try {
    const resend = getResend();
    const to = process.env.LEAD_NOTIFY_EMAIL;
    if (!resend || !to) {
      console.warn("[email] Missing Resend config, skipping lead notification");
      return;
    }

    const socialBits = [
      lead.socials?.instagram && `IG @${lead.socials.instagram}`,
      lead.socials?.tiktok && `TT @${lead.socials.tiktok}`,
      lead.socials?.youtube && `YT @${lead.socials.youtube}`,
      lead.socials?.website,
    ]
      .filter(Boolean)
      .join(" · ");

    const qualified = lead.qualified !== false;
    const html = shell(`
    <p style="margin:0 0 4px;color:${ACCENT};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">${qualified ? "New application" : "Not qualified"}</p>
    <h1 style="margin:0 0 8px;color:${WHITE};font-size:22px;font-weight:600;">${escapeHtml(lead.full_name)}</h1>
    <p style="margin:0 0 20px;color:${TEXT};font-size:14px;">${escapeHtml(lead.lane)} · ${escapeHtml(lead.brand_name ?? "")}</p>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Email", lead.email)}
      ${row("Socials", socialBits || undefined)}
      ${row("Audience", lead.follower_range)}
      ${row("Has product", lead.has_product)}
      ${row("Investment", lead.investment_range, true)}
      ${row("Ready", lead.ready_to_start)}
      ${row("Qualified", qualified ? "yes" : "no")}
      ${row("Terms ack", lead.terms_ack ? "yes" : "no")}
      ${row("What's broken", lead.biggest_bottleneck, true)}
      ${row("Lead ID", lead.id)}
    </table>
    <p style="margin:24px 0 0;">
      <a href="mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent(`Re: ProgramCreator, ${lead.full_name}`)}"
         style="display:inline-block;background:${ACCENT};color:${NAVY};text-decoration:none;padding:12px 18px;font-size:14px;font-weight:500;">
        Reply to ${escapeHtml(lead.full_name.split(" ")[0] ?? lead.full_name)}
      </a>
    </p>`);

    const text = [
      `New application: ${lead.full_name} (${lead.lane})`,
      `Email: ${lead.email}`,
      `Brand: ${lead.brand_name ?? ""}`,
      `Investment: ${lead.investment_range ?? ""}`,
      `What's broken: ${lead.biggest_bottleneck ?? ""}`,
      `Qualified: ${qualified ? "yes" : "no"}`,
    ].join("\n");

    await resend.emails.send({
      from: `${site.name} <onboarding@resend.dev>`,
      to: [to],
      replyTo: lead.email,
      subject: `New application, ${lead.full_name}, ${lead.lane}`,
      html,
      text,
    });
  } catch (err) {
    console.error("[email] sendLeadNotification failed", err);
  }
}

/**
 * Confirm receipt to the applicant. Fail-soft.
 */
export async function sendApplicantConfirmation(lead: LeadRecord): Promise<void> {
  try {
    const resend = getResend();
    if (!resend) {
      console.warn("[email] Missing Resend config, skipping applicant confirmation");
      return;
    }

    const first = lead.full_name.split(" ")[0] ?? lead.full_name;
    const body = `Your application is in. I read every one myself, usually within a few days. If I think we are a good fit to work together, I will reach out. If you do not hear from me, it means I did not think I was the right person for your brand right now, and that is not a judgement on what you are building.`;

    const html = shell(`
    <p style="margin:0 0 4px;color:${ACCENT};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">${escapeHtml(site.name)}</p>
    <h1 style="margin:0 0 12px;color:${WHITE};font-size:22px;font-weight:600;">Got it, ${escapeHtml(first)}.</h1>
    <p style="margin:0 0 16px;color:${TEXT};font-size:15px;line-height:1.6;">${escapeHtml(body)}</p>
    <p style="margin:28px 0 0;color:${MUTED};font-size:13px;line-height:1.5;">
      Daive, ${escapeHtml(site.name)}
    </p>
    ${replyLineHtml()}`);

    const text = `Got it, ${first}.\n\n${body}\n\nDaive, ${site.name}${replyLineText()}`;

    await resend.emails.send({
      from: `${site.founder} at ${site.name} <onboarding@resend.dev>`,
      to: [lead.email],
      subject: `Application received, ${site.name}`,
      html,
      text,
    });
  } catch (err) {
    console.error("[email] sendApplicantConfirmation failed", err);
  }
}

/**
 * Confirm a booked call. Fail-soft.
 */
export async function sendBookingConfirmation(
  lead: LeadRecord,
  bookedAt: string
): Promise<void> {
  try {
    const resend = getResend();
    if (!resend) {
      console.warn("[email] Missing Resend config, skipping booking confirmation");
      return;
    }

    const first = lead.full_name.split(" ")[0] ?? lead.full_name;
    let when = bookedAt;
    try {
      when = new Date(bookedAt).toLocaleString(undefined, {
        dateStyle: "full",
        timeStyle: "short",
      });
    } catch {
      // keep raw
    }

    const body = `Your call is booked for ${when}. A calendar invite is on its way. Bring your numbers if you have them, and a clear sense of what is currently costing you the most. I will only follow up after the call if we are a fit.`;

    const html = shell(`
    <p style="margin:0 0 4px;color:${ACCENT};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">${escapeHtml(site.name)}</p>
    <h1 style="margin:0 0 12px;color:${WHITE};font-size:22px;font-weight:600;">See you soon, ${escapeHtml(first)}.</h1>
    <p style="margin:0 0 16px;color:${TEXT};font-size:15px;line-height:1.6;">${escapeHtml(body)}</p>
    <p style="margin:28px 0 0;color:${MUTED};font-size:13px;line-height:1.5;">
      Daive, ${escapeHtml(site.name)}
    </p>
    ${replyLineHtml()}`);

    const text = `See you soon, ${first}.\n\n${body}\n\nDaive, ${site.name}${replyLineText()}`;

    await resend.emails.send({
      from: `${site.founder} at ${site.name} <onboarding@resend.dev>`,
      to: [lead.email],
      subject: `Call booked, ${site.name}`,
      html,
      text,
    });
  } catch (err) {
    console.error("[email] sendBookingConfirmation failed", err);
  }
}

/**
 * Soft notice for the investment gate path. Fail-soft.
 */
export async function sendNotQualifiedNotice(lead: LeadRecord): Promise<void> {
  try {
    const resend = getResend();
    if (!resend) {
      console.warn("[email] Missing Resend config, skipping not-qualified notice");
      return;
    }

    const first = lead.full_name.split(" ")[0] ?? lead.full_name;
    const p1 =
      "I am going to be straight with you. Every launch needs something behind it, even on a revenue split. Ads, tooling, product costs, setup. With nothing to put behind it there is no realistic way for me to move your numbers, so taking you on would waste both our time.";
    const p2 =
      "That is a timing answer, not a permanent one. When you have something to work with, apply again and I will read it properly.";

    const html = shell(`
    <p style="margin:0 0 4px;color:${ACCENT};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">${escapeHtml(site.name)}</p>
    <h1 style="margin:0 0 12px;color:${WHITE};font-size:22px;font-weight:600;">Not right now, ${escapeHtml(first)}.</h1>
    <p style="margin:0 0 16px;color:${TEXT};font-size:15px;line-height:1.6;">${escapeHtml(p1)}</p>
    <p style="margin:0 0 16px;color:${TEXT};font-size:15px;line-height:1.6;">${escapeHtml(p2)}</p>
    <p style="margin:28px 0 0;color:${MUTED};font-size:13px;line-height:1.5;">
      Daive, ${escapeHtml(site.name)}
    </p>
    ${replyLineHtml()}`);

    const text = `Not right now, ${first}.\n\n${p1}\n\n${p2}\n\nDaive, ${site.name}${replyLineText()}`;

    await resend.emails.send({
      from: `${site.founder} at ${site.name} <onboarding@resend.dev>`,
      to: [lead.email],
      subject: `About your application, ${site.name}`,
      html,
      text,
    });
  } catch (err) {
    console.error("[email] sendNotQualifiedNotice failed", err);
  }
}
