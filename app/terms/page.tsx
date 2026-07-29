// TEMPLATE ONLY — not legal advice. Have a qualified attorney review and adapt before publishing.

import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of the ProgramCreator website and how applications, bookings, and client engagements work.",
};

const toc = [
  { id: "acceptance", label: "Acceptance of terms" },
  { id: "description", label: "Description of services" },
  { id: "eligibility", label: "Eligibility" },
  { id: "applications", label: "Applications and no obligation" },
  { id: "bookings", label: "Bookings and calls" },
  { id: "client-engagements", label: "Client engagements" },
  { id: "intellectual-property", label: "Intellectual property" },
  { id: "user-conduct", label: "User conduct" },
  { id: "third-party", label: "Third-party links and services" },
  { id: "disclaimers", label: "Disclaimers of warranty" },
  { id: "limitation", label: "Limitation of liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "governing-law", label: "Governing law" },
  { id: "changes", label: "Changes to terms" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="[DATE]" toc={toc}>
      <h2 id="acceptance">Acceptance of terms</h2>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of
        the website operated by [BUSINESS LEGAL NAME] (&quot;ProgramCreator,&quot;
        &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) at programcreator.com (the
        &quot;Site&quot;). By accessing or using the Site, submitting an application,
        or booking a call, you agree to these Terms. If you do not agree, do not use
        the Site.
      </p>

      <h2 id="description">Description of services</h2>
      <p>
        ProgramCreator provides agency-style, done-with-you services for creators and
        brand owners, including product strategy and build partnership services related
        to clothing, information products, paid communities, and related ecosystems.
        The Site itself is informational and does not sell a finished product for
        immediate purchase. Any paid client engagement is formed only under a separate
        written agreement.
      </p>

      <h2 id="eligibility">Eligibility</h2>
      <p>
        You must be at least 18 years old and able to form a binding contract to use
        the Site and apply for our services. By using the Site, you represent that you
        meet these requirements.
      </p>

      <h2 id="applications">Applications and no obligation</h2>
      <p>
        Submitting an application through the Site does not create a client
        relationship, engagement, or obligation on either party. We may accept, decline,
        or ignore any application at our sole discretion, with or without explanation.
        Nothing on the Site guarantees availability, pricing, timelines, or acceptance
        into a build partnership.
      </p>

      <h2 id="bookings">Bookings and calls</h2>
      <p>
        If you book an intro call, you agree to provide accurate contact information and
        to appear at the scheduled time or cancel/reschedule with reasonable notice
        using the scheduling tool provided. Repeated no-shows or last-minute
        cancellations may result in loss of booking privileges. Intro calls are
        evaluative conversations and do not constitute professional advice or a
        commitment to engage.
      </p>

      <h2 id="client-engagements">Client engagements</h2>
      <p>
        If we mutually agree to work together, the relationship will be governed by a
        separate written agreement (proposal, statement of work, master services
        agreement, or similar). In the event of any conflict between these Terms and
        that written agreement, the written client agreement controls with respect to
        the engagement.
      </p>

      <h2 id="intellectual-property">Intellectual property</h2>
      <p>
        All content on the Site — including text, graphics, logos, design, and
        trademarks — is owned by us or our licensors and is protected by intellectual
        property laws. You may not copy, modify, distribute, or exploit Site content
        without our prior written consent, except for personal, non-commercial viewing.
      </p>
      <p>
        Ownership of deliverables created under a client engagement is defined in the
        separate written agreement for that engagement. Nothing on the Site transfers
        ownership of client work product outside of those contractual terms.
      </p>

      <h2 id="user-conduct">User conduct</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Site for any unlawful purpose</li>
        <li>Submit false, misleading, or fraudulent information</li>
        <li>
          Attempt to interfere with Site security, scrape content at scale without
          permission, or reverse engineer Site systems
        </li>
        <li>Harass, abuse, or harm us or other users</li>
        <li>Impersonate any person or entity</li>
      </ul>

      <h2 id="third-party">Third-party links and services</h2>
      <p>
        The Site may link to or embed third-party services (including scheduling and
        hosting tools). We are not responsible for third-party content, availability,
        or practices. Your use of third-party services is subject to their own terms
        and policies.
      </p>

      <h2 id="disclaimers">Disclaimers of warranty</h2>
      <p>
        THE SITE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
        AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO
        NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL
        COMPONENTS, OR THAT ANY INFORMATION ON THE SITE IS COMPLETE OR CURRENT.
      </p>

      <h2 id="limitation">Limitation of liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, [BUSINESS LEGAL NAME] AND ITS OWNERS,
        EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
        SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE,
        DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE OR THESE
        TERMS, WHETHER BASED IN CONTRACT, TORT, OR OTHERWISE. OUR TOTAL LIABILITY FOR
        CLAIMS ARISING FROM THE SITE SHALL NOT EXCEED ONE HUNDRED U.S. DOLLARS
        (US $100) OR THE AMOUNT YOU PAID US (IF ANY) FOR SITE ACCESS IN THE TWELVE
        MONTHS PRECEDING THE CLAIM, WHICHEVER IS GREATER. SOME JURISDICTIONS DO NOT
        ALLOW CERTAIN LIMITATIONS; IN THOSE CASES, OUR LIABILITY IS LIMITED TO THE
        FULLEST EXTENT PERMITTED.
      </p>

      <h2 id="indemnification">Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless [BUSINESS LEGAL NAME] and its
        owners, employees, and agents from and against any claims, damages, losses,
        liabilities, and expenses (including reasonable attorneys&apos; fees) arising
        from your use of the Site, your violation of these Terms, or your infringement
        of any third-party rights.
      </p>

      <h2 id="governing-law">Governing law and dispute resolution</h2>
      <p>
        These Terms are governed by the laws of [JURISDICTION], without regard to
        conflict-of-law principles. Any dispute arising out of or relating to these
        Terms or the Site shall be resolved exclusively in the courts located in
        [JURISDICTION], unless applicable law requires otherwise. You consent to
        personal jurisdiction in those courts.
      </p>

      <h2 id="changes">Changes to terms</h2>
      <p>
        We may update these Terms from time to time. The &quot;Last updated&quot; date
        reflects the latest version. Continued use of the Site after changes become
        effective constitutes acceptance of the revised Terms. If you do not agree,
        stop using the Site.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about these Terms may be sent to:
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
