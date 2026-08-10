"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type CountUpProps = {
  to: number;
  suffix?: ReactNode;
  prefix?: ReactNode;
  className?: string;
  decimals?: number;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function CountUp({
  to,
  suffix = "",
  prefix = "",
  className,
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (reduced) {
      setValue(to);
      return;
    }

    const duration = 1600;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(to);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to]);

  const formatted = value.toFixed(decimals);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export type { CountUpProps };
