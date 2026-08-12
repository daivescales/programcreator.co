"use client";

import { MaskLines, Reveal } from "@/components/motion";
import Glow from "@/components/system/Glow";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import Heading from "@/components/ui/Heading";
import { copy } from "@/lib/copy";

export default function Hero() {
  return (
    <section className="relative flex min-h-[88svh] flex-col justify-center bg-navy-800 pt-28 pb-20">
      <Glow className="inset-auto -top-[20%] -right-[10%] h-[70vmin] w-[70vmin] opacity-50" />

      <Container className="relative w-full">
        <Reveal delay={0.1}>
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent animate-dot-pulse"
            />
            <p className="t-small text-pc-text">{copy.hero.eyebrow}</p>
          </div>
        </Reveal>

        <Heading
          as="display"
          text={copy.hero.heading}
          underlineVariant={1}
          className="mt-7 max-w-[17ch]"
          delay={0.05}
        />

        <MaskLines delay={0.35} className="t-body mt-8 max-w-[52ch]">
          {copy.hero.body}
        </MaskLines>

        <Reveal delay={0.5}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CTAButton href="/apply" size="lg" className="w-full sm:w-auto">
              {copy.hero.primaryCta}
            </CTAButton>
            <CTAButton
              href="/#process"
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto"
            >
              {copy.hero.secondaryCta}
            </CTAButton>
          </div>
          <p className="mt-5 text-[13px] text-pc-soft">{copy.hero.underButtons}</p>
        </Reveal>

        <Reveal delay={0.6}>
          <ul className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {copy.hero.facts.map((fact) => (
              <li key={fact.label}>
                <p className="t-label">{fact.label}</p>
                <p className="mt-2 text-[15px] text-pc-text">{fact.value}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
