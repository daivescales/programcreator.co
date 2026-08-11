"use client";

import {
  LiveMock,
  MaskLines,
  MaskText,
  PulseDot,
  Reveal,
  RotatingWord,
  SignalLines,
} from "@/components/motion";
import Glow from "@/components/system/Glow";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";

const rotatingWords = [
  "product",
  "program",
  "storefront",
  "offer",
  "funnel",
] as const;

const specs = [
  { label: "Lane A", value: "Revenue split, no upfront" },
  { label: "Lane B", value: "Monthly retainer" },
  { label: "Build time", value: "2–4 weeks" },
  { label: "Status", value: "4 spots open" },
] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-navy-800 pt-32 pb-0">
      <Glow className="inset-auto -top-[20%] -right-[10%] h-[70vmin] w-[70vmin] opacity-70" />

      <Container className="relative w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="flex items-center gap-3">
                <PulseDot />
                <p className="text-[11px] uppercase tracking-[0.2em] text-pc-muted">
                  Taking 4 brands · Q3 2026
                </p>
              </div>
            </Reveal>

            <h1 className="mt-7 max-w-[13ch] text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-pc-white">
              <MaskText as="span" className="block" delay={0.05}>
                I build the
              </MaskText>
              <span className="mt-1 block">
                <RotatingWord
                  words={[...rotatingWords]}
                  className="font-serif-italic text-accent-2"
                />
              </span>
              <MaskText as="span" className="mt-1 block" delay={0.2}>
                your audience is already asking for.
              </MaskText>
            </h1>

            <MaskLines
              delay={0.45}
              className="mt-7 max-w-[46ch] text-[17px] leading-[1.6] text-pc-text"
            >
              {
                "I'm Daive. I build digital products for creators and rebuild storefronts for physical brands, then scale them through the audience you already have."
              }
            </MaskLines>

            <Reveal delay={0.6}>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <CTAButton
                  href="/apply"
                  size="lg"
                  className="w-full rounded-none sm:w-auto"
                >
                  Apply to work with me
                </CTAButton>
                <CTAButton
                  href="#process"
                  variant="ghost"
                  size="lg"
                  className="w-full rounded-none sm:w-auto"
                >
                  How it works
                </CTAButton>
              </div>
              <p className="mt-5 text-[12px] text-pc-muted">
                Free 20-minute call · No deck · A straight answer either way
              </p>
            </Reveal>
          </div>

          <div className="relative mx-auto w-full max-w-[480px] lg:col-span-6 lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <SignalLines className="absolute inset-0" />
              <div className="absolute inset-[8%] sm:inset-[10%]">
                <LiveMock className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="mt-16 border-t border-pc-line md:mt-20">
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
