"use client";

import { MaskLines, Reveal } from "@/components/motion";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import { copy } from "@/lib/copy";

export default function Process() {
  return (
    <Section id="process" tone="750">
      <SectionLabel number={copy.process.number} label={copy.process.label} />

      <Heading
        as="h2"
        text={copy.process.heading}
        className="mt-6 max-w-[14ch]"
      />

      <MaskLines delay={0.12} className="t-body mt-5 max-w-[52ch]">
        {copy.process.body}
      </MaskLines>

      <div className="mt-14 hidden gap-10 md:grid md:grid-cols-4">
        {copy.process.steps.map((step, index) => (
          <Reveal key={step.number} delay={0.06 * index}>
            <article className="group">
              <p className="text-[2rem] font-medium leading-none text-accent opacity-45 transition-[opacity,transform] duration-200 group-hover:scale-[1.06] group-hover:opacity-100">
                {step.number}
              </p>
              <h3 className="t-h3 mt-4">{step.title}</h3>
              <p className="t-body mt-2.5">{step.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <ol className="mt-14 space-y-10 md:hidden">
        {copy.process.steps.map((step) => (
          <li key={step.number} className="group">
            <p className="text-[2rem] font-medium leading-none text-accent opacity-45 transition-[opacity,transform] duration-200 group-hover:scale-[1.06] group-hover:opacity-100">
              {step.number}
            </p>
            <h3 className="t-h3 mt-3">{step.title}</h3>
            <p className="t-body mt-2.5 max-w-[46ch]">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
