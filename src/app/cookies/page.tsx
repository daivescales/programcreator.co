import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${site.name} uses cookies and similar storage.`,
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" currentPath="/cookies">
      {/* TODO: Daive, update this page if you add PostHog, Google Analytics or a Meta pixel, since that changes what you must disclose */}

      <LegalSection number="01" title="What cookies are">
        <p>
          Cookies are small text files a site stores in your browser. Similar
          technologies include local storage and session storage. They help a
          site remember settings, keep a session going, or measure usage.
        </p>
      </LegalSection>

      <LegalSection number="02" title="What this site actually uses">
        <p>
          Strictly necessary items only. Session storage is used to save your
          progress through the application form so a refresh does not lose your
          answers. Hosting level cookies may be set by Vercel for security and
          delivery. There are currently no advertising or third party tracking
          cookies on this site.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Third party cookies">
        <p>
          Cal.com sets its own cookies when the booking embed loads on{" "}
          <a
            href="/book"
            className="text-accent underline-offset-2 hover:underline"
          >
            /book
          </a>
          . See{" "}
          <a
            href="https://cal.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-2 hover:underline"
          >
            Cal.com&apos;s privacy policy
          </a>{" "}
          for detail.
        </p>
      </LegalSection>

      <LegalSection number="04" title="How to control cookies">
        <p>
          You can clear or block cookies and site data in your browser settings.
          Blocking strictly necessary storage may stop the application form from
          remembering progress, and may affect the booking embed.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Changes and contact">
        <p>
          This policy may be updated. The last updated date at the top will
          change. Questions:{" "}
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
