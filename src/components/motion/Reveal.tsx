"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import {
  EASE_IN,
  VIEWPORT_ONCE,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
}: RevealProps) {
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
      className={cn(className)}
      initial={false}
      animate={
        reduced
          ? { opacity: show ? 1 : 0, y: 0 }
          : { opacity: show ? 1 : 0, y: show ? 0 : 16 }
      }
      transition={
        reduced
          ? { duration: 0.15, delay, ease: "linear" }
          : { duration: 0.5, delay, ease: EASE_IN }
      }
    >
      {children}
    </motion.div>
  );
}
