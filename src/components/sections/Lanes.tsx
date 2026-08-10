"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { MaskLines, Reveal } from "@/components/motion";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionNumber from "@/components/ui/SectionNumber";
import { cn } from "@/lib/utils";

const laneAItems = [
  "Digital product built from scratch",
  "Sales page and checkout flow",
  "Brand-matched store page rebuild",
  "Content angles that drive traffic",
  "Ongoing conversion iteration",
] as const;

const laneBItems = [
  "Full storefront rebuild",
  "Product page optimisation",
  "Checkout and cart recovery",
  "Social-to-site funnel mapping",
  "Monthly iteration on live data",
] as const;

function Checklist({
  items,
  accent = false,
}: {
  items: readonly string[];
  accent?: boolean;
}) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item, index) => (
        <Reveal key={item} delay={0.05 * index}>
          <li className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border",
                accent
                  ? "border-accent text-accent"
                  : "border-pc-muted/50 text-pc-muted"
              )}
            >
              <Check size={12} strokeWidth={2.5} aria-hidden />
            </span>
            <span className="text-[15px] leading-snug text-pc-text">{item}</span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

export default function Lanes() {
  return (
    <Section id="lanes" bordered className="scroll-mt-section">
      <Container>
        <SectionNumber number="02" label="Who It's For" />

        <Heading
          as="h2"
          text="Two lanes. *Same discipline*."
          className="mt-8 max-w-[16ch]"
        />

        <MaskLines
          delay={0.12}
          className="mt-6 max-w-[58ch] text-lg leading-[1.65] text-pc-text"
        >
          {"The work is identical — turn attention into something people buy. The only thing that changes is how I get paid."}
        </MaskLines>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Lane A */}
          <Reveal>
            <article className="relative overflow-hidden border border-accent/45 bg-navy-700 p-8 md:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-pc-glow blur-3xl"
              />

              <div className="relative flex items-center justify-between gap-4">
                <p className="text-[12px] uppercase tracking-[0.18em] text-accent">
                  Lane A
                </p>
                <span className="border border-accent/30 bg-accent/12 px-2.5 py-1 text-[11px] uppercase tracking-wider text-accent">
                  No upfront cost
                </span>
              </div>

              <h3 className="relative mt-6 text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold tracking-[-0.03em] text-pc-white">
                Creators &amp; digital brands
              </h3>
              <p className="relative mt-3 max-w-[42ch] text-[17px] leading-[1.65] text-pc-text">
                You have an audience. You don&apos;t have a product — or the one
                you have doesn&apos;t convert.
              </p>

              <div className="relative mt-8 border-t border-pc-line pt-8">
                <p className="text-[11px] uppercase tracking-[0.18em] text-pc-muted">
                  How I&apos;m paid
                </p>
                <p className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-white">
                  Revenue{" "}
                  <span className="font-serif-italic text-accent-2">split</span>
                </p>
                <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.65] text-pc-text">
                  No retainer. No deposit. I take an agreed percentage of what
                  the product earns. If it doesn&apos;t sell, I don&apos;t get
                  paid — which is exactly why I&apos;m selective about who I
                  take.
                </p>
              </div>

              <div className="relative mt-8 border-t border-pc-line pt-2">
                <Checklist items={laneAItems} accent />
              </div>
            </article>
          </Reveal>

          {/* Lane B */}
          <Reveal delay={0.1}>
            <article className="relative border border-pc-line bg-navy-800 p-8 md:p-12">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[12px] uppercase tracking-[0.18em] text-pc-muted">
                  Lane B
                </p>
                <span className="border border-pc-line bg-navy-700 px-2.5 py-1 text-[11px] uppercase tracking-wider text-pc-muted">
                  Flat monthly
                </span>
              </div>

              <h3 className="mt-6 text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold tracking-[-0.03em] text-pc-white">
                Physical product brands
              </h3>
              <p className="mt-3 max-w-[42ch] text-[17px] leading-[1.65] text-pc-text">
                You have inventory and you have traffic. The site is where the
                sale is dying.
              </p>

              <div className="mt-8 border-t border-pc-line pt-8">
                <p className="text-[11px] uppercase tracking-[0.18em] text-pc-muted">
                  How I&apos;m paid
                </p>
                <p className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-white">
                  Monthly{" "}
                  <span className="font-serif-italic text-pc-white">
                    retainer
                  </span>
                </p>
                <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.65] text-pc-text">
                  A flat monthly fee. Physical brands carry real costs and real
                  margins, so a revenue split doesn&apos;t make sense — a
                  retainer keeps the work continuous and the incentives clean.
                </p>
              </div>

              <div className="mt-8 border-t border-pc-line pt-2">
                <Checklist items={laneBItems} />
              </div>
            </article>
          </Reveal>
        </div>

        <p className="mt-10 text-center text-[15px] text-pc-muted">
          Not sure which lane you&apos;re in? That&apos;s what the call is for.{" "}
          <Link
            href="/apply"
            className="text-accent underline-offset-4 transition-all hover:underline"
          >
            Apply to work with me
          </Link>
        </p>
      </Container>
    </Section>
  );
}
