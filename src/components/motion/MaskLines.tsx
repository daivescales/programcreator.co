"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  EASE_IN,
  VIEWPORT_ONCE,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type MaskLinesProps = {
  children: string;
  className?: string;
  delay?: number;
};

function measureLines(
  text: string,
  width: number,
  styles: CSSStyleDeclaration
): string[] | null {
  if (!width || width < 1) return null;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const font = [
    styles.fontStyle,
    styles.fontWeight,
    styles.fontSize,
    styles.fontFamily,
  ]
    .filter(Boolean)
    .join(" ");

  ctx.font = font;

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [text];

  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (ctx.measureText(next).width <= width) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines.length > 0 ? lines : [text];
}

export default function MaskLines({
  children,
  className,
  delay = 0,
}: MaskLinesProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const [lines, setLines] = useState<string[] | null>(null);
  const inView = useInView(ref, VIEWPORT_ONCE);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const measured = measureLines(
        children,
        el.clientWidth,
        window.getComputedStyle(el)
      );
      setLines(measured);
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  const displayLines = lines ?? [children];
  const show = !ready || inView;

  return (
    <p ref={ref} className={cn(className)}>
      {displayLines.map((line, i) => (
        <span key={`${i}-${line}`} className="block overflow-hidden">
          <motion.span
            className="block will-change-transform"
            initial={false}
            animate={
              reduced
                ? { opacity: show ? 1 : 0, y: 0 }
                : { y: show ? "0%" : "110%", opacity: 1 }
            }
            transition={
              reduced
                ? { duration: 0.15, delay, ease: "linear" }
                : {
                    duration: 0.85,
                    delay: delay + i * 0.055,
                    ease: EASE_IN,
                  }
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </p>
  );
}
