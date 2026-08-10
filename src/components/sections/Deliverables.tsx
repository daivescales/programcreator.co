"use client";

import { useRef } from "react";
import {
  BarChart3,
  Clapperboard,
  FileText,
  Palette,
  Smartphone,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "@/components/motion";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionNumber from "@/components/ui/SectionNumber";
import { EASE_IN, usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const tiles = [
  {
    icon: FileText,
    title: "Offer & positioning doc",
    body: "The exact product, who it's for, what it costs, and why they buy now rather than later.",
  },
  {
    icon: Palette,
    title: "Brand-true design",
    body: "Type, colour and layout that look like your brand, not like a template someone bought.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first build",
    body: "Your audience is on their phone. It's designed there first, desktop second.",
  },
  {
    icon: Clapperboard,
    title: "Content angles that sell",
    body: "Hooks and content structures that move people from feed to page without sounding like an ad.",
  },
  {
    icon: BarChart3,
    title: "Numbers you can read",
    body: "Tracking wired up properly, so you can see what converts instead of guessing.",
  },
] as const;

const skeletonBars = [
  { width: "72%", accent: false },
  { width: "48%", accent: true },
  { width: "100%", accent: false },
  { width: "88%", accent: false },
  { width: "64%", accent: false },
] as const;

function PageMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduced = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className="mt-8 overflow-hidden rounded-[4px] border border-pc-line bg-navy-900"
    >
      <div className="flex items-center gap-1.5 border-b border-pc-line px-4 py-3">
        <span className="h-[7px] w-[7px] rounded-full bg-pc-muted/40" />
        <span className="h-[7px] w-[7px] rounded-full bg-pc-muted/40" />
        <span className="h-[7px] w-[7px] rounded-full bg-pc-muted/40" />
      </div>
      <div className="space-y-3 p-5">
        {skeletonBars.map((bar, index) => (
          <motion.div
            key={index}
            className={cn(
              "h-2.5 origin-left rounded-[2px]",
              bar.accent ? "bg-accent" : "bg-pc-white/15"
            )}
            style={{ width: bar.width }}
            initial={reduced ? false : { scaleX: 0 }}
            animate={
              reduced || inView ? { scaleX: 1 } : { scaleX: 0 }
            }
            transition={{
              duration: reduced ? 0.2 : 0.55,
              delay: reduced ? 0 : 0.08 * index,
              ease: EASE_IN,
            }}
          />
        ))}
        <motion.div
          className="mt-4 inline-flex h-9 items-center rounded-[4px] bg-accent px-4 text-[11px] font-medium text-navy-900"
          whileHover={reduced ? undefined : { scale: [1, 1.04, 1] }}
          transition={{ duration: 0.45 }}
        >
          Get instant access
        </motion.div>
      </div>
    </div>
  );
}

export default function Deliverables() {
  return (
    <Section id="deliverables" bordered className="scroll-mt-section">
      <Container>
        <SectionNumber number="04" label="Deliverables" />

        <Heading
          as="h2"
          text="No vague strategy. *Real assets*."
          className="mt-8 max-w-[14ch]"
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-pc-line bg-pc-line lg:grid-cols-3">
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <article className="group h-full bg-navy-800 p-8 transition-colors duration-[400ms] hover:bg-navy-700 hover:outline hover:outline-1 hover:outline-pc-line-2">
              <h3 className="text-[clamp(1.25rem,2vw,1.65rem)] font-semibold tracking-[-0.03em] text-pc-white">
                A page built to convert
              </h3>
              <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.65] text-pc-text">
                Written and designed from zero. Real hierarchy, real objection
                handling, a checkout that doesn&apos;t lose people on mobile, and
                load speed that doesn&apos;t kill the sale.
              </p>
              <PageMockup />
            </article>
          </Reveal>

          {tiles.map((tile, index) => {
            const Icon = tile.icon;
            return (
              <Reveal key={tile.title} delay={0.06 * (index + 1)}>
                <article className="group h-full bg-navy-800 p-8 transition-colors duration-[400ms] hover:bg-navy-700 hover:outline hover:outline-1 hover:outline-pc-line-2">
                  <div className="flex h-11 w-11 items-center justify-center border border-pc-line text-accent">
                    <Icon size={20} strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="mt-5 text-[clamp(1.25rem,2vw,1.65rem)] font-semibold tracking-[-0.03em] text-pc-white">
                    {tile.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-pc-text">
                    {tile.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
