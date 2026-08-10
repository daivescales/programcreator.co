"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  EASE_IN,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type SectionNumberProps = {
  number: string;
  label: string;
  className?: string;
};

export default function SectionNumber({
  number,
  label,
  className,
}: SectionNumberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    setReady(true);
  }, []);

  const show = !ready || inView;
  const displayNumber = number.startsWith("(") ? number : `(${number})`;

  return (
    <div
      ref={ref}
      className={cn(
        "mb-10 flex items-center gap-5 md:mb-14",
        className
      )}
    >
      <span className="shrink-0 text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
        {displayNumber}
      </span>
      <motion.span
        aria-hidden
        className="h-px flex-1 origin-left bg-pc-line"
        initial={false}
        animate={{ scaleX: show ? 1 : 0 }}
        transition={
          reduced
            ? { duration: 0.2, ease: "linear" }
            : { duration: 0.9, ease: EASE_IN }
        }
      />
      <span className="shrink-0 text-[12px] font-medium uppercase tracking-[0.18em] text-pc-muted">
        {label}
      </span>
    </div>
  );
}
