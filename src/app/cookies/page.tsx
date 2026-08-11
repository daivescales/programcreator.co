import type { Metadata } from "next";
import LegalLayout, {
  ContactEmail,
  LegalSection,
} from "@/components/legal/LegalLayout";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${site.name} uses cookies and browser storage.`,
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" currentPath="/cookies">
      <LegalSection number="01" title="What cookies are">
        <p>
          Cookies and similar storage are small pieces of data a site can keep
          in your browser so pages remember preferences, keep you signed in, or
          measure how the site is used.
        </p>
      </LegalSection>

      <LegalSection number="02" title="What this site actually uses">
        <p>
          Strictly necessary only: session storage that saves your progress
          through the application form so a refresh does not lose your answers,
          session storage that remembers you have already booked so the thank
          you screen persists on reload, and any hosting level cookies set by
          Vercel. There are currently no advertising or third party tracking
          cookies.
        </p>
        {/* TODO: Daive, update this page if you add PostHog, Google Analytics or a Meta pixel */}
      </LegalSection>

      <LegalSection number="03" title="Third party cookies">
        <p>
          Cal.com sets its own cookies when the booking embed loads. See{" "}
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
          You can clear site data or block cookies in your browser settings.
          Blocking session storage will stop the application draft and booking
          thank you screen from persisting across reloads. Blocking Cal.com
          cookies may break the booking embed.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Changes and contact">
        <p>
          This policy may be updated and the last updated date will change.
          Questions: <ContactEmail />.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
