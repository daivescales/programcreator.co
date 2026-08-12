"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import { faqItems } from "@/content/faq";
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

  return (
    <Section id="faq" tone="750">
      <SectionLabel number="04" label="Questions" />

      <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Heading
              as="h2"
              text="Before you _apply_."
              underlineVariant={2}
              className="max-w-[12ch]"
            />
            <p className="hand mt-4">ask me the rest on the call</p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {faqItems.map((item, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            const isFirst = index === 0;

            return (
              <div
                key={item.question}
                className={cn(!isFirst && "border-t border-pc-line")}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="group flex w-full items-center justify-between gap-4 py-7 text-left"
                >
                  <span
                    className={cn(
                      "text-[16px] font-medium transition-colors duration-[180ms]",
                      isOpen
                        ? "text-accent"
                        : "text-pc-white group-hover:text-accent-2"
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
                        "absolute h-5 w-px bg-pc-muted transition-transform duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen && "scale-y-0"
                      )}
                    />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  className="accordion-grid"
                  data-open={isOpen ? "true" : "false"}
                >
                  <div className="accordion-inner">
                    <p
                      className={cn(
                        "t-body max-w-[54ch] pb-8 transition-opacity duration-[200ms]",
                        isOpen ? "opacity-100 delay-[60ms]" : "opacity-0"
                      )}
                    >
                      {renderAnswer(item.answer)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
