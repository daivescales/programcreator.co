import type { Metadata } from "next";
import Accordion from "@/components/ui/Accordion";
import Container from "@/components/ui/Container";
import FinalCTA from "@/components/sections/FinalCTA";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { faqCategories } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about working with Daive at ProgramCreator — fit, process, ownership, and how the build works.",
};

export default function FAQPage() {
  return (
    <>
      <Section variant="base" className="!pt-28 md:!pt-36 !pb-12 md:!pb-16">
        <Container>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-500">
              FAQ
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Questions, answered.
            </h1>
          </Reveal>
        </Container>
      </Section>

      {faqCategories.map((category, index) => (
        <Section
          key={category.title}
          variant={index % 2 === 0 ? "surface" : "base"}
          className="!py-16 md:!py-20"
        >
          <Container>
            <Reveal>
              <h2 className="text-xl font-semibold text-white md:text-2xl">
                {category.title}
              </h2>
              <div className="mx-auto mt-8 max-w-3xl">
                <Accordion items={category.items} />
              </div>
            </Reveal>
          </Container>
        </Section>
      ))}

      <FinalCTA />
    </>
  );
}
