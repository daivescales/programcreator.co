"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/motion";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionNumber from "@/components/ui/SectionNumber";
import { faqItems } from "@/content/faq";
import { EASE_IN, EASE_OUT, usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export { faqItems };

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="faq" bordered className="scroll-mt-section">
      <Container>
        <SectionNumber number="06" label="FAQ" />

        <Heading
          as="h2"
          text="Before you *apply*."
          className="mt-8 max-w-[12ch]"
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
                      "group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors duration-200",
                      "hover:bg-white/[0.02]",
                      isOpen && "bg-white/[0.02]"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[clamp(1.05rem,1.6vw,1.35rem)] font-medium tracking-[-0.02em] transition-[color,transform] duration-[350ms]",
                        isOpen
                          ? "translate-x-0 text-accent"
                          : "text-pc-white group-hover:translate-x-1.5"
                      )}
                    >
                      {item.question}
                    </span>
                    <Plus
                      size={24}
                      strokeWidth={1.5}
                      className={cn(
                        "shrink-0 text-pc-muted transition-transform duration-[350ms]",
                        isOpen && "rotate-[135deg] text-accent"
                      )}
                      aria-hidden
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={
                          reduced
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        animate={
                          reduced
                            ? { opacity: 1 }
                            : { height: "auto", opacity: 1 }
                        }
                        exit={
                          reduced
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{
                          height: {
                            duration: 0.35,
                            ease: isOpen ? EASE_IN : EASE_OUT,
                          },
                          opacity: { duration: 0.28 },
                        }}
                        className="overflow-hidden"
                      >
                        <motion.p
                          initial={reduced ? false : { y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.35, ease: EASE_IN }}
                          className="max-w-[62ch] pb-7 text-[17px] leading-[1.65] text-pc-text"
                        >
                          {item.answer}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
