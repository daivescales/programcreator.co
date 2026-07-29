// TEMPLATE ONLY — not legal advice. Have a qualified attorney review and adapt before publishing.

import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "General disclaimer for ProgramCreator website content, including no professional advice and no guaranteed results.",
};

const toc = [
  { id: "general", label: "General information only" },
  { id: "no-advice", label: "No professional advice" },
  { id: "no-guarantee", label: "No guarantee of results" },
  { id: "external-links", label: "External links" },
  { id: "testimonials", label: "Testimonials and case studies" },
  { id: "errors", label: "Errors and omissions" },
  { id: "limitation", label: "Limitation of liability" },
  { id: "contact", label: "Contact" },
];

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" lastUpdated="[DATE]" toc={toc}>
      <h2 id="general">General information only</h2>
      <p>
        The content on programcreator.com (the &quot;Site&quot;), operated by [BUSINESS
        LEGAL NAME], is provided for general informational purposes about our services
        and approach. Nothing on the Site constitutes a binding offer, guarantee, or
        professional engagement unless and until confirmed in a separate written
        agreement.
      </p>

      <h2 id="no-advice">No professional advice</h2>
      <p>
        Site content is not legal, financial, tax, investment, accounting, or business
        advice. You should not rely on the Site as a substitute for advice from qualified
        professionals familiar with your specific situation. Decisions you make based on
        Site content are made at your own risk.
      </p>

      <h2 id="no-guarantee">No guarantee of results</h2>
      <p>
        We do not guarantee any particular outcome from visiting the Site, submitting an
        application, booking a call, or engaging our services. Business results depend on
        many factors outside our control, including your audience, market conditions,
        execution, and timing. Past examples, if any, do not predict future performance.
      </p>

      <h2 id="external-links">External links disclaimer</h2>
      <p>
        The Site may contain links to third-party websites or embeds. Those resources are
        not under our control. We are not responsible for their content, accuracy,
        availability, or practices. Linking or embedding does not imply endorsement.
      </p>

      <h2 id="testimonials">Testimonials and case studies</h2>
      <p>
        Any testimonials, case studies, examples, or results described on the Site
        reflect individual experiences. They are not typical or promised outcomes and
        should not be interpreted as a representation that you will achieve similar
        results. Individual results vary widely.
      </p>

      <h2 id="errors">Errors and omissions</h2>
      <p>
        While we aim to keep Site information accurate and current, we do not warrant
        completeness or accuracy. Content may contain typographical errors, omissions, or
        outdated information and may be changed without notice.
      </p>

      <h2 id="limitation">Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, [BUSINESS LEGAL NAME] disclaims liability
        for any loss or damage arising from your use of, or reliance on, the Site or any
        linked third-party resource. Additional limitations may apply under our{" "}
        <a href="/terms">Terms of Service</a>.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about this disclaimer:
      </p>
      <p>
        [BUSINESS LEGAL NAME]
        <br />
        [BUSINESS ADDRESS]
        <br />
        Email: [CONTACT EMAIL]
        <br />
        [JURISDICTION]
      </p>
    </LegalLayout>
  );
}
