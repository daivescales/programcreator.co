"use client";

import { motion } from "framer-motion";
import {
  EASE_IN,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const PATHS = [
  // Soft mid dip, right overshoot
  "M 2 14 C 18 16, 32 18, 48 15 C 62 12, 78 17, 98 11",
  // Flatter start, deeper mid, lift off
  "M 1 12 C 22 11, 40 20, 58 16 C 72 13, 88 18, 100 10",
  // Slightly wavy, longer overshoot
  "M 0 13 C 15 17, 35 11, 55 16 C 70 19, 85 12, 102 14",
] as const;

export type HandUnderlineProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 1 | 2 | 3;
  thickness?: number;
  color?: string;
  /** Delay before the stroke draws (after heading words). */
  delay?: number;
  /**
   * "view" (default): draw once on whileInView.
   * "hover": draw when `active` is true (nav links), 300ms.
   */
  trigger?: "view" | "hover";
  /** When trigger="hover", controls whether the stroke is drawn. */
  active?: boolean;
};

export default function HandUnderline({
  children,
  className,
  variant = 1,
  thickness = 3,
  color = "var(--pc-accent)",
  delay = 1.05,
  trigger = "view",
  active = false,
}: HandUnderlineProps) {
  const reduced = usePrefersReducedMotion();
  const path = PATHS[Math.min(Math.max(variant, 1), 3) - 1];
  const isHover = trigger === "hover";

  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      {children}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-0 top-[0.92em] h-[0.34em] w-[106%] overflow-visible"
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        style={{ transform: "rotate(-0.7deg)" }}
      >
        {reduced && !isHover ? (
          <path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ) : isHover ? (
          <motion.path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{ pathLength: active ? 1 : 0 }}
            transition={{
              pathLength: {
                duration: reduced ? 0.15 : 0.3,
                ease: EASE_IN,
              },
            }}
          />
        ) : (
          <motion.path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{
              pathLength: { duration: 0.7, delay, ease: EASE_IN },
            }}
          />
        )}
      </svg>
    </span>
  );
}
