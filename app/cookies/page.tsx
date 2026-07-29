// TEMPLATE ONLY — not legal advice. Have a qualified attorney review and adapt before publishing.

import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How ProgramCreator uses cookies and similar technologies, including consent preferences and third-party embeds.",
};

const toc = [
  { id: "what-cookies-are", label: "What cookies are" },
  { id: "types-we-use", label: "Types we use" },
  { id: "why-we-use", label: "Why we use them" },
  { id: "cookie-table", label: "Cookie categories" },
  { id: "control", label: "How to control cookies" },
  { id: "third-party", label: "Third-party cookies" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="[DATE]" toc={toc}>
      <h2 id="what-cookies-are">What cookies are</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website.
        Similar technologies include local storage, session storage, and pixels. They
        help sites remember preferences, keep features working, and — where permitted —
        understand how the site is used. This Cookie Policy explains how [BUSINESS LEGAL
        NAME] (&quot;ProgramCreator,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;) uses these technologies on programcreator.com.
      </p>

      <h2 id="types-we-use">Types we use</h2>
      <ul>
        <li>
          <strong className="text-mist-100">Strictly necessary.</strong> Required for
          core Site functions such as security, load balancing, and remembering your
          cookie consent choice.
        </li>
        <li>
          <strong className="text-mist-100">Functional.</strong> Support enhanced
          features, including saving an in-progress application draft in local storage
          so you can resume later.
        </li>
        <li>
          <strong className="text-mist-100">Analytics.</strong> Help us understand
          aggregate traffic and usage when enabled and consented to where required. We
          do not load non-essential analytics by default until you accept cookies.
        </li>
        <li>
          <strong className="text-mist-100">Third-party / embedded.</strong> Services
          such as Cal.com may set their own cookies when you interact with an embedded
          scheduling widget.
        </li>
      </ul>

      <h2 id="why-we-use">Why we use them</h2>
      <p>We use cookies and similar technologies to:</p>
      <ul>
        <li>Operate and secure the Site</li>
        <li>Remember your consent preferences</li>
        <li>Preserve application form progress locally on your device</li>
        <li>Enable booking and scheduling embeds</li>
        <li>
          Measure and improve Site performance when analytics are enabled with consent
        </li>
      </ul>

      <h2 id="cookie-table">Cookie categories</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Strictly necessary</td>
            <td>
              Cookie consent storage (<code>pc_cookie_consent</code>) and essential Site
              operation
            </td>
            <td>Up to 1 year (or until cleared)</td>
          </tr>
          <tr>
            <td>Functional</td>
            <td>
              Application draft saved in local storage so you can continue an unfinished
              application
            </td>
            <td>Until cleared or overwritten</td>
          </tr>
          <tr>
            <td>Analytics</td>
            <td>
              Aggregate usage measurement (only if enabled and accepted)
            </td>
            <td>Varies by provider (session to ~24 months)</td>
          </tr>
          <tr>
            <td>Third-party (Cal.com)</td>
            <td>
              Scheduling embed functionality, preferences, and fraud prevention when you
              use the booking widget
            </td>
            <td>Set by Cal.com; see their policy</td>
          </tr>
        </tbody>
      </table>

      <h2 id="control">How to control and disable cookies</h2>
      <p>
        You can manage non-essential cookies through our cookie banner when it appears.
        You may also clear or block cookies in your browser settings. Common paths:
      </p>
      <ul>
        <li>
          <strong className="text-mist-100">Chrome:</strong> Settings → Privacy and
          security → Cookies and other site data
        </li>
        <li>
          <strong className="text-mist-100">Safari:</strong> Settings → Privacy → Manage
          Website Data / Cookies
        </li>
        <li>
          <strong className="text-mist-100">Firefox:</strong> Settings → Privacy &amp;
          Security → Cookies and Site Data
        </li>
        <li>
          <strong className="text-mist-100">Edge:</strong> Settings → Cookies and site
          permissions
        </li>
      </ul>
      <p>
        Blocking all cookies may affect Site features, including remembering consent and
        restoring application drafts. Clearing local storage will remove saved draft
        answers on that device.
      </p>

      <h2 id="third-party">Third-party cookies</h2>
      <p>
        Third parties such as Cal.com, Vercel, and any analytics provider we enable may
        set cookies subject to their own policies. We do not control those cookies. Review
        each provider&apos;s documentation for details on what they collect and how to
        opt out where available.
      </p>

      <h2 id="changes">Changes</h2>
      <p>
        We may update this Cookie Policy periodically. The &quot;Last updated&quot; date
        at the top of this page will change when we do. Continued use of the Site after
        updates constitutes acceptance of the revised policy, except where additional
        consent is required by law.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about cookies or this policy:
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
