"use client";

import { MaskLines, MaskText, Reveal } from "@/components/motion";
import Glow from "@/components/system/Glow";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";

export default function FinalCTA() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-navy-900 py-28">
      <Glow className="opacity-80" />

      <span
        aria-hidden
        className="motion-idle pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span
          className="motion-idle select-none text-[clamp(7rem,24vw,20rem)] font-bold leading-none tracking-[-0.05em] text-transparent animate-apply-drift"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.04)" }}
        >
          APPLY
        </span>
      </span>

      <Container className="relative z-10">
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.22em] text-accent">
              Applications open
            </p>
          </Reveal>

          <MaskText
            as="h2"
            delay={0.08}
            className="mx-auto mt-6 max-w-[16ch] text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-pc-white"
          >
            {
              "You already have the attention. Let's build the thing it *points to*."
            }
          </MaskText>

          <MaskLines
            delay={0.2}
            className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-pc-text"
          >
            {
              "Apply below. I read every one. If I think we're a fit, I'll reach out and we'll get on a call."
            }
          </MaskLines>

          <Reveal delay={0.35}>
            <div className="mt-10 flex justify-center">
              <CTAButton
                href="/apply"
                size="lg"
                magneticStrength={10}
                className="h-16 rounded-none px-12 text-[16px]"
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
