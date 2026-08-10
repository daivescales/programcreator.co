"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqItems } from "@/content/faq";

export default function FAQ() {
  return (
    <Section id="faq" tint>
      <Container>
        <Reveal>
          <SectionHeading
            center
            eyebrow="FAQ"
            title="Questions people ask before applying"
          />
        </Reveal>

        <Reveal delay={0.06}>
          <Accordion
            type="single"
            collapsible
            className="mx-auto mt-12 max-w-[780px]"
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="mb-3 overflow-hidden rounded-xl border border-pc-line bg-pc-white px-6 not-last:mb-3 not-last:border-b-pc-line"
              >
                <AccordionTrigger className="py-5 text-left text-[16px] font-medium text-pc-ink hover:no-underline md:text-[17px] [&_[data-slot=accordion-trigger-icon]]:text-pc-muted">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-pc-body">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </Section>
  );
}
