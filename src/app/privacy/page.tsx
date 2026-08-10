import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} collects and uses application data.`,
};

export default function PrivacyPage() {
  return (
    <div className="bg-navy-800 py-32">
      <Container>
        <article className="mx-auto max-w-[720px]">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
            Legal
          </p>
          <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.035em] text-pc-white">
            Privacy
          </h1>
          <p className="mt-4 text-pc-text">
            Last updated: August 10, 2026. Plain language. No legalese maze.
          </p>

          <div className="mt-10 space-y-8 text-[17px] leading-[1.65] text-pc-text">
            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-white">
                What we collect
              </h2>
              <p>
                When you apply at{" "}
                <Link href="/apply" className="text-accent hover:underline">
                  /apply
                </Link>
                , we collect the answers you submit: name, email, brand name,
                lane (creator or physical), social handles, website, audience
                size, product status, revenue range, bottleneck, 90-day goal,
                timeline, payment acknowledgement, how you found us, and any
                UTM or referrer data from the URL.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-white">
                Where it lives
              </h2>
              <p>
                Application data is stored in Supabase (database) and mirrored
                to a private Google Sheet used for lead follow-up. We also send
                a notification email to {site.founder} and a confirmation email
                to you via Resend. Booking details for the discovery call are
                handled by Cal.com under their own privacy policy.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-white">
                How we use it
              </h2>
              <p>
                We use your application to decide whether we should work
                together, to prepare for the call, and to contact you about the
                engagement. We do not sell your data. We do not run ads against
                your application answers.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-white">
                Retention and deletion
              </h2>
              <p>
                We keep lead records while they are useful for the business
                relationship or follow-up. To request deletion, email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-accent hover:underline"
                >
                  {site.email}
                </a>{" "}
                from the address you applied with. We will remove your row from
                Supabase and the Sheet within a reasonable time, subject to any
                legal retention needs.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-white">
                Contact
              </h2>
              <p>
                Questions about this policy:{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-accent hover:underline"
                >
                  {site.email}
                </a>
                .
              </p>
            </section>
          </div>

          <p className="mt-12">
            <Link href="/" className="text-sm text-accent hover:underline">
              ← Back to home
            </Link>
          </p>
        </article>
      </Container>
    </div>
  );
}
