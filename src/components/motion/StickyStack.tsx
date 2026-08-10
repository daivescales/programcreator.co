"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type StickyStep = {
  id: string;
  label: string;
  title: string;
  body: string;
  number?: string;
};

type StickyStackProps = {
  steps: StickyStep[];
  /** Pin scroll length as viewport-height multiples. Default: steps.length */
  pinDuration?: number;
  className?: string;
  onProgress?: (progress: number, activeIndex: number) => void;
  /** Optional custom step renderer */
  renderStep?: (step: StickyStep, index: number, active: boolean) => ReactNode;
};

export default function StickyStack({
  steps,
  pinDuration,
  className,
  onProgress,
  renderStep,
}: StickyStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduced || steps.length === 0) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const setup = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const duration = pinDuration ?? steps.length;
      const container = containerRef.current;
      const pin = pinRef.current;
      if (!container || !pin) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: () => `+=${duration * window.innerHeight}`,
          pin,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              steps.length - 1,
              Math.floor(self.progress * steps.length)
            );
            setActiveIndex(idx);
            onProgress?.(self.progress, idx);
          },
        });
      }, container);

      if (cancelled) {
        ctx.revert();
        ctx = undefined;
      }
    };

    void setup();

    return () => {
      cancelled = true;
      ctx?.revert();
      ctx = undefined;
    };
  }, [reduced, steps, pinDuration, onProgress]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] items-center"
      >
        <div className="grid w-full gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
          <ol className="flex flex-col gap-6 md:gap-8">
            {steps.map((step, i) => {
              const active = i === activeIndex;
              return (
                <li
                  key={step.id}
                  className={cn(
                    "transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    active ? "opacity-100" : "opacity-25"
                  )}
                >
                  {renderStep ? (
                    renderStep(step, i, active)
                  ) : (
                    <div>
                      <p className="text-[12px] uppercase tracking-[0.18em] text-pc-muted">
                        <span className="text-accent">
                          (
                          {(
                            step.number ?? String(i + 1).padStart(2, "0")
                          ).replace(/[()]/g, "")}
                          )
                        </span>{" "}
                        {step.label}
                      </p>
                      <h3 className="mt-3 text-[clamp(1.25rem,2vw,1.65rem)] font-semibold tracking-[-0.035em] text-white">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-[42ch] text-[17px] leading-[1.65] text-pc-text">
                        {step.body}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="relative hidden md:block" aria-hidden>
            <div className="sticky top-[30vh]">
              <p className="font-serif-italic text-[clamp(4rem,10vw,8rem)] leading-none tracking-[-0.04em] text-accent-2/40">
                {String(activeIndex + 1).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { StickyStackProps };
