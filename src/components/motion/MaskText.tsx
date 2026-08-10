"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import {
  EASE_IN,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type MaskTextProps = {
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
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const tokens = parseMarkup(children);

  useEffect(() => {
    setReady(true);
  }, []);

  let wordIndex = 0;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(className)}
    >
      {tokens.map((token, i) => {
        if (token.isSpace) {
          return <span key={i}>{token.word}</span>;
        }

        const index = wordIndex++;
        const show = !ready || inView;
        const content = (
          <motion.span
            className={cn(
              "inline-block will-change-transform",
              token.emphasis && "font-serif-italic text-accent-2"
            )}
            initial={false}
            animate={
              reduced
                ? { opacity: show ? 1 : 0, y: 0 }
                : { y: show ? "0%" : "110%", opacity: 1 }
            }
            transition={
              reduced
                ? { duration: 0.2, delay, ease: "linear" }
                : {
                    duration: 0.9,
                    delay: delay + index * 0.045,
                    ease: EASE_IN,
                  }
            }
          >
            {token.word}
          </motion.span>
        );

        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom pb-[0.08em]"
          >
            {content as ReactNode}
          </span>
        );
      })}
    </Tag>
  );
}

export type { MaskTextProps };
