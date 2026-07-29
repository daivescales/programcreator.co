import { GraduationCap, Shirt, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

const builds = [
  {
    number: "01",
    title: "Clothing & Merch Brands",
    icon: Shirt,
    description:
      "A real apparel brand built on your identity — not a print-on-demand storefront with your face slapped on a hoodie.",
    includes: [
      "Brand direction and design",
      "Sample and supplier sourcing",
      "Storefront build",
      "Fulfillment and shipping setup",
      "Drop and launch strategy",
    ],
  },
  {
    number: "02",
    title: "Info Products & Courses",
    icon: GraduationCap,
    description:
      "Your expertise, packaged into something people pay for — structured, delivered, and sold properly.",
    includes: [
      "Offer positioning and pricing",
      "Curriculum and content structure",
      "Recording and production direction",
      "Sales page and checkout",
      "Delivery platform setup",
    ],
  },
  {
    number: "03",
    title: "Paid Communities",
    icon: Users,
    description:
      "Recurring revenue built around the access your audience already wants.",
    includes: [
      "Platform selection and setup",
      "Membership tiers and pricing",
      "Onboarding and welcome flow",
      "Content and engagement calendar",
      "Retention systems",
    ],
  },
];

export default function WhatIBuild() {
  return (
    <Section>
      <Container>
        <Reveal>
          <Eyebrow>The Builds</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.03em] text-white md:text-6xl">
            Three ways to turn an audience into a business.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {builds.map((build, i) => {
            const Icon = build.icon;
            return (
              <Reveal key={build.number} delay={i * 0.08}>
                <Card className="h-full">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-800 text-azure-400">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <span className="text-sm text-mist-700">{build.number}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                    {build.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-300">
                    {build.description}
                  </p>
                  <div className="mt-6 space-y-2 border-t border-white/8 pt-5">
                    {build.includes.map((item) => (
                      <p key={item} className="text-sm text-mist-300">
                        {item}
                      </p>
                    ))}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <Card className="mt-6" hover={false}>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                  Not sure which one fits?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist-300 md:text-base">
                  Most creators guess wrong. That&apos;s what the call is for —
                  we look at your audience and pick the one with the highest
                  chance of actually selling.
                </p>
              </div>
              <Button href="/apply" variant="secondary" className="shrink-0">
                Apply and find out
              </Button>
            </div>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}
