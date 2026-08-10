"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  EASE_IN,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type CharDriftProps = {
  children: string;
  className?: string;
  delay?: number;
  as?: "span" | "p" | "div";
};

export default function CharDrift({
  children,
  className,
  delay = 0,
  as: Tag = "span",
}: CharDriftProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const chars = Array.from(children);

  useEffect(() => {
    setReady(true);
  }, []);

  const show = !ready || inView;

  return (
    <Tag ref={ref as React.Ref<never>} className={cn(className)} aria-label={children}>
      {chars.map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          aria-hidden
          className="inline-block whitespace-pre will-change-transform"
          initial={false}
          animate={
            reduced
              ? { opacity: show ? 1 : 0, y: 0 }
              : { opacity: show ? 1 : 0, y: show ? 0 : 6 }
          }
          transition={
            reduced
              ? { duration: 0.2, delay, ease: "linear" }
              : {
                  duration: 0.6,
                  delay: delay + i * 0.012,
                  ease: EASE_IN,
                }
          }
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
}

export type { CharDriftProps };
