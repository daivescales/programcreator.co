import type { Metadata } from "next";
import FAQCategories from "@/components/faq/FAQCategories";
import FinalCTA from "@/components/sections/FinalCTA";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { faqCategories } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Straight answers on working with ProgramCreator — fit, what gets built, timelines, ownership, investment, and what happens after you apply.",
};

export default function FAQPage() {
  return (
    <>
      <Section className="!pt-24 md:!pt-32 !pb-12 md:!pb-16">
        <Container>
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold tracking-[-0.04em] text-white md:text-6xl lg:text-7xl">
              Questions, answered properly.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-300 md:text-lg">
              Fit, scope, timelines, money, and ownership — without the vague
              marketing answers. If something still is not clear after this, the
              application is the fastest way to get a direct reply.
            </p>
          </Reveal>
        </Container>
      </Section>

      <FAQCategories categories={faqCategories} />

      <FinalCTA />
    </>
  );
}
