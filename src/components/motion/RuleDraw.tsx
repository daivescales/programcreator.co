"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  EASE_IN,
  VIEWPORT_ONCE,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type RuleDrawProps = {
  className?: string;
  delay?: number;
};

export default function RuleDraw({ className, delay = 0 }: RuleDrawProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const inView = useInView(ref, VIEWPORT_ONCE);

  useEffect(() => {
    setReady(true);
  }, []);

  const show = !ready || inView;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={cn("h-px w-full origin-left bg-pc-line", className)}
      initial={false}
      animate={
        reduced
          ? { opacity: show ? 1 : 0, scaleX: 1 }
          : { scaleX: show ? 1 : 0, opacity: 1 }
      }
      transition={
        reduced
          ? { duration: 0.15, delay, ease: "linear" }
          : { duration: 0.7, delay, ease: EASE_IN }
      }
    />
  );
}
