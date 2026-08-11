"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/motion";
import Heading from "@/components/ui/Heading";
import Spine from "@/components/ui/Spine";
import { faqItems } from "@/content/faq";
import {
  EASE_IN,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export { faqItems };

function renderAnswer(answer: string): ReactNode {
  if (!answer.includes("Terms of Service")) return answer;

  const parts = answer.split("Terms of Service");
  return (
    <>
      {parts[0]}
      <Link
        href="/terms"
        className="text-accent underline underline-offset-4 transition-opacity hover:opacity-80"
      >
        Terms of Service
      </Link>
      {parts[1]}
    </>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  return (
    <Spine
      id="faq"
      number="05"
      label="QUESTIONS"
      className="border-t border-pc-line py-28 md:py-36"
    >
      <Heading
        as="h2"
        text="Before you *apply*."
        className="max-w-[12ch]"
      />

      <Reveal delay={0.1}>
        <div className="mt-12 border-t border-pc-line">
          {faqItems.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.question} className="border-b border-pc-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className={cn(
                    "group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors duration-[200ms]",
                    "hover:bg-white/[0.02]",
                    isOpen && "bg-white/[0.02]"
                  )}
                >
                  <span
                    className={cn(
                      "text-[clamp(1rem,1.5vw,1.25rem)] font-medium tracking-[-0.02em] transition-[color,transform] duration-[300ms]",
                      isOpen
                        ? "text-accent"
                        : "text-pc-white group-hover:translate-x-1.5"
                    )}
                  >
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    className="relative flex h-5 w-5 shrink-0 items-center justify-center"
                  >
                    <span className="absolute h-px w-5 bg-pc-muted" />
                    <span
                      className={cn(
                        "absolute h-5 w-px bg-pc-muted transition-transform duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen && "scale-y-0"
                      )}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={
                        reduced ? { opacity: 0 } : { opacity: 0, y: 8 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        reduced ? { opacity: 0 } : { opacity: 0, y: 4 }
                      }
                      transition={{
                        duration: reduced ? 0.15 : 0.28,
                        ease: EASE_IN,
                      }}
                    >
                      <p className="max-w-[62ch] pb-7 text-[17px] leading-[1.6] text-pc-text">
                        {renderAnswer(item.answer)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Spine>
  );
}
