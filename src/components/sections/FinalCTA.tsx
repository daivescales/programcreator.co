"use client";

import { MaskLines, MaskText, Parallax, Reveal } from "@/components/motion";
import Aurora from "@/components/system/Aurora";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";

export default function FinalCTA() {
  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-navy-900 py-28">
      <Aurora className="top-1/2 left-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 opacity-70" />

      <Parallax
        speed={0.15}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span
          aria-hidden
          className="select-none text-[clamp(8rem,26vw,22rem)] font-bold leading-none tracking-[-0.05em] text-transparent"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}
        >
          APPLY
        </span>
      </Parallax>

      <Container className="relative z-10">
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.2em] text-accent">
              Applications open
            </p>
          </Reveal>

          <MaskText
            as="h2"
            delay={0.08}
            className="mx-auto mt-6 max-w-[18ch] text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-pc-white"
          >
            {"You already have the attention. Let's build the thing it *points to*."}
          </MaskText>

          <MaskLines
            delay={0.2}
            className="mx-auto mt-6 max-w-[58ch] text-lg leading-[1.65] text-pc-text"
          >
            {"Apply below. If I can move the number, we'll be on a call this week. If I can't, I'll tell you that instead of selling you something."}
          </MaskLines>

          <Reveal delay={0.35}>
            <div className="mt-10 flex justify-center">
              <CTAButton
                href="/apply"
                size="lg"
                magneticStrength={12}
                className="h-16 px-12 text-[17px]"
              >
                Apply to work with me
              </CTAButton>
            </div>
            <p className="mt-5 text-[12px] text-pc-muted">
              Three minutes · Free 20-minute call · Limited spots each month
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
