"use client";

import { CountUp, Reveal } from "@/components/motion";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionNumber from "@/components/ui/SectionNumber";
import { cn } from "@/lib/utils";

// TODO: replace with real figures
export const resultStats = [
  { to: 0, prefix: "$", suffix: "", label: "Upfront for creators" },
  { to: 14, prefix: "", suffix: "d", label: "Avg. launch window" },
  { to: 4, prefix: "", suffix: "", label: "New brands per quarter" },
] as const;

// TODO: replace with real client results before launch
export const resultsData = [
  {
    stat: "+38%",
    label: "Checkout conversion",
    quote:
      "We rebuilt the sales page for a creator template pack. Same traffic, clearer offer, cleaner checkout. Conversion moved in the first two weeks.",
    name: "Maya Chen",
    handle: "Creator · digital products",
    initials: "MC",
  },
  {
    stat: "3 weeks",
    label: "Offer to first sale",
    quote:
      "Built a coaching program page from scratch — positioning, pricing, and funnel. First paid cohort filled from the audience they already had.",
    name: "Jordan Ellis",
    handle: "Coach · program launch",
    initials: "JE",
  },
  {
    stat: "+22%",
    label: "Store conversion",
    quote:
      "Clothing brand storefront rebuild: product pages, cart flow, and social-to-site paths. Same ads, stronger page. Revenue per visitor improved within a month.",
    name: "Alex Rivera",
    handle: "Apparel brand",
    initials: "AR",
  },
] as const;

export default function Results() {
  return (
    <Section id="work" bordered className="scroll-mt-section">
      <Container>
        <SectionNumber number="05" label="Results" />

        <Heading
          as="h2"
          text="What this looks like *in practice*."
          className="mt-8 max-w-[16ch]"
        />

        <div className="mt-14 grid grid-cols-1 border-y border-pc-line md:grid-cols-3">
          {resultStats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col items-start px-0 py-8 md:px-8 md:py-10",
                index > 0 && "border-t border-pc-line md:border-t-0 md:border-l"
              )}
            >
              <p className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.04em] text-pc-white">
                <CountUp
                  to={stat.to}
                  prefix={stat.prefix}
                  className="text-pc-white"
                />
                {stat.suffix ? (
                  <span className="text-accent">{stat.suffix}</span>
                ) : null}
              </p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-pc-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {resultsData.map((result, index) => (
            <Reveal key={result.name} delay={0.06 * index}>
              <article className="group flex h-full flex-col border border-pc-line bg-navy-700 p-8 transition-[border-color,transform] duration-[350ms] hover:-translate-y-1 hover:border-pc-line-2">
                <div>
                  <p className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-accent">
                    {result.stat}
                  </p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-pc-muted">
                    {result.label}
                  </p>
                </div>
                <div className="my-6 h-px w-full bg-pc-line" />
                <p className="flex-1 text-[17px] leading-[1.65] text-pc-text">
                  &ldquo;{result.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-[38px] w-[38px] items-center justify-center border border-pc-line bg-navy-600 text-[13px] font-medium text-accent">
                    {result.initials}
                  </span>
                  <div>
                    <p className="text-[14px] text-pc-white">{result.name}</p>
                    <p className="text-[13px] text-pc-muted">{result.handle}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-[12px] text-pc-muted">
          Results are from past client work. Outcomes depend on your audience,
          offer, and market.
        </p>
      </Container>
    </Section>
  );
}
