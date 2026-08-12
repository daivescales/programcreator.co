"use client";

import { MaskLines, Reveal } from "@/components/motion";
import Glow from "@/components/system/Glow";
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
    <section className="relative flex min-h-[86svh] flex-col justify-center bg-navy-800 pt-28 pb-20">
      <Glow className="inset-auto -top-[20%] -right-[10%] h-[70vmin] w-[70vmin] opacity-40" />

      <Container className="relative w-full">
        <Reveal delay={0.15}>
          <p className="t-small text-pc-muted">
            Applications open. Limited spots, first come first served.
          </p>
        </Reveal>

        <Heading
          as="display"
          text="I build the product your audience is already _asking_ for."
          underlineVariant={1}
          className="mt-7 max-w-[17ch]"
          delay={0.05}
        />

        <MaskLines delay={0.35} className="t-body mt-8 max-w-[52ch]">
          {
            "I'm Daive. I build digital products for creators, and I rebuild storefronts for physical brands. Then we scale them through the audience you already have. Creators pay nothing upfront because I take a revenue split. Product brands run on a flat monthly retainer."
          }
        </MaskLines>

        <Reveal delay={0.5}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CTAButton href="/apply" size="lg" className="w-full sm:w-auto">
              Apply to work with me
            </CTAButton>
            <CTAButton
              href="#process"
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto"
            >
              How it works
            </CTAButton>
          </div>
          <p className="mt-5 text-[13px] text-pc-muted">
            Takes about three minutes. Free 20 minute call.
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <ul className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {facts.map((fact) => (
              <li key={fact.label}>
                <p className="t-label">{fact.label}</p>
                <p className="mt-2 text-[15px] text-pc-white">{fact.value}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
