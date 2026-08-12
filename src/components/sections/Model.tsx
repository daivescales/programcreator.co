"use client";

import { MaskLines, StaggerList } from "@/components/motion";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";

const rows = [
  {
    number: "01",
    title: "Build the offer",
    body: "A digital product your audience has already told you they want. Positioned, priced and packaged, ready to sell.",
  },
  {
    number: "02",
    title: "Rebuild the page",
    body: "The page where the money is actually made. Real copy, real structure, and a checkout that does not lose people on mobile.",
  },
  {
    number: "03",
    title: "Scale it through your socials",
    body: "Hooks and funnel paths that route the attention you already have into the product, then I keep tightening it against live data.",
  },
] as const;

export default function Model() {
  return (
    <Section id="model" tone="750" contain={false}>
      <Container>
        <SectionLabel number="01" label="What I do" />
        <Heading
          as="h2"
          text="You don't have a traffic problem. You have an *offer* problem."
          className="mt-6 max-w-[20ch]"
        />

        <MaskLines delay={0.12} className="t-body mt-5 max-w-[50ch]">
          {
            "You are already getting attention. Creator Product Scaling fixes what that attention lands on."
          }
        </MaskLines>

        <StaggerList className="mt-14">
          {rows.map((row) => (
            <div
              key={row.number}
              className="group grid grid-cols-1 items-start gap-3 py-8 md:grid-cols-12 md:gap-6"
            >
              <span className="text-[13px] text-accent md:col-span-1">
                {row.number}
              </span>
              <h3 className="t-h3 transition-[color,transform] duration-[180ms] group-hover:translate-x-[3px] group-hover:text-accent md:col-span-3">
                {row.title}
              </h3>
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
