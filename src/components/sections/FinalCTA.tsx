"use client";

import { MaskLines, MaskText, Reveal } from "@/components/motion";
import Glow from "@/components/system/Glow";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import { copy } from "@/lib/copy";

export default function FinalCTA() {
  return (
    <section className="relative flex items-center bg-navy-900 py-32">
      <Glow pulse className="opacity-70" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <p className="t-label">{copy.finalCta.eyebrow}</p>
          </Reveal>

          <MaskText
            as="h2"
            delay={0.08}
            underlineVariant={2}
            className="t-display mx-auto mt-5 max-w-[18ch]"
          >
            {copy.finalCta.heading}
          </MaskText>

          <MaskLines delay={0.2} className="t-body mx-auto mt-6 max-w-[48ch]">
            {copy.finalCta.body}
          </MaskLines>

          <Reveal delay={0.35}>
            <div className="mt-9 flex justify-center">
              <CTAButton
                href="/apply"
                size="lg"
                className="h-[3.25rem] px-9 text-[15px]"
              >
                {copy.finalCta.button}
              </CTAButton>
            </div>
            <p className="mt-5 text-[13px] text-pc-soft">
              {copy.finalCta.underButton}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
