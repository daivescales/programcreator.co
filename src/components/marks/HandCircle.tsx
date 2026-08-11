"use client";

import { motion } from "framer-motion";
import {
  EASE_IN,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Imperfect open ellipses. Paths intentionally wobble and leave a gap
 * where the stroke overlaps itself at the close, like a real pen circle.
 */
const PATHS = [
  "M 78 22 C 96 38, 94 78, 68 92 C 42 106, 8 94, 6 58 C 4 28, 22 6, 52 8 C 72 10, 86 18, 82 28",
  "M 22 18 C 8 32, 4 68, 22 90 C 40 110, 86 104, 96 72 C 104 44, 90 12, 58 8 C 36 5, 18 12, 20 24",
] as const;

export type HandCircleProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 1 | 2;
  thickness?: number;
  color?: string;
  delay?: number;
};

export default function HandCircle({
  children,
  className,
  variant = 1,
  thickness = 2.5,
  color = "var(--pc-accent)",
  delay = 0.35,
}: HandCircleProps) {
  const reduced = usePrefersReducedMotion();
  const path = PATHS[Math.min(Math.max(variant, 1), 2) - 1];

  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      {children}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[1.55em] w-[1.55em] -translate-x-1/2 -translate-y-[48%] overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {reduced ? (
          <path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
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
              pathLength: { duration: 0.9, delay, ease: EASE_IN },
            }}
          />
        )}
      </svg>
    </span>
  );
}
