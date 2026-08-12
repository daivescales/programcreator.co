"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import HandUnderline from "@/components/marks/HandUnderline";
import {
  EASE_IN,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type MaskTextProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  underlineVariant?: 1 | 2;
};

type WordToken = {
  word: string;
  emphasis: boolean;
  underline: boolean;
  isSpace: boolean;
};

/** *word* → Caveat · _word_ → HandUnderline */
function parseMarkup(text: string): WordToken[] {
  const tokens: WordToken[] = [];
  const re = /\*([^*]+)\*|_([^_]+)_|([^*_]+)/g;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    const emphasis = match[1] !== undefined;
    const underline = match[2] !== undefined;
    const segment = emphasis
      ? match[1]
      : underline
        ? match[2]
        : (match[3] ?? "");
    const parts = segment.split(/(\s+)/);

    for (const part of parts) {
      if (!part) continue;
      const isSpace = /^\s+$/.test(part);
      tokens.push({
        word: part,
        emphasis: emphasis && !isSpace,
        underline: underline && !isSpace,
        isSpace,
      });
    }
  }

  return tokens;
}

export default function MaskText({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  underlineVariant = 1,
}: MaskTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const [released, setReleased] = useState<Record<number, boolean>>({});
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const tokens = parseMarkup(children);
  const hasUnderline = tokens.some((t) => t.underline);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!reduced) return;
    const all: Record<number, boolean> = {};
    for (let i = 0; i < tokens.length; i++) all[i] = true;
    setReleased(all);
  }, [reduced, tokens.length]);

  let wordIndex = 0;
  const show = !ready || inView;
  const wordCount = tokens.filter((t) => !t.isSpace).length;
  const underlineDelay = delay + wordCount * 0.035 + 0.3;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(hasUnderline && "pb-[0.35em]", className)}
    >
      {tokens.map((token, i) => {
        if (token.isSpace) {
          return <span key={i}>{token.word}</span>;
        }

        const index = wordIndex++;
        const overflowVisible = reduced || released[i];

        const inner = (
          <motion.span
            className={cn(
              "inline-block will-change-transform",
              token.emphasis && "hand"
            )}
            initial={false}
            animate={
              reduced
                ? { opacity: show ? 1 : 0, y: 0 }
                : { y: show ? "0%" : "105%", opacity: 1 }
            }
            transition={
              reduced
                ? { duration: 0.15, delay, ease: "linear" }
                : {
                    duration: 0.7,
                    delay: delay + index * 0.035,
                    ease: EASE_IN,
                  }
            }
            onAnimationComplete={() => {
              if (!reduced) {
                setReleased((prev) => ({ ...prev, [i]: true }));
              }
            }}
          >
            {token.word}
          </motion.span>
        );

        return (
          <span
            key={i}
            className="inline-block align-bottom"
            style={{
              overflow: overflowVisible ? "visible" : "hidden",
              paddingBottom: token.underline ? "0.35em" : undefined,
            }}
          >
            {token.underline ? (
              <HandUnderline
                variant={underlineVariant}
                delay={reduced ? 0 : underlineDelay}
              >
                {inner}
              </HandUnderline>
            ) : (
              inner
            )}
          </span>
        );
      })}
    </Tag>
  );
}
