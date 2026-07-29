"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Audit & Angle",
    body: "We go through your audience, your content, and what they already respond to, and identify the single product they're most likely to buy. No guessing, no generic playbook.",
  },
  {
    number: "02",
    title: "Build The Offer",
    body: "I design the actual product — the line, the curriculum, or the community structure — including positioning, pricing, and the exact reason your audience buys.",
  },
  {
    number: "03",
    title: "Build The Machine",
    body: "Storefront, checkout, fulfillment or delivery, email flows, and the launch assets. This is the part I do, hands-on, so you don't have to learn any of it.",
  },
  {
    number: "04",
    title: "Launch & Scale",
    body: "We launch to your audience together with a content plan built around the drop, then optimize what converts and expand from there.",
  },
];

function StepBlock({
  step,
  index,
  onActive,
}: {
  step: (typeof steps)[0];
  index: number;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px", amount: 0.4 });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="border-t border-white/8 py-12 md:py-16">
      <div className="mb-3 flex items-center gap-3 md:hidden">
        <span className="font-display text-4xl font-bold text-white/20">
          {step.number}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-azure-400" aria-hidden />
      </div>
      <div className="mb-4 hidden items-center gap-3 md:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-azure-400" aria-hidden />
        <span className="text-xs uppercase tracking-[0.2em] text-mist-500">
          Step {step.number}
        </span>
      </div>
      <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
        {step.title}
      </h3>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-mist-300">
        {step.body}
      </p>
    </div>
  );
}

export default function Model() {
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <Section variant="darker">
      <Container>
        <Reveal>
          <Eyebrow>The Model</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.03em] text-white md:text-6xl">
            Creator Product Scaling
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-300 md:text-lg">
            A repeatable system for turning attention into ownership. I run it
            with you, step by step — not as a course, as the actual build.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-32">
              <p
                className={cn(
                  "font-display text-[10rem] font-extrabold leading-none tracking-tighter text-white/10",
                  "[-webkit-text-stroke:1px_rgba(78,124,240,0.45)]"
                )}
              >
                {current.number}
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-white">
                {current.title}
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            {steps.map((step, index) => (
              <StepBlock
                key={step.number}
                step={step}
                index={index}
                onActive={setActive}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
