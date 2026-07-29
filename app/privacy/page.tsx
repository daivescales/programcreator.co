// TEMPLATE ONLY — not legal advice. Have an attorney review before publishing.

import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ProgramCreator collects, uses, and protects personal information submitted through this site.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="[DATE]">
      <h2>Introduction</h2>
      <p>
        This Privacy Policy explains how [BUSINESS LEGAL NAME] (&quot;ProgramCreator,&quot;
        &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares information when you
        use programcreator.com and related services. Our registered address is
        [BUSINESS ADDRESS]. Contact us at [CONTACT EMAIL].
      </p>

      <h2>Information we collect</h2>
      <p>We may collect:</p>
      <ul>
        <li>Application form data (name, email, brand details, audience information, goals, budget, timeline, and notes)</li>
        <li>Contact details when you email us</li>
        <li>Basic usage data such as pages visited, device/browser type, and approximate location derived from IP address</li>
        <li>Booking-related information when you schedule a call through Cal.com</li>
      </ul>

      <h2>How we use your information</h2>
      <p>
        We use information to review applications, communicate with you, schedule
        calls, operate and improve the website, and comply with legal obligations.
        We do not sell your personal information.
      </p>

      <h2>Legal bases for processing (GDPR)</h2>
      <p>
        Where applicable, we process personal data based on consent, legitimate
        interests in operating our business and responding to enquiries, performance
        of a contract or steps prior to entering one, and legal obligations.
      </p>

      <h2>Third-party services</h2>
      <p>
        We use processors including Supabase (data storage), Cal.com (scheduling),
        and Vercel (hosting). Each provider processes data under its own terms and
        privacy policy. We encourage you to review those policies.
      </p>

      <h2>How we share information</h2>
      <p>
        We share information with service providers who help us operate the site,
        when required by law, or in connection with a business transfer. We do not
        sell personal data.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain application and contact records for as long as needed to evaluate
        enquiries, maintain business records, and meet legal requirements, then
        delete or anonymise them when no longer needed.
      </p>

      <h2>Data security</h2>
      <p>
        We take reasonable technical and organisational measures to protect personal
        data. No method of transmission or storage is completely secure.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on your location, you may have rights under GDPR and CCPA,
        including access, correction, deletion, portability, and objection to certain
        processing. To exercise these rights, email [CONTACT EMAIL]. We may need to
        verify your request.
      </p>

      <h2>International data transfers</h2>
      <p>
        Your information may be processed in countries other than your own. Where
        required, we take steps to ensure appropriate safeguards for such transfers.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        This site is not directed at individuals under 18. We do not knowingly
        collect personal information from children.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this Privacy Policy from time to time. The &quot;Last updated&quot;
        date at the top reflects the latest revision.
      </p>

      <h2>Contact</h2>
      <p>
        [BUSINESS LEGAL NAME]<br />
        [BUSINESS ADDRESS]<br />
        Email: [CONTACT EMAIL]<br />
        Jurisdiction reference: [JURISDICTION]
      </p>
    </LegalLayout>
  );
}
