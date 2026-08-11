"use client";

import { motion } from "framer-motion";
import {
  EASE_IN,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type ArrowVariant = 1 | 2 | "ltr" | "rtl";

const BODIES = {
  ltr: "M 4 28 C 28 8, 58 6, 88 22",
  rtl: "M 96 28 C 72 8, 42 6, 12 22",
} as const;

/** Two-stroke arrowheads keyed by direction. */
const HEADS = {
  ltr: ["M 78 10 L 90 24", "M 74 34 L 90 24"] as const,
  rtl: ["M 22 10 L 10 24", "M 26 34 L 10 24"] as const,
} as const;

function resolveDirection(variant: ArrowVariant): "ltr" | "rtl" {
  if (variant === 1 || variant === "ltr") return "ltr";
  return "rtl";
}

export type HandArrowProps = {
  className?: string;
  /** 1 / "ltr" curves left→right. 2 / "rtl" curves right→left. */
  variant?: ArrowVariant;
  thickness?: number;
  color?: string;
  delay?: number;
};

export default function HandArrow({
  className,
  variant = "ltr",
  thickness = 2.25,
  color = "var(--pc-accent)",
  delay = 0.2,
}: HandArrowProps) {
  const reduced = usePrefersReducedMotion();
  const dir = resolveDirection(variant);
  const body = BODIES[dir];
  const [headA, headB] = HEADS[dir];

  const strokeProps = {
    fill: "none" as const,
    stroke: color,
    strokeWidth: thickness,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none inline-block h-[1.1em] w-[2.4em] overflow-visible",
        className
      )}
      viewBox="0 0 100 40"
      preserveAspectRatio="xMidYMid meet"
    >
      {reduced ? (
        <>
          <path d={body} {...strokeProps} />
          <path d={headA} {...strokeProps} />
          <path d={headB} {...strokeProps} />
        </>
      ) : (
        <>
          <motion.path
            d={body}
            {...strokeProps}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{
              pathLength: { duration: 0.6, delay, ease: EASE_IN },
            }}
          />
          <motion.path
            d={headA}
            {...strokeProps}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{
              pathLength: {
                duration: 0.28,
                delay: delay + 0.55,
                ease: EASE_IN,
              },
            }}
          />
          <motion.path
            d={headB}
            {...strokeProps}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{
              pathLength: {
                duration: 0.28,
                delay: delay + 0.62,
                ease: EASE_IN,
              },
            }}
          />
        </>
      )}
    </svg>
  );
}
