"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  EASE_IN,
  VIEWPORT_ONCE,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type MaskTextProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
};

type WordToken = {
  word: string;
  emphasis: boolean;
  isSpace: boolean;
};

/** Parse *asterisk* emphasis into serif-em tokens. */
function parseMarkup(text: string): WordToken[] {
  const tokens: WordToken[] = [];
  const re = /\*([^*]+)\*|([^*]+)/g;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    const emphasis = match[1] !== undefined;
    const segment = emphasis ? match[1] : (match[2] ?? "");
    const parts = segment.split(/(\s+)/);

    for (const part of parts) {
      if (!part) continue;
      const isSpace = /^\s+$/.test(part);
      tokens.push({
        word: part,
        emphasis: emphasis && !isSpace,
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
}: MaskTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const inView = useInView(ref, VIEWPORT_ONCE);
  const tokens = parseMarkup(children);

  useEffect(() => {
    setReady(true);
  }, []);

  let wordIndex = 0;
  const show = !ready || inView;

  return (
    <Tag ref={ref as React.Ref<never>} className={cn(className)}>
      {tokens.map((token, i) => {
        if (token.isSpace) {
          return <span key={i}>{token.word}</span>;
        }

        const index = wordIndex++;

        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom pb-[0.08em]"
          >
            <motion.span
              className={cn(
                "inline-block will-change-transform",
                token.emphasis && "serif-em"
              )}
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
                      delay: delay + index * 0.04,
                      ease: EASE_IN,
                    }
              }
            >
              {token.word}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
