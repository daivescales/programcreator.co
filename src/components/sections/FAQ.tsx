"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Heading from "@/components/ui/Heading";
import CTAButton from "@/components/ui/CTAButton";
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
      number="04"
      label="QUESTIONS"
      className="border-t border-pc-line py-28 md:py-36"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-40">
            <Heading
              as="h2"
              text="Before you _apply_."
              underlineVariant={3}
              className="max-w-[12ch]"
            />
            <p className="mt-5 max-w-[28ch] text-[15px] leading-[1.6] text-pc-muted">
              If your question is not here, ask me on the call.
            </p>

            <div className="mt-10 border-y border-pc-line py-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-pc-muted">
                Still deciding
              </p>
              <p className="mt-3 max-w-[32ch] text-[15px] leading-[1.6] text-pc-text">
                The call is free and takes twenty minutes. You leave with a
                clear yes or no.
              </p>
              <div className="mt-5">
                <CTAButton href="/apply" variant="ghost" size="sm">
                  Apply to work with me
                </CTAButton>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="border-t border-pc-line">
            {faqItems.map((item, index) => {
              const isOpen = open === index;
              const number = String(index + 1).padStart(2, "0");

              return (
                <div key={item.question} className="border-b border-pc-line">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className={cn(
                      "group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-7 text-left transition-colors duration-[200ms]",
                      "hover:bg-white/[0.02]",
                      isOpen && "bg-white/[0.02]"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[12px] tabular-nums transition-colors duration-[300ms]",
                        isOpen ? "text-accent" : "text-pc-muted"
                      )}
                    >
                      {number}
                    </span>
                    <span
                      className={cn(
                        "text-[clamp(1rem,1.5vw,1.2rem)] font-medium tracking-[-0.02em] transition-[color,transform] duration-[300ms]",
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

                  <motion.div
                    initial={false}
                    animate={
                      isOpen
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{
                      duration: reduced ? 0.15 : 0.35,
                      ease: EASE_IN,
                    }}
                    className="overflow-hidden"
                  >
                    <p
                      className={cn(
                        "max-w-[54ch] pb-8 text-[17px] leading-[1.7] text-pc-text transition-transform duration-[300ms]",
                        isOpen ? "translate-y-0" : "translate-y-2"
                      )}
                    >
                      {renderAnswer(item.answer)}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Spine>
  );
}
