"use client";

import { ArrowRight } from "lucide-react";
import { MaskLines, StaggerList } from "@/components/motion";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import { copy } from "@/lib/copy";

export default function Model() {
  return (
    <Section id="model" tone="750" contain={false}>
      <Container>
        <SectionLabel number={copy.model.number} label={copy.model.label} />
        <Heading
          as="h2"
          text={copy.model.heading}
          className="mt-6 max-w-[20ch]"
        />

        <MaskLines delay={0.12} className="t-body mt-5 max-w-[50ch]">
          {copy.model.body}
        </MaskLines>

        <StaggerList className="mt-14">
          {copy.model.items.map((row) => (
            <div
              key={row.number}
              className="group grid grid-cols-1 items-start gap-3 py-8 md:grid-cols-12 md:gap-6"
            >
              <span className="t-label md:col-span-1">{row.number}</span>
              <div className="flex items-center gap-2 md:col-span-3">
                <h3 className="t-h3 transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-accent">
                  {row.title}
                </h3>
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="shrink-0 text-accent opacity-0 -translate-x-1 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </div>
              <p className="t-body max-w-[48ch] md:col-span-7 md:col-start-6">
                {row.body}
              </p>
            </div>
          ))}
        </StaggerList>
      </Container>
    </Section>
  );
}
