"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&";

type ScrambleTextProps = {
  text: string;
  className?: string;
};

export default function ScrambleText({ text, className }: ScrambleTextProps) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const raf = useRef(0);
  const hovering = useRef(false);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const scramble = useCallback(() => {
    if (reduced) return;
    hovering.current = true;
    const duration = 400;
    const start = performance.now();
    const chars = Array.from(text);

    const tick = (now: number) => {
      if (!hovering.current) {
        setDisplay(text);
        return;
      }

      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const resolved = Math.floor(progress * chars.length);

      const next = chars
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < resolved) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplay(next);
      frame.current += 1;

      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
  }, [reduced, text]);

  const reset = useCallback(() => {
    hovering.current = false;
    if (raf.current) cancelAnimationFrame(raf.current);
    setDisplay(text);
  }, [text]);

  return (
    <span
      className={cn("inline-block", className)}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      onFocus={scramble}
      onBlur={reset}
    >
      {display}
    </span>
  );
}

export type { ScrambleTextProps };
