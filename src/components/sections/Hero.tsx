"use client";

import { MaskLines, Reveal } from "@/components/motion";
import Glow from "@/components/system/Glow";
import Annotation from "@/components/ui/Annotation";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import Heading from "@/components/ui/Heading";

const facts = [
  { label: "Lane A", value: "Revenue split, nothing upfront" },
  { label: "Lane B", value: "Flat monthly retainer" },
  { label: "Build time", value: "2 to 4 weeks" },
] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden bg-navy-800 pt-32 pb-24">
      <Glow className="inset-auto -top-[20%] -right-[10%] h-[70vmin] w-[70vmin] opacity-40" />

      <Container className="relative w-full">
        <Reveal delay={0.15}>
          <p className="text-[13px] text-pc-muted">
            Applications open. Limited spots, first come first served.
          </p>
        </Reveal>

        <Heading
          as="display"
          text="I build the product your audience is already _asking_ for."
          underlineVariant={1}
          className="mt-7 max-w-[15ch]"
          delay={0.05}
        />

        <MaskLines
          delay={0.35}
          className="mt-8 max-w-[52ch] text-[18px] leading-[1.65] text-pc-text"
        >
          {
            "I'm Daive. I build digital products for creators, and I rebuild storefronts for physical brands. Then I scale them through the audience you already have. Creators pay nothing upfront because I take a revenue split. Product brands run on a flat monthly retainer."
          }
        </MaskLines>

        <Reveal delay={0.5}>
          <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <CTAButton
                href="/apply"
                size="lg"
                className="w-full rounded-control sm:w-auto"
              >
                Apply to work with me
              </CTAButton>
              <CTAButton
                href="#process"
                variant="ghost"
                size="lg"
                className="w-full rounded-control sm:w-auto"
              >
                How it works
              </CTAButton>

              <div className="pointer-events-none absolute top-1/2 left-full ml-4 hidden -translate-y-1/2 lg:block">
                <Annotation arrow="rtl" arrowPosition="before">
                  takes 3 minutes
                </Annotation>
              </div>
            </div>
          </div>
          <p className="hand mt-4 text-[16px] lg:hidden">takes 3 minutes</p>
        </Reveal>

        <Reveal delay={0.6}>
          <ul className="mt-20 flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-10 sm:gap-y-6">
            {facts.map((fact, index) => (
              <li key={fact.label} className="flex items-start gap-10">
                {index > 0 && (
                  <span
                    aria-hidden
                    className="mt-5 hidden text-pc-muted sm:inline"
                  >
                    ·
                  </span>
                )}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-pc-muted">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-[15px] text-pc-white">{fact.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
