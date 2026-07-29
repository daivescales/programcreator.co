import {
  Code,
  GraduationCap,
  Layers,
  Shirt,
  Store,
  Users,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const builds = [
  {
    icon: Code,
    title: "Software & Tools",
    body: "An app, platform, or tool your audience needs. The kind of product that keeps earning after launch.",
  },
  {
    icon: GraduationCap,
    title: "Courses & Info Products",
    body: "What you know, packaged properly, priced correctly, and sold without you having to be a marketer.",
  },
  {
    icon: Users,
    title: "Communities & Memberships",
    body: "Recurring revenue from the access people already want from you.",
  },
  {
    icon: Shirt,
    title: "Physical Products & Merch",
    body: "A real product line built around your identity. Design, sourcing, storefront, and fulfilment handled.",
  },
  {
    icon: Store,
    title: "Local & In-Person Businesses",
    body: "Turning followers into bookings, walk-ins, and repeat customers for a business that operates offline.",
  },
  {
    icon: Layers,
    title: "Full Product Ecosystems",
    body: "More than one offer, sequenced so each one feeds the next instead of competing with it.",
  },
];

export default function WhatIBuild() {
  return (
    <Section id="build" variant="base">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What I Build"
            title="Whatever your audience will actually buy."
            subtitle="This isn't one product on repeat. I look at who follows you and what they want, then build the thing that fits — online or in person."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {builds.map((build) => {
              const Icon = build.icon;
              return (
                <Card
                  key={build.title}
                  className="flex h-full flex-col items-center"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-base text-sky-500">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {build.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">
                    {build.body}
                  </p>
                </Card>
              );
            })}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-base text-text-muted">
            Not sure which one fits your audience? That&apos;s the first thing we
            work out on the call.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
