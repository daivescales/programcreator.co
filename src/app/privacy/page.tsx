import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects and uses application data.`,
};

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-pc-line pt-10">
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-pc-white">
        <span className="mr-3 text-accent">{number}</span>
        {title}
      </h2>
      <div className="space-y-4 text-[17px] leading-[1.65] text-pc-text">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="bg-navy-800 py-32">
      <Container>
        <article className="mx-auto max-w-[760px]">
          <Link
            href="/"
            className="mb-10 inline-block text-sm text-pc-muted transition-colors hover:text-pc-white"
          >
            ← Back to home
          </Link>

          <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.035em] text-pc-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-pc-muted">Last updated: August 10, 2026</p>

          <div className="mt-14 space-y-10">
            <Section number="01" title="Summary">
              <p>
                I collect what you put in the application form, plus basic
                analytics. I use it to decide whether we&apos;re a fit and to get
                in touch. I don&apos;t sell it.
              </p>
            </Section>

            <Section number="02" title="What I collect">
              <p>
                <strong className="font-medium text-pc-white">
                  Application data:
                </strong>{" "}
                name, email, brand name, lane, social handles and website,
                audience size, whether you currently sell something, what&apos;s
                currently broken, timing, and your terms acknowledgement.
              </p>
              <p>
                <strong className="font-medium text-pc-white">
                  Technical data:
                </strong>{" "}
                referring URL and UTM parameters, approximate timestamp, IP
                address for rate limiting and spam prevention.
              </p>
              <p>
                <strong className="font-medium text-pc-white">
                  Booking data:
                </strong>{" "}
                if you book a call, handled by Cal.com.
              </p>
              <p>
                <strong className="font-medium text-pc-white">
                  Correspondence:
                </strong>{" "}
                anything you send by email.
              </p>
            </Section>

            <Section number="03" title="Why I collect it">
              <p>
                To read and assess your application; to contact you if I think
                we&apos;re a fit; to schedule a call; to prevent spam and abuse;
                to keep records of engagements.
              </p>
            </Section>

            <Section number="04" title="Legal basis">
              <p>
                Legitimate interest in assessing and responding to business
                enquiries, and taking steps at your request prior to entering a
                contract. Where consent applies, you may withdraw it at any
                time.
              </p>
            </Section>

            <Section number="05" title="Where it's stored and who processes it">
              <p>Named subprocessors and what each holds:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="font-medium text-pc-white">Supabase</strong>{" "}
                  — primary lead database
                </li>
                <li>
                  <strong className="font-medium text-pc-white">
                    Google Sheets
                  </strong>{" "}
                  — a mirrored copy for working leads
                </li>
                <li>
                  <strong className="font-medium text-pc-white">Resend</strong> —
                  transactional email delivery
                </li>
                <li>
                  <strong className="font-medium text-pc-white">Cal.com</strong> —
                  booking and calendar data
                </li>
                <li>
                  <strong className="font-medium text-pc-white">Vercel</strong> —
                  hosting and server logs
                </li>
              </ul>
              <p>
                Each has its own privacy policy and terms.
              </p>
            </Section>

            <Section number="06" title="Retention">
              <p>
                Applications are kept for up to 24 months from submission so I
                can revisit brands that weren&apos;t a fit at the time. Client
                engagement records are kept for as long as legally required for
                tax and accounting purposes. You can request earlier deletion.
              </p>
            </Section>

            <Section number="07" title="Client systems and databases">
              <p>
                For clients, I may retain administrative access to systems built
                during an engagement, including after it ends, as described in
                section 8 of the{" "}
                <Link
                  href="/terms"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  Terms
                </Link>
                . Where those systems contain your customers&apos; personal
                data, the client remains the data controller and I act as a
                processor. Clients can request revocation of access or deletion
                of that data in writing at any time.
              </p>
            </Section>

            <Section number="08" title="Your rights">
              <p>
                Access a copy of your data; correct it; delete it; object to or
                restrict processing; withdraw consent; request portability.
                Email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {site.email}
                </a>{" "}
                and I will respond within 30 days. If you&apos;re in the UK/EU
                you can complain to your local data protection authority; if
                you&apos;re in California you have rights under the CCPA
                including the right to know and delete, and I do not sell
                personal information.
              </p>
            </Section>

            <Section number="09" title="Cookies and analytics">
              <p>
                This site does not currently set analytics or marketing cookies.
                Essential cookies required for hosting and security may be set
                by the platform. No third-party tracking pixels are installed.
              </p>
              {/* TODO: Daive — update this section if you add PostHog, GA, or a Meta pixel */}
            </Section>

            <Section number="10" title="Security">
              <p>
                Data is transmitted over HTTPS, database access is restricted to
                service-role credentials held server-side, and row-level
                security is enabled. No system is perfectly secure and I cannot
                guarantee absolute security.
              </p>
            </Section>

            <Section number="11" title="Children">
              <p>
                The service isn&apos;t directed at anyone under 18 and I
                don&apos;t knowingly collect their data.
              </p>
            </Section>

            <Section number="12" title="Changes and contact">
              <p>
                This policy may be updated. The &quot;last updated&quot; date at
                the top will change. Material changes will be reflected on this
                page. Questions:{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {site.email}
                </a>
                .
              </p>
            </Section>
          </div>

          <p className="mt-16 border-t border-pc-line pt-8 text-sm text-pc-muted">
            Also see the{" "}
            <Link
              href="/terms"
              className="text-accent underline-offset-2 hover:underline"
            >
              Terms of Service
            </Link>
            .
          </p>
        </article>
      </Container>
    </div>
  );
}
