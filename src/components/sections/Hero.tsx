"use client";

import { MaskLines, Reveal, RuleDraw } from "@/components/motion";
import Glow from "@/components/system/Glow";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import Heading from "@/components/ui/Heading";

const specs = [
  { label: "Lane A", value: "Revenue split, nothing upfront" },
  { label: "Lane B", value: "Flat monthly retainer" },
  { label: "Build time", value: "2 to 4 weeks" },
  { label: "Availability", value: "Limited, first come first served" },
] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-navy-800 pt-32">
      <Glow className="inset-auto -top-[20%] -right-[10%] h-[70vmin] w-[70vmin] opacity-50" />

      <Container className="relative w-full">
        <Reveal delay={0.15}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-pc-muted">
            Applications open. Limited spots, first come first served.
          </p>
        </Reveal>

        <Heading
          as="display"
          text="I build the product your audience is already _asking_ for."
          underlineVariant={1}
          className="mt-7 max-w-[15ch] lg:col-span-10"
          delay={0.05}
        />

        <RuleDraw className="mt-14 h-px w-full origin-left bg-pc-line" />

        <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <MaskLines
              delay={0.35}
              className="max-w-[46ch] text-[17px] leading-[1.6] text-pc-text"
            >
              {
                "I'm Daive. I build digital products for creators, and I rebuild storefronts for physical brands. Then we scale them through the audience you already have. Creators pay nothing upfront because I take a revenue split. Product brands run on a flat monthly retainer."
              }
            </MaskLines>
          </div>

          <Reveal delay={0.5} className="md:col-span-5 md:col-start-8">
            <div className="flex flex-col items-stretch gap-3">
              <CTAButton href="/apply" size="lg" className="w-full rounded-none">
                Apply to work with me
              </CTAButton>
              <CTAButton
                href="#process"
                variant="ghost"
                size="lg"
                className="w-full rounded-none"
              >
                How it works
              </CTAButton>
              <p className="mt-2 text-[12px] text-pc-muted">
                Free 20 minute call. No deck. A straight answer either way.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>

      <div className="mt-auto border-t border-pc-line">
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-2 md:grid-cols-4 md:px-10">
          {specs.map((spec, index) => (
            <div
              key={spec.label}
              className={[
                "px-6 py-7",
                index % 2 === 1 ? "border-l border-pc-line" : "",
                index >= 2 ? "border-t border-pc-line md:border-t-0" : "",
                index > 0 ? "md:border-l md:border-pc-line" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-pc-muted">
                {spec.label}
              </p>
              <p className="mt-2 text-[15px] text-pc-white">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
