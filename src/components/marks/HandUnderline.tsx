"use client";

import { motion } from "framer-motion";
import {
  EASE_IN,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const PATHS = [
  // Variant 1: soft mid dip, right overshoot
  "M 1 5 C 22 5.5, 45 9, 68 6.5 C 82 5, 92 7, 105 4.5",
  // Variant 2: flatter then lift
  "M 0 6 C 18 7, 40 4, 60 8 C 78 10, 90 5, 104 6",
] as const;

export type HandUnderlineProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 1 | 2;
  delay?: number;
  trigger?: "view" | "hover";
  active?: boolean;
};

/**
 * Hand-drawn underline. The SVG is a sibling of the clipped word content
 * (not inside overflow:hidden), so it can never be clipped by MaskText.
 */
export default function HandUnderline({
  children,
  className,
  variant = 1,
  delay = 1.0,
  trigger = "view",
  active = false,
}: HandUnderlineProps) {
  const reduced = usePrefersReducedMotion();
  const path = PATHS[Math.min(Math.max(variant, 1), 2) - 1];
  const isHover = trigger === "hover";

  return (
    <span
      className={cn(
        "relative inline-block whitespace-nowrap align-baseline",
        className
      )}
    >
      {children}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-0 top-full h-[0.3em] w-[105%] overflow-visible"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        style={{ transform: "rotate(-0.8deg)" }}
      >
        {reduced && !isHover ? (
          <path
            d={path}
            fill="none"
            stroke="var(--pc-accent)"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ) : isHover ? (
          <motion.path
            d={path}
            fill="none"
            stroke="var(--pc-accent)"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{
              pathLength: active ? 1 : 0,
              opacity: active ? 1 : 0,
            }}
            transition={{
              pathLength: { duration: reduced ? 0.15 : 0.3, ease: EASE_IN },
              opacity: { duration: 0.12, ease: "linear" },
            }}
          />
        ) : (
          <motion.path
            d={path}
            fill="none"
            stroke="var(--pc-accent)"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              pathLength: { duration: 0.7, delay, ease: EASE_IN },
            }}
          />
        )}
      </svg>
    </span>
  );
}
