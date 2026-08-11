"use client";

/**
 * RotatingWord — cycles words with mask up/out.
 * Width: in-flow sizer is the widest measured word (never the active word),
 * so the slot does not jump as words change. Only opacity + translateY animate.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  EASE_IN,
  EASE_OUT,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type RotatingWordProps = {
  words: string[];
  className?: string;
  /** Hold each word before transition. Default 2.4s. */
  interval?: number;
  /** Transition duration. Default 0.5s. */
  duration?: number;
};

export default function RotatingWord({
  words,
  className,
  interval = 2.4,
  duration = 0.5,
}: RotatingWordProps) {
  const reduced = usePrefersReducedMotion();
  const measureRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const [widestWord, setWidestWord] = useState(words[0] ?? "");

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const measure = () => {
      const children = el.querySelectorAll("[data-measure-word]");
      let max = 0;
      let widest = words[0] ?? "";
      children.forEach((node) => {
        const width = (node as HTMLElement).offsetWidth;
        if (width > max) {
          max = width;
          widest = (node as HTMLElement).dataset.measureWord ?? widest;
        }
      });
      if (widest) setWidestWord(widest);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [words]);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval * 1000);
    return () => window.clearInterval(id);
  }, [interval, reduced, words.length]);

  const current = words[index] ?? words[0] ?? "";

  return (
    <span
      className={cn(
        "relative inline-flex h-[1.15em] items-baseline overflow-hidden align-baseline",
        className
      )}
    >
      {/* Hidden measurer — finds widest word in rendered font */}
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0 flex flex-col whitespace-nowrap"
      >
        {words.map((w) => (
          <span key={w} data-measure-word={w} className="inline-block">
            {w}
          </span>
        ))}
      </span>

      {/* In-flow sizer — widest word only; does not change with rotation */}
      <span className="invisible whitespace-nowrap" aria-hidden>
        {widestWord}
      </span>

      {reduced ? (
        <span className="absolute inset-0 inline-flex items-baseline whitespace-nowrap">
          {current}
        </span>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current}
            className="absolute inset-0 inline-flex items-baseline whitespace-nowrap will-change-transform"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{
              duration,
              ease: EASE_IN,
              opacity: { duration: duration * 0.8, ease: EASE_OUT },
            }}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  );
}
