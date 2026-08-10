"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Scroll parallax speed, clamped to -0.3..0.3 */
  speed?: number;
};

export default function Parallax({
  children,
  className,
  speed = 0.15,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const clamped = Math.max(-0.3, Math.min(0.3, speed));

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [
    `${clamped * -100}%`,
    `${clamped * 100}%`,
  ]);

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={reduced ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}

export type { ParallaxProps };
