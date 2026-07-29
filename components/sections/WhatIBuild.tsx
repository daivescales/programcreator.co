import { GraduationCap, Shirt, Users } from "lucide-react";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const builds = [
  {
    icon: Shirt,
    title: "Clothing & Merch",
    body: "A real apparel brand built around your identity. Design, sourcing, storefront, and fulfilment handled end to end.",
  },
  {
    icon: GraduationCap,
    title: "Digital Products",
    body: "Your knowledge packaged into something people pay for. Offer, structure, sales page, and delivery, all built for you.",
  },
  {
    icon: Users,
    title: "Paid Communities",
    body: "Recurring revenue from the access your audience already wants. Platform, tiers, onboarding, and retention set up.",
  },
];

export default function WhatIBuild() {
  return (
    <Section variant="surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What I Build"
            title="Three products. Built properly."
            subtitle="Every build is chosen for your specific audience — not pulled off a template."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {builds.map((build) => {
              const Icon = build.icon;
              return (
                <Card key={build.title} className="flex h-full flex-col items-center">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-base text-sky-500">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{build.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">
                    {build.body}
                  </p>
                </Card>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
