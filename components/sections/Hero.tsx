"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function Hero() {
  const [mainFailed, setMainFailed] = useState(false);
  const [secondaryFailed, setSecondaryFailed] = useState(false);

  return (
    <section className="grain relative flex min-h-screen items-center overflow-hidden bg-ink pt-24 pb-16">
      <div className="azure-glow pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Creator Product Scaling Agency</Eyebrow>
              <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white md:text-7xl lg:text-8xl">
                I don&apos;t teach you to build it. I build it with you.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-mist-300 md:text-lg">
                ProgramCreator partners with creators and brand owners to turn an
                audience into an actual business — a clothing line, a digital
                product, or a paid community. I personally lead the build, from
                positioning to launch, with you in the room the entire time.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/apply" size="lg">
                  Apply to Work With Me
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  See What I Build
                </Button>
              </div>
              <div className="mt-10 flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-white/8">
                {[
                  "Creator-only client list",
                  "Built end-to-end",
                  "You keep 100% ownership",
                ].map((stat) => (
                  <p
                    key={stat}
                    className="text-xs uppercase tracking-[0.15em] text-mist-500 sm:px-5 first:sm:pl-0"
                  >
                    {stat}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <Reveal delay={0.15}>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10 bg-navy-800">
                {!mainFailed ? (
                  <Image
                    src="/hero-main.png"
                    alt="Creator product build session"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    priority
                    onError={() => setMainFailed(true)}
                  />
                ) : null}
              </div>
              <div className="absolute -bottom-6 -left-4 w-2/5 -rotate-3 overflow-hidden rounded-xl border border-white/10 bg-navy-800 shadow-azure-soft sm:-left-8">
                <div className="relative aspect-square">
                  {!secondaryFailed ? (
                    <Image
                      src="/hero-secondary.png"
                      alt="Product detail"
                      fill
                      className="object-cover"
                      sizes="160px"
                      onError={() => setSecondaryFailed(true)}
                    />
                  ) : null}
                </div>
              </div>
              <div className="absolute -right-2 top-8 max-w-[11rem] rounded-xl border border-azure-500/50 bg-navy-900/90 px-4 py-3 backdrop-blur sm:-right-4">
                <p className="text-xs leading-snug text-mist-100">
                  Product built. Audience monetized.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 lg:mt-20">
          <div className="relative h-12 w-px bg-white/15">
            <span className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-azure-400 animate-scroll-dot" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-mist-500">
            Scroll
          </p>
        </div>
      </Container>
    </section>
  );
}
