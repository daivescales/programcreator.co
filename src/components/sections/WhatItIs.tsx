import { LayoutTemplate, Package, TrendingUp } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const cards = [
  {
    icon: Package,
    title: "Build the offer",
    body: "A digital product your audience is already asking for. Course, program, template pack, membership, coaching container — whichever one your content proves demand for. Positioned, priced, and packaged.",
  },
  {
    icon: LayoutTemplate,
    title: "Rebuild the page",
    body: "The page where the money is actually made. Rewritten copy, real structure, checkout that doesn't leak, and a design that matches the brand you've spent years building.",
  },
  {
    icon: TrendingUp,
    title: "Scale it through your socials",
    body: "Content angles, hooks, and funnel paths that route your existing attention into the product. We keep iterating on the page as the data comes in.",
  },
] as const;

export default function WhatItIs() {
  return (
    <Section id="what" tint>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The model"
            title="Creator Product Scaling"
            subtitle="Most creators and brands don't have a traffic problem. They have an offer problem. Creator Product Scaling fixes what people land on — then feeds it with the attention you're already generating."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={0.06 * index}>
                <div className="h-full rounded-xl border border-pc-line bg-pc-white p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-pc-blue-300">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[12px] bg-pc-blue-50 text-pc-blue">
                    <Icon size={22} strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-pc-ink">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-pc-body">
                    {card.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
