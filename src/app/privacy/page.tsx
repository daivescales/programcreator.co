import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects and uses application data.`,
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" currentPath="/privacy">
      <LegalSection number="01" title="Summary">
        <p>
          I collect what you put in the application form plus basic technical
          data. I use it to decide whether we are a fit and to get in touch. I
          do not sell it.
        </p>
      </LegalSection>

      <LegalSection number="02" title="What I collect">
        <p>
          <strong className="font-medium text-pc-white">Application data:</strong>{" "}
          name, email, brand name, lane, social handles and website, audience
          size, whether you currently sell something, what is currently broken,
          timing, and your terms acknowledgement.
        </p>
        <p>
          <strong className="font-medium text-pc-white">Technical data:</strong>{" "}
          referring URL and UTM parameters, timestamp, and IP address used for
          rate limiting and spam prevention.
        </p>
        <p>
          <strong className="font-medium text-pc-white">Booking data:</strong> if
          you book a call, which is handled by Cal.com.
        </p>
        <p>
          <strong className="font-medium text-pc-white">Correspondence:</strong>{" "}
          any correspondence you send by email.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Why I collect it">
        <p>
          To read and assess your application, to contact you if I think we are
          a fit, to schedule a call, to prevent spam and abuse, and to keep
          records of engagements.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Legal basis">
        <p>
          Legitimate interest in assessing and responding to business enquiries,
          and taking steps at your request before entering a contract. Where
          consent applies you can withdraw it at any time.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Who processes it">
        <p>Named subprocessors and what each holds:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-medium text-pc-white">Supabase</strong> for
            the primary lead database
          </li>
          <li>
            <strong className="font-medium text-pc-white">Google Sheets</strong>{" "}
            for a mirrored working copy
          </li>
          <li>
            <strong className="font-medium text-pc-white">Resend</strong> for
            transactional email delivery
          </li>
          <li>
            <strong className="font-medium text-pc-white">Cal.com</strong> for
            booking and calendar data
          </li>
          <li>
            <strong className="font-medium text-pc-white">Vercel</strong> for
            hosting and server logs
          </li>
        </ul>
        <p>Each has its own privacy policy.</p>
      </LegalSection>

      <LegalSection number="06" title="Retention">
        <p>
          Applications are kept for up to 24 months from submission so I can
          revisit brands that were not a fit at the time. Client engagement
          records are kept as long as tax and accounting law requires. You can
          ask for earlier deletion.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Client systems and databases">
        <p>
          For clients I may keep administrative access to systems built during an
          engagement, including after it ends, as described in section 8 of the{" "}
          <Link
            href="/terms"
            className="text-accent underline-offset-2 hover:underline"
          >
            Terms
          </Link>
          . Where those systems hold your customers&apos; personal data, the
          client remains the data controller and I act as a processor. Clients
          can request revocation of access or deletion of that data in writing
          at any time.
        </p>
      </LegalSection>

      <LegalSection number="08" title="Your rights">
        <p>
          Access a copy of your data, correct it, delete it, object to or
          restrict processing, withdraw consent, and request portability. Email{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent underline-offset-2 hover:underline"
          >
            {site.email}
          </a>{" "}
          and I will respond within 30 days. If you are in the UK or EU you can
          complain to your local data protection authority. If you are in
          California you have rights under the CCPA including the right to know
          and to delete, and I do not sell personal information.
        </p>
      </LegalSection>

      <LegalSection number="09" title="International transfers">
        <p>
          Data may be processed in the United States and elsewhere by the
          subprocessors named above, under their own safeguards.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Security">
        <p>
          Data moves over HTTPS, database access is restricted to service role
          credentials held server side, and row level security is enabled. No
          system is perfectly secure and I cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection number="11" title="Children">
        <p>
          The service is not directed at anyone under 18 and I do not knowingly
          collect their data.
        </p>
      </LegalSection>

      <LegalSection number="12" title="Changes and contact">
        <p>
          This policy may be updated. The last updated date at the top will
          change. Material changes will be reflected on this page. Questions:{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent underline-offset-2 hover:underline"
          >
            {site.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
