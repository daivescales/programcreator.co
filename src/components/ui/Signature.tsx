"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  EASE_IN,
  VIEWPORT_ONCE,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type SignatureProps = {
  className?: string;
  height?: number;
  delay?: number;
};

/** SVG "Daive" signature , pathLength draw on whileInView once. */
export default function Signature({
  className,
  height = 48,
  delay = 0,
}: SignatureProps) {
  const ref = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const inView = useInView(ref, VIEWPORT_ONCE);

  useEffect(() => {
    setReady(true);
  }, []);

  const show = !ready || inView;
  const width = height * 3.2;

  return (
    <motion.svg
      ref={ref}
      aria-label="Daive"
      role="img"
      viewBox="0 0 280 88"
      width={width}
      height={height}
      className={cn("overflow-visible", className)}
      initial={false}
    >
      <motion.path
        d="M 12 62 C 18 28, 42 18, 58 34 C 68 44, 62 58, 48 60 C 36 62, 28 52, 34 42 C 48 18, 92 8, 118 28 C 132 38, 128 58, 108 62 C 96 64, 90 54, 98 46 C 118 22, 168 12, 198 32 C 214 42, 218 58, 198 64 C 178 70, 168 52, 186 40 C 210 22, 248 28, 262 48"
        fill="none"
        stroke="var(--pc-accent-2)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={
          reduced
            ? { pathLength: 1, opacity: show ? 1 : 0 }
            : { pathLength: show ? 1 : 0, opacity: 1 }
        }
        transition={
          reduced
            ? { duration: 0.15, delay, ease: "linear" }
            : { duration: 1.2, delay, ease: EASE_IN }
        }
      />
    </motion.svg>
  );
}
