import { Resend } from "resend";
import { site } from "@/lib/site-config";
import type { LeadRecord } from "@/lib/validation";

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
  const display = value?.trim() ? escapeHtml(value) : "—";
  const style = emphasise
    ? "padding:12px 0;border-bottom:1px solid #E4EAF1;background:#F2F7FE;"
    : "padding:10px 0;border-bottom:1px solid #E4EAF1;";
  return `<tr>
    <td style="${style}width:160px;vertical-align:top;color:#7C8B9C;font-size:13px;padding-right:16px;">${escapeHtml(label)}</td>
    <td style="${style}color:#10202F;font-size:14px;white-space:pre-wrap;">${display}</td>
  </tr>`;
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
      console.warn("[email] Missing Resend config — skipping lead notification");
      return;
    }

    const socialBits = [
      lead.socials?.instagram && `IG @${lead.socials.instagram}`,
      lead.socials?.tiktok && `TT @${lead.socials.tiktok}`,
      lead.socials?.youtube && `YT @${lead.socials.youtube}`,
      lead.website,
    ]
      .filter(Boolean)
      .join(" · ");

    const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#F6F9FC;font-family:Inter,Helvetica,Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#FFFFFF;border:1px solid #E4EAF1;border-radius:12px;padding:28px;">
    <p style="margin:0 0 4px;color:#3E8EF7;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">New lead</p>
    <h1 style="margin:0 0 8px;color:#10202F;font-size:22px;font-weight:600;">${escapeHtml(lead.full_name)}</h1>
    <p style="margin:0 0 20px;color:#46586B;font-size:14px;">${escapeHtml(lead.lane)} · ${escapeHtml(lead.brand_name ?? "")}</p>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Email", lead.email)}
      ${row("Socials", socialBits || undefined)}
      ${row("Audience", lead.follower_range)}
      ${row("Has product", lead.has_product)}
      ${row("Revenue", lead.revenue_range)}
      ${row("Ready", lead.ready_to_start)}
      ${row("Source", lead.source)}
      ${row("Bottleneck", lead.biggest_bottleneck, true)}
      ${row("90-day goal", lead.goal_90_days, true)}
      ${row("Lead ID", lead.id)}
    </table>
    <p style="margin:24px 0 0;">
      <a href="mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent(`Re: ProgramCreator — ${lead.full_name}`)}"
         style="display:inline-block;background:#3E8EF7;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-size:14px;font-weight:500;">
        Reply to ${escapeHtml(lead.full_name.split(" ")[0] ?? lead.full_name)}
      </a>
    </p>
  </div>
</body></html>`;

    await resend.emails.send({
      from: `${site.name} <onboarding@resend.dev>`,
      to: [to],
      replyTo: lead.email,
      subject: `New ProgramCreator lead — ${lead.full_name} (${lead.lane})`,
      html,
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
      console.warn("[email] Missing Resend config — skipping applicant confirmation");
      return;
    }

    const calLink =
      process.env.NEXT_PUBLIC_CAL_LINK || `https://cal.com/${site.calLink}`;
    const calUrl = calLink.startsWith("http")
      ? calLink
      : `https://cal.com/${calLink}`;
    const first = lead.full_name.split(" ")[0] ?? lead.full_name;

    const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#F6F9FC;font-family:Inter,Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #E4EAF1;border-radius:12px;padding:32px;">
    <p style="margin:0 0 4px;color:#3E8EF7;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">${escapeHtml(site.name)}</p>
    <h1 style="margin:0 0 12px;color:#10202F;font-size:22px;font-weight:600;">Got it, ${escapeHtml(first)}.</h1>
    <p style="margin:0 0 16px;color:#46586B;font-size:15px;line-height:1.6;">
      I read every application myself. Next step is a short call so we can see if this is a fit.
    </p>
    <p style="margin:0 0 16px;color:#46586B;font-size:15px;line-height:1.6;">
      If the booking page closed, grab a time here:
    </p>
    <p style="margin:0 0 28px;">
      <a href="${escapeHtml(calUrl)}"
         style="display:inline-block;background:#3E8EF7;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-size:14px;font-weight:500;">
        Book your call
      </a>
    </p>
    <p style="margin:0;color:#7C8B9C;font-size:13px;line-height:1.5;">
      Daive — ${escapeHtml(site.name)}
    </p>
  </div>
</body></html>`;

    await resend.emails.send({
      from: `${site.founder} at ${site.name} <onboarding@resend.dev>`,
      to: [lead.email],
      subject: `Application received — ${site.name}`,
      html,
    });
  } catch (err) {
    console.error("[email] sendApplicantConfirmation failed", err);
  }
}
