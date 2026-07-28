import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Services",
  description:
    "ProgramCreator builds clothing & merch brands, info products & courses, and paid communities for creators — matched to your audience, not a template.",
};

const offers = [
  {
    title: "Clothing & Merch Brand",
    description:
      "We position a creator's identity into a physical product line. From design direction through production, fulfillment, storefront, and launch — so the merch isn't an afterthought, it's a real brand.",
    included: [
      "Brand and design direction aligned to your audience",
      "Production and fulfillment partner setup",
      "Storefront build and product page structure",
      "Launch strategy and go-to-market support",
    ],
  },
  {
    title: "Info Products & Courses",
    description:
      "We package a creator's expertise into a paid digital product people actually buy. Offer structure, curriculum, sales page, and checkout — built as a complete system, not a half-finished Notion doc.",
    included: [
      "Offer structure and positioning",
      "Curriculum and content build support",
      "Sales page and conversion-focused copy",
      "Checkout and delivery setup",
    ],
  },
  {
    title: "Paid Communities",
    description:
      "We build a recurring-revenue community around a creator's audience. Platform, onboarding, engagement structure, and retention systems — so membership isn't just a group chat with a paywall.",
    included: [
      "Platform selection and setup",
      "Member onboarding flow",
      "Content and engagement structure",
      "Retention systems for recurring revenue",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Section className="!pt-20 sm:!pt-28">
        <Container>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Three Ways We Turn Your Audience Into Revenue
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-800 sm:text-lg">
            ProgramCreator builds one primary product per partner, matched to
            their audience and goals — not a generic template. The right path
            depends on who follows you and what they already trust you for.
          </p>
        </Container>
      </Section>

      <div className="divider" />

      {offers.map((offer, index) => (
        <div key={offer.title}>
          <Section className={index % 2 === 1 ? "bg-gray-100" : ""}>
            <Container>
              <div className="max-w-3xl">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-600">
                  Offer 0{index + 1}
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {offer.title}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-gray-800">
                  {offer.description}
                </p>
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-600">
                    What&apos;s Included
                  </p>
                  <div className="mt-4 space-y-2">
                    {offer.included.map((item) => (
                      <p key={item} className="text-sm leading-relaxed text-black">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </Section>
          {index < offers.length - 1 && <div className="divider" />}
        </div>
      ))}

      <div className="divider" />

      <Section>
        <Container>
          <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            How We Decide What To Build
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-800">
            The right product depends on your audience size, engagement style,
            and goals. That gets determined on the intro call — not before. We
            don&apos;t force a clothing line on someone whose audience wants a
            course, and we don&apos;t build a community where a one-time product
            is the clearer play.
          </p>
        </Container>
      </Section>

      <Section className="bg-black text-white">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Not sure which one fits your audience? Let&apos;s talk it through.
            </h2>
            <Button
              href="/apply"
              className="!bg-white !text-black !border-white hover:!bg-black hover:!text-white hover:!border-white shrink-0"
            >
              Apply Now
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
