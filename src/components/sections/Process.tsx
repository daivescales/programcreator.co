"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaskLines, MaskText } from "@/components/motion";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionNumber from "@/components/ui/SectionNumber";
import { EASE_IN, usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export const processSteps = [
  {
    id: "apply",
    number: "01",
    label: "Apply",
    title: "You apply",
    body: "Fill in the application. Three minutes. It asks the things I actually need: what you sell, who follows you, and what's currently broken.",
  },
  {
    id: "call",
    number: "02",
    label: "Call",
    title: "We get on a call",
    body: "Twenty minutes. No deck, no pressure. I tell you straight whether I can move the number and what I'd do first. If it isn't a fit, I say so on the call.",
  },
  {
    id: "build",
    number: "03",
    label: "Build",
    title: "I build",
    body: "Product, page, funnel — depending on your lane. You review at two checkpoints. I handle the rest, so you keep making content.",
  },
  {
    id: "scale",
    number: "04",
    label: "Scale",
    title: "We scale it",
    body: "It goes live and we drive your audience into it. Then we keep tightening the offer and the page against what the data actually says.",
  },
] as const;

function DesktopProcess() {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const setup = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;
      const pin = pinRef.current;
      if (!container || !pin) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: () => `+=${3 * window.innerHeight}`,
          pin,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setProgress(self.progress);
            const idx = Math.min(
              processSteps.length - 1,
              Math.floor(self.progress * processSteps.length)
            );
            setActiveIndex(idx);
          },
        });
      }, container);

      if (cancelled) {
        ctx.revert();
        ctx = undefined;
        return;
      }

      ScrollTrigger.refresh();
    };

    void setup();

    return () => {
      cancelled = true;
      ctx?.revert();
      ctx = undefined;
    };
  }, [reduced]);

  const active = processSteps[activeIndex];

  return (
    <div ref={containerRef} className="relative mt-16">
      <div ref={pinRef} className="relative min-h-[100svh] py-16">
        <div className="grid grid-cols-12 gap-10">
          <div className="sticky top-32 col-span-5 self-start">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.number}
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  exit={reduced ? undefined : { y: "-110%" }}
                  transition={{ duration: 0.5, ease: EASE_IN }}
                  className="text-[clamp(6rem,14vw,13rem)] font-bold leading-none tracking-[-0.06em] text-accent"
                >
                  {active.number}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-8 h-32 w-px overflow-hidden bg-pc-line">
              <div
                className="w-full origin-top bg-accent transition-[height] duration-150"
                style={{ height: `${Math.max(8, progress * 100)}%` }}
              />
            </div>

            <ul className="mt-8 space-y-2">
              {processSteps.map((step, index) => (
                <li
                  key={step.id}
                  className={cn(
                    "text-[12px] uppercase tracking-[0.18em] transition-colors duration-300",
                    index === activeIndex
                      ? "text-pc-white"
                      : "text-pc-muted/40"
                  )}
                >
                  {step.number} · {step.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-7 space-y-24 py-8">
            {processSteps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <article
                  key={step.id}
                  className={cn(
                    "border-b border-pc-line pb-12 transition-[opacity,filter] duration-[400ms]",
                    isActive
                      ? "opacity-100 blur-0"
                      : "opacity-[0.22] blur-[1px]"
                  )}
                >
                  <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.65] text-pc-text">
                    {step.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <Section id="process" bordered className="scroll-mt-section">
      <Container>
        <SectionNumber number="03" label="The Process" />

        <Heading
          as="h2"
          text="From first message to *first sale*."
          className="mt-8 max-w-[16ch]"
        />

        <MaskLines
          delay={0.12}
          className="mt-6 max-w-[58ch] text-lg leading-[1.65] text-pc-text"
        >
          Four steps. Two to four weeks depending on the lane.
        </MaskLines>

        <div className="hidden lg:block">
          <DesktopProcess />
        </div>

        <ol className="relative mt-16 space-y-0 lg:hidden">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[15px] w-px bg-pc-line"
          />
          {processSteps.map((step) => (
            <li key={step.id} className="relative flex gap-6 pb-12 last:pb-0">
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center border border-pc-line bg-navy-800 text-[12px] font-medium text-accent">
                {step.number}
              </span>
              <div className="pt-0.5">
                <MaskText
                  as="h3"
                  className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-white"
                >
                  {step.title}
                </MaskText>
                <p className="mt-3 max-w-[46ch] text-[17px] leading-[1.65] text-pc-text">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
