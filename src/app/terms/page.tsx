import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for ${site.name}.`,
};

export default function TermsPage() {
  return (
    <div className="bg-navy-800 py-32">
      <Container>
        <article className="mx-auto max-w-[720px]">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
            Legal
          </p>
          <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.035em] text-pc-white">
            Terms
          </h1>
          <p className="mt-4 text-pc-text">
            Last updated: August 10, 2026. These terms cover use of this website
            and the application process.
          </p>

          <div className="mt-10 space-y-8 text-[17px] leading-[1.65] text-pc-text">
            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-white">
                The site
              </h2>
              <p>
                {site.name} is operated by {site.founder} ({site.handle}). The
                site describes services and collects applications. Submitting an
                application does not create a client relationship and does not
                guarantee a call, partnership, or outcome.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-white">
                Two payment models
              </h2>
              <p>
                Creator / digital work is typically a revenue split. Physical
                product brands typically work on a monthly retainer. Exact
                commercial terms — scope, split percentage, retainer amount,
                timeline, and ownership — are set per engagement in a separate
                written agreement. Nothing on this site overrides that
                agreement.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-white">
                Your application
              </h2>
              <p>
                You agree that the information you submit is accurate to the
                best of your knowledge. You grant us permission to store and
                process it as described in the{" "}
                <Link href="/privacy" className="text-accent hover:underline">
                  Privacy
                </Link>{" "}
                page so we can evaluate fit and follow up.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-white">
                No guarantees
              </h2>
              <p>
                Results depend on your audience, offer, execution, and market.
                Past outcomes (when shown) are examples, not promises. We do
                not guarantee revenue, follower growth, or conversion rates.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-white">
                Booking
              </h2>
              <p>
                Discovery calls are scheduled through Cal.com. Missing a booked
                call without notice may mean we decline to reschedule. Be on
                time and bring context.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-white">
                Contact
              </h2>
              <p>
                Questions:{" "}
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
