"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MaskLines,
  MaskText,
  Parallax,
  Reveal,
  ScrollScale,
} from "@/components/motion";
import Aurora from "@/components/system/Aurora";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function SellsUnderline({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -bottom-1 left-0 h-[0.35em] w-full overflow-visible"
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M2 8 C 28 2, 52 12, 78 6 S 110 2, 118 7"
        fill="none"
        stroke="var(--pc-accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          active
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

function StorefrontCard() {
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="h-3 w-1/2 rounded-[2px] bg-navy-600" />
      <div className="aspect-[4/3] w-full rounded-[2px] bg-navy-600" />
      <div className="grid grid-cols-3 gap-2">
        <div className="aspect-square rounded-[2px] bg-navy-600" />
        <div className="aspect-square rounded-[2px] bg-navy-600" />
        <div className="aspect-square rounded-[2px] bg-navy-600" />
      </div>
      <div className="mt-auto flex items-center justify-between">
        <div className="h-2.5 w-16 rounded-[2px] bg-navy-600" />
        <div className="h-2.5 w-10 rounded-[2px] bg-accent/40" />
      </div>
    </div>
  );
}

function SalesPageCard() {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-4 flex items-center gap-1.5 border-b border-pc-line pb-3">
        <span className="h-[7px] w-[7px] rounded-full bg-pc-muted/50" />
        <span className="h-[7px] w-[7px] rounded-full bg-pc-muted/50" />
        <span className="h-[7px] w-[7px] rounded-full bg-pc-muted/50" />
      </div>
      <div className="h-3 w-[72%] rounded-[2px] bg-pc-white/20" />
      <div className="mt-2 h-3 w-[48%] rounded-[2px] bg-accent/45" />
      <div className="mt-5 space-y-2">
        <div className="h-2 w-full rounded-[2px] bg-pc-white/10" />
        <div className="h-2 w-[92%] rounded-[2px] bg-pc-white/10" />
        <div className="h-2 w-[78%] rounded-[2px] bg-pc-white/10" />
      </div>
      <div className="mt-auto pt-6">
        <div className="inline-flex h-9 items-center rounded-[4px] bg-accent px-4 text-[11px] font-medium text-navy-900">
          Get instant access
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const [underline, setUnderline] = useState(false);
  const [hideCue, setHideCue] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setUnderline(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setHideCue(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-navy-800 pt-32 pb-20">
      <Aurora className="top-[-10%] right-[-15%] opacity-60" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <Container className="relative w-full">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div className="flex items-center gap-3">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-pulse-soft rounded-full bg-accent" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <p className="text-[12px] uppercase tracking-[0.18em] text-pc-muted">
                  Taking 4 new brands · Q3 2026
                </p>
              </div>
            </Reveal>

            <h1 className="mt-7 max-w-[15ch] text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-pc-white">
              <MaskText as="span" className="block" delay={0.05}>
                Turn your audience
              </MaskText>
              <MaskText as="span" className="block" delay={0.2}>
                into a product that
              </MaskText>
              <span className="relative mt-1 inline-block">
                <MaskText as="span" delay={0.35}>
                  *actually sells*
                </MaskText>
                <SellsUnderline active={underline && !reduced} />
              </span>
            </h1>

            <MaskLines
              delay={0.55}
              className="mt-7 max-w-[52ch] text-lg leading-[1.65] text-pc-text"
            >
              {"I'm Daive. I build digital products for creators and rebuild storefronts for physical brands — then scale them through the audience you already have. Creators pay nothing upfront; I take a revenue split. Product brands run on a flat retainer."}
            </MaskLines>

            <Reveal delay={0.7}>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <CTAButton href="/apply" size="lg" className="w-full sm:w-auto">
                  Apply to work with me
                </CTAButton>
                <CTAButton
                  href="#process"
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  See the process
                </CTAButton>
              </div>
              <p className="mt-5 text-[12px] text-pc-muted">
                Free 20-minute brand audit · No deck · You&apos;ll know if
                it&apos;s a fit by the end of the call
              </p>
            </Reveal>
          </div>

          <div className="relative mx-auto w-full max-w-[420px] lg:col-span-5 lg:mx-0 lg:max-w-none">
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pc-glow blur-3xl"
            />

            <div className="relative aspect-[4/5] w-full">
              <Parallax speed={-0.06} className="absolute inset-[6%_0_0_18%]">
                <ScrollScale className="h-full">
                  <Reveal delay={0.5}>
                    <div
                      className={cn(
                        "h-full origin-center rounded-[4px] border border-pc-line bg-navy-700 opacity-70",
                        "rotate-[-2deg] lg:rotate-[-2deg] max-lg:rotate-[-1deg]"
                      )}
                    >
                      <StorefrontCard />
                    </div>
                  </Reveal>
                </ScrollScale>
              </Parallax>

              <Parallax speed={0.12} className="absolute inset-[18%_12%_0_0%]">
                <ScrollScale className="h-full">
                  <Reveal delay={0.65}>
                    <motion.div
                      className="h-full rounded-[4px] border border-pc-line-2 bg-navy-700"
                      animate={
                        reduced
                          ? undefined
                          : { y: [0, -6, 0] }
                      }
                      transition={
                        reduced
                          ? undefined
                          : {
                              duration: 6,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }
                      }
                    >
                      <SalesPageCard />
                    </motion.div>
                  </Reveal>
                </ScrollScale>
              </Parallax>
            </div>
          </div>
        </div>
      </Container>

      <div
        className={cn(
          "absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 transition-opacity duration-500",
          hideCue ? "pointer-events-none opacity-0" : "opacity-100"
        )}
      >
        <div className="relative h-10 w-px overflow-hidden bg-pc-line">
          {!reduced && (
            <motion.span
              aria-hidden
              className="absolute inset-x-0 top-0 h-3 bg-accent"
              animate={{ y: ["-100%", "350%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </div>
        <span className="text-[11px] uppercase tracking-[0.2em] text-pc-muted">
          Scroll
        </span>
      </div>
    </section>
  );
}
