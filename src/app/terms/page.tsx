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
    <main className="py-24 md:py-32">
      <Container>
        <article className="mx-auto max-w-[720px]">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-pc-blue">
            Legal
          </p>
          <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-pc-ink">
            Terms
          </h1>
          <p className="mt-4 text-pc-body">
            Last updated: August 10, 2026. These terms cover use of this website
            and the application process.
          </p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-pc-body">
            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-ink">
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
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-ink">
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
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-ink">
                Your application
              </h2>
              <p>
                You agree that the information you submit is accurate to the
                best of your knowledge. You grant us permission to store and
                process it as described in the{" "}
                <Link href="/privacy" className="text-pc-blue hover:underline">
                  Privacy
                </Link>{" "}
                page so we can evaluate fit and follow up.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-ink">
                No guarantees
              </h2>
              <p>
                Results depend on your audience, offer, execution, and market.
                Past outcomes (when shown) are examples, not promises. We do
                not guarantee revenue, follower growth, or conversion rates.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-ink">
                Booking
              </h2>
              <p>
                Discovery calls are scheduled through Cal.com. Missing a booked
                call without notice may mean we decline to reschedule. Be on
                time and bring context.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold tracking-tight text-pc-ink">
                Contact
              </h2>
              <p>
                Questions:{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-pc-blue hover:underline"
                >
                  {site.email}
                </a>
                .
              </p>
            </section>
          </div>

          <p className="mt-12">
            <Link href="/" className="text-sm text-pc-blue hover:underline">
              ← Back to home
            </Link>
          </p>
        </article>
      </Container>
    </main>
  );
}
