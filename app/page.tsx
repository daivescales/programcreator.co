import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "ProgramCreator | Turn Your Audience Into a Real Product Business",
  description:
    "ProgramCreator partners with creators and brand owners to turn an engaged audience into a clothing line, digital product, or paid community — done-for-you.",
};

const steps = [
  {
    number: "01",
    title: "We Find The Fit",
    description:
      "A short call to see if it makes sense — audience, goals, and whether a product business is the right next move.",
  },
  {
    number: "02",
    title: "We Build The Product",
    description:
      "Store, info product, or community — built end-to-end so you don't have to figure out operations, fulfillment, or tech.",
  },
  {
    number: "03",
    title: "You Own The Upside",
    description:
      "Ongoing revenue from a real business asset, not just content. You keep the brand, the audience relationship, and the upside.",
  },
];

const offerings = [
  {
    title: "Clothing & Merch Brand",
    description:
      "Turn your identity into a physical product line — design, production, storefront, and launch, handled end-to-end.",
  },
  {
    title: "Info Products & Courses",
    description:
      "Package your expertise into a paid digital offer with structure, sales page, and delivery systems that convert.",
  },
  {
    title: "Paid Communities",
    description:
      "Build a recurring-revenue community around your audience with onboarding, engagement, and retention built in.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section className="grain !pt-20 sm:!pt-28">
        <Container>
          <Badge>For Creators & Brand Owners</Badge>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            You built the audience. We build what they buy.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-gray-800 sm:text-lg">
            ProgramCreator partners with creators and brand owners to turn an
            engaged audience into a second revenue stream — a clothing line, a
            digital product, or a paid community — without you having to figure
            out the operations, fulfillment, or tech.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/apply">Apply to Work With Us</Button>
            <Button href="/services" variant="secondary">
              See What We Build
            </Button>
          </div>
        </Container>
      </Section>

      <div className="divider" />

      {/* The Model */}
      <Section>
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-600">
            The Model
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Creator Product Scaling
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-800">
            We identify creators and brand owners with an underused audience,
            then build the highest-leverage product for that specific audience —
            done-for-you. One primary product. Built to last.
          </p>

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step) => (
              <div key={step.number} className="border-t border-black pt-6">
                <p className="font-display text-sm font-bold tracking-[0.2em] text-gray-500">
                  {step.number}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-800">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <div className="divider" />

      {/* What We Build */}
      <Section>
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-600">
            What We Build
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Three product paths. One done-for-you build.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {offerings.map((offer) => (
              <Link
                key={offer.title}
                href="/services"
                className="group border border-black p-6 transition-colors hover:bg-black hover:text-white sm:p-8"
              >
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {offer.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-800 group-hover:text-gray-200">
                  {offer.description}
                </p>
                <p className="mt-6 text-xs font-medium uppercase tracking-[0.15em]">
                  Learn more →
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <div className="divider" />

      {/* Who This Is For */}
      <Section>
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-600">
            Who This Is For
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Built for audience owners ready for a real product business.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-800">
            Ideal partners are creators or brand owners with an existing engaged
            audience who want a product-based revenue stream — not another brand
            deal. If you have people who already trust you, and you want a
            clothing line, digital product, or community built around that trust,
            this is for you.
          </p>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="bg-black text-white">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to see if you&apos;re a fit?
            </h2>
            <Button
              href="/apply"
              className="!bg-white !text-black !border-white hover:!bg-black hover:!text-white hover:!border-white"
            >
              Apply Now
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
