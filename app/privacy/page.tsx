// TEMPLATE ONLY — not legal advice. Have a qualified attorney review and adapt before publishing.

import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ProgramCreator collects, uses, and protects personal information submitted through our site and application form.",
};

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information we collect" },
  { id: "how-we-use", label: "How we use your information" },
  { id: "legal-bases", label: "Legal bases for processing" },
  { id: "third-party-services", label: "Third-party services" },
  { id: "how-we-share", label: "How we share information" },
  { id: "data-retention", label: "Data retention" },
  { id: "data-security", label: "Data security" },
  { id: "your-rights", label: "Your rights" },
  { id: "international-transfers", label: "International data transfers" },
  { id: "childrens-privacy", label: "Children's privacy" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "How to contact us" },
];

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="[DATE]" toc={toc}>
      <h2 id="introduction">Introduction</h2>
      <p>
        This Privacy Policy explains how [BUSINESS LEGAL NAME] (&quot;ProgramCreator,&quot;
        &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, discloses, and
        protects personal information when you visit programcreator.com (the
        &quot;Site&quot;), submit an application, book a call, or otherwise interact with
        us. By using the Site, you acknowledge the practices described here. If
        you do not agree, please do not use the Site or submit personal information.
      </p>
      <p>
        Our registered address is [BUSINESS ADDRESS]. For privacy questions, contact
        us at [CONTACT EMAIL].
      </p>

      <h2 id="information-we-collect">Information we collect</h2>
      <p>We may collect the following categories of information:</p>
      <ul>
        <li>
          <strong className="text-mist-100">Application form data.</strong> Information
          you provide when applying to work with us, such as your name, email, phone
          number, social profiles, audience details, business goals, and other answers
          you choose to share.
        </li>
        <li>
          <strong className="text-mist-100">Contact details.</strong> Name, email
          address, and any message content you send when you contact us directly.
        </li>
        <li>
          <strong className="text-mist-100">Usage data.</strong> Technical information
          such as IP address, browser type, device information, pages visited, and
          approximate location derived from IP, collected automatically when you use
          the Site.
        </li>
        <li>
          <strong className="text-mist-100">Cookies and similar technologies.</strong>{" "}
          Small files or storage entries used to operate the Site, remember preferences
          (including cookie consent and application draft data), and — if enabled and
          consented — understand Site usage. See our{" "}
          <a href="/cookies">Cookie Policy</a> for details.
        </li>
      </ul>

      <h2 id="how-we-use">How we use your information</h2>
      <p>We use personal information to:</p>
      <ul>
        <li>Review applications and evaluate potential fit for our services</li>
        <li>Schedule and conduct intro calls and related communications</li>
        <li>Respond to inquiries and provide customer support</li>
        <li>Operate, maintain, secure, and improve the Site</li>
        <li>Comply with legal obligations and enforce our terms</li>
        <li>
          Analyze Site performance in aggregate form, where analytics are enabled and
          you have consented where required
        </li>
      </ul>

      <h2 id="legal-bases">Legal bases for processing (GDPR)</h2>
      <p>
        If you are located in the European Economic Area, United Kingdom, or a similar
        jurisdiction, we process personal data under one or more of the following
        legal bases:
      </p>
      <ul>
        <li>
          <strong className="text-mist-100">Consent</strong> — where you have given
          clear consent (for example, non-essential cookies)
        </li>
        <li>
          <strong className="text-mist-100">Contract / pre-contractual steps</strong>{" "}
          — to review applications and take steps at your request before entering a
          client agreement
        </li>
        <li>
          <strong className="text-mist-100">Legitimate interests</strong> — to operate
          and secure our Site and business, provided those interests are not overridden
          by your rights
        </li>
        <li>
          <strong className="text-mist-100">Legal obligation</strong> — where processing
          is required by applicable law
        </li>
      </ul>

      <h2 id="third-party-services">Third-party services we use</h2>
      <p>
        We use trusted third-party providers to operate the Site and deliver our
        services. Each provider processes data under its own privacy policy:
      </p>
      <ul>
        <li>
          <strong className="text-mist-100">Supabase</strong> — application and related
          data storage and database services
        </li>
        <li>
          <strong className="text-mist-100">Cal.com</strong> — scheduling and booking for
          intro calls
        </li>
        <li>
          <strong className="text-mist-100">Vercel</strong> — website hosting and delivery
        </li>
        <li>
          <strong className="text-mist-100">Analytics providers</strong> (if enabled) —
          aggregate usage measurement, only where permitted by your cookie preferences
        </li>
      </ul>
      <p>
        We encourage you to review each provider&apos;s privacy policy. We are not
        responsible for the privacy practices of third parties beyond our instructions
        to them as service providers.
      </p>

      <h2 id="how-we-share">How we share information</h2>
      <p>
        We do not sell your personal information. We may share information with:
      </p>
      <ul>
        <li>
          Service providers who assist us in operating the Site and business (such as
          hosting, database, scheduling, and email), under appropriate confidentiality
          and data-processing terms
        </li>
        <li>
          Professional advisors (legal, accounting) where reasonably necessary
        </li>
        <li>
          Authorities or other parties when required by law, legal process, or to
          protect rights, safety, and security
        </li>
        <li>
          A successor entity in connection with a merger, acquisition, or sale of
          assets, subject to appropriate safeguards
        </li>
      </ul>

      <h2 id="data-retention">Data retention</h2>
      <p>
        We retain personal information only as long as reasonably necessary for the
        purposes described in this policy, including to evaluate applications, maintain
        business records, resolve disputes, and meet legal, tax, or accounting
        requirements. Retention periods may vary by data type and context. When
        information is no longer needed, we take steps to delete or anonymize it.
      </p>

      <h2 id="data-security">Data security</h2>
      <p>
        We implement reasonable administrative, technical, and organizational measures
        designed to protect personal information against unauthorized access, loss, or
        alteration. No method of transmission or storage is completely secure; we cannot
        guarantee absolute security. Please use strong unique passwords for any accounts
        you control and notify us promptly of any suspected unauthorized use of your
        information in connection with our services.
      </p>

      <h2 id="your-rights">Your rights</h2>
      <p>
        Depending on your location, you may have rights under GDPR, CCPA/CPRA, or other
        applicable laws, which may include the right to:
      </p>
      <ul>
        <li>Access the personal information we hold about you</li>
        <li>Request correction of inaccurate or incomplete information</li>
        <li>Request deletion of personal information, subject to legal exceptions</li>
        <li>Request portability of certain data in a usable format</li>
        <li>Object to or restrict certain processing</li>
        <li>Withdraw consent where processing is based on consent</li>
        <li>
          Opt out of the &quot;sale&quot; or &quot;sharing&quot; of personal information
          as those terms are defined under California law (we do not sell personal
          information)
        </li>
      </ul>
      <p>
        To exercise these rights, email [CONTACT EMAIL]. We may need to verify your
        identity before fulfilling a request. You may also lodge a complaint with your
        local data protection authority where applicable.
      </p>

      <h2 id="international-transfers">International data transfers</h2>
      <p>
        We and our service providers may process information in countries other than
        where you live, including the United States. Where required, we rely on
        appropriate transfer mechanisms (such as standard contractual clauses) or other
        lawful bases to protect personal data transferred internationally.
      </p>

      <h2 id="childrens-privacy">Children&apos;s privacy</h2>
      <p>
        The Site and our services are directed to adults and are not intended for
        individuals under 18 years of age. We do not knowingly collect personal
        information from children under 18. If you believe we have collected such
        information, contact us at [CONTACT EMAIL] and we will take steps to delete it.
      </p>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The &quot;Last updated&quot;
        date at the top of this page reflects the latest revision. Material changes may
        be highlighted on the Site or communicated by email where appropriate. Continued
        use of the Site after changes take effect constitutes acceptance of the updated
        policy, except where additional consent is required by law.
      </p>

      <h2 id="contact">How to contact us</h2>
      <p>
        For privacy-related questions, requests, or concerns, contact:
      </p>
      <p>
        [BUSINESS LEGAL NAME]
        <br />
        [BUSINESS ADDRESS]
        <br />
        Email: [CONTACT EMAIL]
        <br />
        Governing jurisdiction reference: [JURISDICTION]
      </p>
    </LegalLayout>
  );
}
