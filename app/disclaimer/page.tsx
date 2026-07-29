// TEMPLATE ONLY — not legal advice. Have an attorney review before publishing.

import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "General and earnings disclaimer for ProgramCreator — no income guarantees or promised results.",
};

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" lastUpdated="[DATE]">
      <h2>General information only</h2>
      <p>
        Content on this website is for general informational purposes only. It is
        not legal, financial, tax, or professional advice. You should seek advice
        from qualified professionals before making business decisions.
      </p>

      <h2>No professional advice</h2>
      <p>
        Nothing on this site creates an advisor–client relationship. Examples and
        descriptions of services are illustrative and may not apply to your
        situation.
      </p>

      <h2>External links</h2>
      <p>
        We may link to third-party sites. We are not responsible for their content,
        policies, or practices.
      </p>

      <h2>Errors and omissions</h2>
      <p>
        While we aim for accuracy, we do not warrant that site content is complete,
        current, or free of errors.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, [BUSINESS LEGAL NAME] disclaims
        liability for any loss or damage arising from use of this site or reliance
        on its content.
      </p>

      <h2>Earnings disclaimer</h2>
      <p>
        We make no income guarantees or projections. Results from any product build
        depend on the individual&apos;s audience, market, effort, timing, and factors
        outside our control. Any figures shown on this site, if any, are examples
        only and are not typical or promised results.
      </p>
      <p>
        Testimonials and case studies, if published, reflect individual experiences
        and are not guarantees of similar outcomes. Forward-looking statements are
        speculative. You acknowledge normal business risk and remain responsible for
        your own business decisions.
      </p>
      <p>
        No income outcome is guaranteed. Terms of any client engagement are agreed
        in writing before work begins.
      </p>

      <h2>Contact</h2>
      <p>
        [BUSINESS LEGAL NAME]<br />
        [BUSINESS ADDRESS]<br />
        Email: [CONTACT EMAIL]<br />
        [JURISDICTION]
      </p>
    </LegalLayout>
  );
}
