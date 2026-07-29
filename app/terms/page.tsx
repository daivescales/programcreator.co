// TEMPLATE ONLY — not legal advice. Have an attorney review before publishing.

import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of the ProgramCreator website, applications, and engagements — including payments and no-refund policy.",
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
        ProgramCreator provides agency-style product-build and audience-monetisation
        services for creators and businesses. This website itself sells nothing; it
        describes services and collects applications for potential engagements with
        [BUSINESS LEGAL NAME].
      </p>

      <h2>Eligibility</h2>
      <p>You must be at least 18 years old to use this site or submit an application.</p>

      <h2>Applications</h2>
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

      <h2>Client engagements</h2>
      <p>
        Client engagements are governed by a separate written agreement. If there is
        any conflict between that agreement and these Terms, the written client
        agreement controls for that engagement.
      </p>

      <h2>Payments and no refunds</h2>
      <p>
        All fees, deposits, and payments are non-refundable in full once paid,
        including where a project is cancelled, paused, or abandoned by the client,
        and including any unused portion of a retainer or milestone.
      </p>
      <p>
        Work, capacity, and third-party costs are committed from the moment an
        engagement begins. Scope, deliverables, timelines, and payment schedule are
        agreed in writing before any payment is taken. By making a payment, the
        client acknowledges this no-refund policy.
      </p>
      <p>
        Initiating a chargeback or payment dispute in contradiction of these Terms
        constitutes a breach of these Terms. Nothing in this clause is intended to
        limit any non-waivable statutory rights the client may have under applicable
        consumer law in [JURISDICTION].
      </p>

      <h2>Intellectual property</h2>
      <p>
        Site content is owned by us or our licensors. Client deliverables and
        ownership are defined in the separate written agreement for each engagement.
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

      <h2>Governing law and disputes</h2>
      <p>
        These Terms are governed by the laws of [JURISDICTION], without regard to
        conflict-of-law principles. Disputes shall be resolved in accordance with the
        laws and courts of [JURISDICTION], unless applicable law requires otherwise.
      </p>

      <h2>Changes to terms</h2>
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
