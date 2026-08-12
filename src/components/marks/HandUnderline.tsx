"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  EASE_IN,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const PATHS = [
  "M0,6.5 C22,3 40,9.5 58,6 C74,3 88,8.5 100,5",
  "M0,7 C20,10 38,3.5 56,7 C72,10 86,4 100,6.5",
] as const;

export type HandUnderlineProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 1 | 2;
  delay?: number;
  trigger?: "view" | "hover";
  active?: boolean;
};

/**
 * Hand drawn underline.
 * nowrap + path 0..100 + fonts.ready + thickness from font size.
 */
export default function HandUnderline({
  children,
  className,
  variant = 1,
  delay = 1.0,
  trigger = "view",
  active = false,
}: HandUnderlineProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(wrapRef, { once: true, margin: "-10%" });
  const [strokeWidth, setStrokeWidth] = useState(3.5);
  const [drawn, setDrawn] = useState(false);
  const [pathLen, setPathLen] = useState(0);
  const path = PATHS[Math.min(Math.max(variant, 1), 2)-1];
  const isHover = trigger === "hover";

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const measure = () => {
      const size = parseFloat(getComputedStyle(el).fontSize) || 16;
      setStrokeWidth(Math.min(Math.max(size * 0.085, 3.5), 11));
      if (pathRef.current) {
        try {
          setPathLen(pathRef.current.getTotalLength());
        } catch {
          setPathLen(120);
        }
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [path]);

  useEffect(() => {
    if (isHover || reduced) {
      if (reduced && !isHover) setDrawn(true);
      return;
    }
    if (!inView || drawn) return;

    let cancelled = false;
    (async () => {
      try {
        if (typeof document !== "undefined" && document.fonts?.ready) {
          await document.fonts.ready;
        }
      } catch {
        // ignore
      }
      if (cancelled) return;
      // Remeasure after fonts settle
      if (wrapRef.current) {
        const size =
          parseFloat(getComputedStyle(wrapRef.current).fontSize) || 16;
        setStrokeWidth(Math.min(Math.max(size * 0.085, 3.5), 11));
      }
      if (pathRef.current) {
        try {
          setPathLen(pathRef.current.getTotalLength());
        } catch {
          /* ignore */
        }
      }
      setDrawn(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [inView, isHover, reduced, drawn]);

  const showHover = isHover && active;
  const showView = !isHover && (reduced || drawn);

  return (
    <span
      ref={wrapRef}
      className={cn(
        "relative inline-block whitespace-nowrap align-baseline",
        className
      )}
    >
      {children}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-0 top-full h-[0.30em] w-full overflow-visible text-accent"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
      >
        <motion.path
          ref={pathRef}
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={false}
          animate={
            isHover
              ? {
                  strokeDashoffset: showHover ? 0 : pathLen || 1,
                  opacity: showHover ? 1 : 0,
                }
              : {
                  strokeDashoffset: showView ? 0 : pathLen || 1,
                  opacity: 1,
                }
          }
          style={{
            strokeDasharray: pathLen || 1,
          }}
          transition={
            isHover
              ? {
                  strokeDashoffset: {
                    duration: reduced ? 0.15 : 0.3,
                    ease: EASE_IN,
                  },
                  opacity: { duration: 0.12 },
                }
              : {
                  strokeDashoffset: {
                    duration: reduced ? 0.15 : 0.75,
                    delay: reduced ? 0 : delay,
                    ease: EASE_IN,
                  },
                }
          }
        />
      </svg>
    </span>
  );
}
