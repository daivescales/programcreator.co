// TEMPLATE ONLY — not legal advice. Have a qualified attorney review and adapt before publishing.

import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "ProgramCreator's commitment to accessibility and aiming for WCAG 2.1 Level AA conformance.",
};

const toc = [
  { id: "commitment", label: "Our commitment" },
  { id: "conformance", label: "Conformance status" },
  { id: "measures", label: "Measures taken" },
  { id: "limitations", label: "Known limitations" },
  { id: "feedback", label: "Feedback and reporting" },
  { id: "contact", label: "Contact" },
];

export default function AccessibilityPage() {
  return (
    <LegalLayout title="Accessibility Statement" lastUpdated="[DATE]" toc={toc}>
      <h2 id="commitment">Our commitment</h2>
      <p>
        [BUSINESS LEGAL NAME] (&quot;ProgramCreator&quot;) is committed to making
        programcreator.com reasonably accessible to as many people as possible,
        including people who use assistive technologies. We view accessibility as an
        ongoing effort, not a one-time checklist.
      </p>

      <h2 id="conformance">Conformance status</h2>
      <p>
        We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at
        Level AA. This is an aspirational target. We continually work to identify and
        remediate barriers, but we do not claim full conformance at this time. Some
        content or third-party embeds may not yet meet every success criterion.
      </p>

      <h2 id="measures">Measures taken</h2>
      <p>Measures we take to support accessibility include:</p>
      <ul>
        <li>
          <strong className="text-mist-100">Semantic HTML</strong> — meaningful heading
          structure, landmarks, and native interactive elements where practical
        </li>
        <li>
          <strong className="text-mist-100">Keyboard navigation</strong> — primary flows
          designed to be operable without a mouse
        </li>
        <li>
          <strong className="text-mist-100">Focus states</strong> — visible focus
          indicators using our azure accent for keyboard users
        </li>
        <li>
          <strong className="text-mist-100">Colour contrast</strong> — text and
          interactive elements chosen to meet WCAG AA contrast ratios against dark
          backgrounds where feasible
        </li>
        <li>
          <strong className="text-mist-100">Reduced-motion support</strong> — respect for{" "}
          <code>prefers-reduced-motion</code> to limit non-essential animation
        </li>
        <li>
          <strong className="text-mist-100">Skip link</strong> — a skip-to-content
          control for keyboard users
        </li>
      </ul>

      <h2 id="limitations">Known limitations</h2>
      <p>
        Despite our efforts, some barriers may remain. Known or potential limitations
        include:
      </p>
      <ul>
        <li>
          Third-party embeds (such as Cal.com scheduling) that we do not fully control
        </li>
        <li>
          User-generated or externally hosted media that may lack complete captions or
          descriptions
        </li>
        <li>
          Older browsers or assistive technology combinations we have not fully tested
        </li>
      </ul>
      <p>
        We welcome reports of any barrier you encounter so we can prioritize fixes.
      </p>

      <h2 id="feedback">Feedback and how to report an accessibility issue</h2>
      <p>
        If you experience difficulty accessing any part of the Site, please tell us:
      </p>
      <ul>
        <li>The page URL</li>
        <li>A description of the problem</li>
        <li>Your browser, device, and assistive technology (if any)</li>
      </ul>
      <p>
        Email [CONTACT EMAIL] with the subject line &quot;Accessibility feedback.&quot;
        We will review reports and respond within a reasonable timeframe, typically
        within five business days.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Accessibility contact:
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
