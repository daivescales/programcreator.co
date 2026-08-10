import Link from "next/link";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const laneAChecks = [
  "Digital product built from scratch",
  "Sales page + checkout flow",
  "Brand-matched store page rebuild",
  "Content angles to drive traffic",
  "Ongoing conversion iteration",
] as const;

const laneBChecks = [
  "Full storefront rebuild",
  "Product page + PDP optimisation",
  "Checkout and cart recovery",
  "Social-to-site funnel mapping",
  "Monthly iteration on live data",
] as const;

function Checklist({
  items,
  variant,
}: {
  items: readonly string[];
  variant: "blue" | "muted";
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] text-pc-body">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              variant === "blue" ? "bg-pc-blue-100 text-pc-blue" : "bg-pc-surface2 text-pc-muted"
            }`}
          >
            <Check size={12} strokeWidth={2.5} aria-hidden />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Lanes() {
  return (
    <Section id="lanes">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Who it's for"
            title="Two lanes. Same discipline."
            subtitle="The work is identical: turn attention into something people buy. The only thing that changes is how I get paid."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-full rounded-2xl border-2 border-pc-blue bg-pc-blue-50/40 p-8 md:p-10">
              <span className="absolute top-5 right-5 rounded-full bg-pc-blue px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
                Most popular
              </span>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-pc-blue">
                Lane A
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-pc-ink">
                Creators &amp; digital brands
              </h3>
              <p className="mt-3 text-base leading-relaxed text-pc-body">
                You have an audience. You don&apos;t have a product — or the one
                you have doesn&apos;t convert.
              </p>

              <div className="my-6 border-t border-pc-line" />

              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-pc-muted">
                How I&apos;m paid
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-pc-ink">
                Revenue split
              </p>
              <p className="mt-2 text-sm leading-relaxed text-pc-body">
                No upfront cost. No retainer. I take an agreed percentage of what
                the product earns. If it doesn&apos;t sell, I don&apos;t get paid
                — which is exactly why I only take brands I believe in.
              </p>

              <div className="my-6 border-t border-pc-line" />

              <Checklist items={laneAChecks} variant="blue" />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="h-full rounded-2xl border border-pc-line bg-pc-white p-8 md:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-pc-muted">
                Lane B
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-pc-ink">
                Physical product brands
              </h3>
              <p className="mt-3 text-base leading-relaxed text-pc-body">
                You have inventory and traffic. The site is where the sale is
                dying.
              </p>

              <div className="my-6 border-t border-pc-line" />

              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-pc-muted">
                How I&apos;m paid
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-pc-ink">
                Monthly retainer
              </p>
              <p className="mt-2 text-sm leading-relaxed text-pc-body">
                A flat monthly fee. Physical brands have real costs and real
                margins, so a revenue split doesn&apos;t make sense — a retainer
                keeps the work continuous and the incentives clean.
              </p>

              <div className="my-6 border-t border-pc-line" />

              <Checklist items={laneBChecks} variant="muted" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-[15px] text-pc-muted">
            Not sure which lane you&apos;re in? That&apos;s what the call is for.{" "}
            <Link
              href="/apply"
              className="text-pc-blue underline-offset-4 hover:underline"
            >
              Apply to work with me
            </Link>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
