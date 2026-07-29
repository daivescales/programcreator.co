// TEMPLATE ONLY — not legal advice. Have an attorney review before publishing.

import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of the ProgramCreator website and application process.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="[DATE]">
      <h2>Acceptance of terms</h2>
      <p>
        By accessing programcreator.com, you agree to these Terms of Service. If
        you do not agree, do not use the site.
      </p>

      <h2>Description of services</h2>
      <p>
        ProgramCreator provides agency-style product-build services for creators
        and brands. This website itself does not sell a product; it describes
        services and collects applications for potential engagements with
        [BUSINESS LEGAL NAME].
      </p>

      <h2>Eligibility</h2>
      <p>You must be at least 18 years old to use this site or submit an application.</p>

      <h2>Applications and no obligation</h2>
      <p>
        Submitting an application does not create a client relationship. We may
        decline any application for any reason. No work begins until a separate
        written agreement is signed.
      </p>

      <h2>Bookings and calls</h2>
      <p>
        If you book a call, please arrive on time or cancel with reasonable notice.
        Repeated no-shows may affect future booking availability.
      </p>

      <h2>Separate client agreements</h2>
      <p>
        Client engagements are governed by a separate written agreement. If there is
        any conflict between that agreement and these Terms, the written client
        agreement controls for that engagement.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Site content is owned by us or our licensors. Client-owned deliverables are
        defined in the separate written agreement for each engagement.
      </p>

      <h2>User conduct</h2>
      <p>
        You agree not to misuse the site, submit false information, attempt to
        disrupt our systems, or use the site for unlawful purposes.
      </p>

      <h2>Disclaimers of warranty</h2>
      <p>
        The site is provided &quot;as is&quot; without warranties of any kind, express or
        implied, to the fullest extent permitted by law.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, [BUSINESS LEGAL NAME] and its owners
        are not liable for indirect, incidental, special, consequential, or punitive
        damages arising from your use of the site.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless [BUSINESS LEGAL NAME] from claims
        arising out of your misuse of the site or violation of these Terms.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of [JURISDICTION], without regard to
        conflict-of-law principles.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use of the site after
        changes constitutes acceptance of the revised Terms.
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
