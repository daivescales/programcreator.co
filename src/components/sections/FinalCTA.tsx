"use client";

import { MaskLines, MaskText, Reveal } from "@/components/motion";
import Glow from "@/components/system/Glow";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";

export default function FinalCTA() {
  return (
    <section className="relative flex items-center overflow-hidden bg-navy-900 py-40">
      <Glow className="opacity-70" />

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
            underlineVariant={1}
            className="mx-auto mt-6 max-w-[16ch] text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-pc-white"
          >
            {
              "You already have the attention. Let's build the thing it _points_ to."
            }
          </MaskText>

          <MaskLines
            delay={0.2}
            className="mx-auto mt-6 max-w-[50ch] text-[17px] leading-[1.65] text-pc-text"
          >
            {
              "Apply below. I read every one. If I think we are a fit, I will reach out and we will get on a call."
            }
          </MaskLines>

          <Reveal delay={0.35}>
            <div className="mt-10 flex justify-center">
              <CTAButton
                href="/apply"
                size="lg"
                className="h-14 rounded-control px-10 text-[16px]"
              >
                Apply to work with me
              </CTAButton>
            </div>
            <p className="mt-5 text-[13px] text-pc-muted">
              Three minutes. Free 20 minute call. Limited spots, first come
              first served.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
