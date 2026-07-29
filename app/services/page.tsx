import type { Metadata } from "next";
import FinalCTA from "@/components/sections/FinalCTA";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "What I Build",
  description:
    "Clothing & merch brands, info products & courses, and paid communities — built end-to-end so your audience pays you directly.",
};

const products = [
  {
    id: "clothing",
    number: "01",
    title: "Clothing & Merch Brands",
    paragraphs: [
      "A real apparel brand built on your identity — not a print-on-demand storefront with your face slapped on a hoodie. We treat the line like a business: positioning, design language, product mix, and a launch that your audience actually shows up for.",
      "I handle the unsexy parts that kill most creator merch drops before they start — suppliers, samples, storefront, fulfillment, shipping rules — so you stay focused on the creative decisions that only you can make.",
    ],
    included: [
      "Brand identity and design direction aligned to your audience",
      "Product mix, silhouette selection, and sample rounds",
      "Supplier sourcing and production coordination",
      "Storefront build with product pages structured to convert",
      "Fulfillment, shipping, and returns setup",
      "Drop calendar and launch content plan",
    ],
  },
  {
    id: "info-products",
    number: "02",
    title: "Info Products & Courses",
    paragraphs: [
      "Your expertise, packaged into something people pay for — structured, delivered, and sold properly. We define the offer around what your audience already asks for, then build the curriculum, sales page, and delivery so it feels like a product, not a Notion dump.",
      "I stay in the room through positioning, pricing logic, checkout, and post-purchase delivery. You bring the knowledge. I turn it into a system that can sell without you rebuilding it every month.",
    ],
    included: [
      "Offer positioning, promise, and pricing structure",
      "Curriculum outline and content architecture",
      "Recording and production direction",
      "Sales page and conversion-focused copy",
      "Checkout, payment, and delivery platform setup",
      "Email sequences for launch and onboarding",
    ],
  },
  {
    id: "communities",
    number: "03",
    title: "Paid Communities",
    paragraphs: [
      "Recurring revenue built around the access your audience already wants. A paid community only works when the platform, tiers, onboarding, and weekly rhythm are designed together — not bolted onto a Discord with a Stripe link.",
      "I set up the membership so people know what they're joining, how to get value in week one, and why they stay. Retention is the product. The platform is just the container.",
    ],
    included: [
      "Platform selection and full technical setup",
      "Membership tiers, pricing, and access rules",
      "Member onboarding and welcome flow",
      "Content and engagement calendar",
      "Retention systems and churn checkpoints",
      "Launch sequence to convert your existing audience",
    ],
  },
];

const ladder = [
  { step: "01", label: "Free content", detail: "Trust and attention" },
  { step: "02", label: "Low-ticket", detail: "First paid offer" },
  { step: "03", label: "Community", detail: "Recurring revenue" },
  { step: "04", label: "Physical brand", detail: "Owned product line" },
];

const decisionFactors = [
  {
    title: "Audience size",
    body: "Enough reach to launch, or a smaller list with proof of demand.",
  },
  {
    title: "Engagement type",
    body: "Comments, DMs, saves, and replies tell us what they'll actually buy.",
  },
  {
    title: "Buying intent",
    body: "Whether they already ask for products, access, or advice.",
  },
  {
    title: "Your goals",
    body: "One-time cash, recurring revenue, or a brand you can scale.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        eyebrow="What I Build"
        title="Three products. One goal: your audience pays you directly."
        description="I build one primary product per partner — matched to your audience, not a template. Clothing, digital, or community. The right path depends on who follows you and what they already trust you for."
      />

      {products.map((product, index) => {
        const imageLeft = index % 2 === 0;
        return (
          <Section
            key={product.id}
            id={product.id}
            variant={index % 2 === 1 ? "darker" : "dark"}
          >
            <Container>
              <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <Reveal
                  className={cn(
                    "lg:col-span-5",
                    !imageLeft && "lg:order-2"
                  )}
                >
                  <div className="aspect-[4/5] w-full rounded-xl border border-white/8 bg-navy-800" />
                </Reveal>

                <Reveal
                  delay={0.08}
                  className={cn(
                    "lg:col-span-7",
                    !imageLeft && "lg:order-1"
                  )}
                >
                  <p className="font-display text-sm font-bold tracking-wider text-white/25">
                    {product.number}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">
                    {product.title}
                  </h2>
                  <div className="mt-6 space-y-4">
                    {product.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-relaxed text-mist-300 md:text-lg"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-10">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-500">
                      What&apos;s included
                    </p>
                    <ul className="mt-4">
                      {product.included.map((item) => (
                        <li
                          key={item}
                          className="border-t border-white/8 py-3.5 text-sm leading-relaxed text-mist-100 last:border-b md:text-base"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </Container>
          </Section>
        );
      })}

      <Section id="ecosystem" variant="darker">
        <Container>
          <Reveal>
            <Eyebrow>Beyond One Product</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              The Full Ecosystem
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-300 md:text-lg">
              Some creators want more than one asset. When it makes sense, we
              build a ladder — free content that earns trust, a low-ticket
              product that converts, a community that retains, and a physical
              brand that owns the relationship in the real world.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {ladder.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.08}>
                <div
                  className={cn(
                    "relative border-t border-white/8 px-0 py-8 sm:border-t-0 sm:px-6 sm:py-0",
                    i > 0 && "lg:border-l lg:border-white/8",
                    i === 1 && "sm:border-l sm:border-white/8",
                    i === 3 && "sm:border-l sm:border-white/8 lg:border-l"
                  )}
                >
                  <span className="font-display text-sm font-bold tracking-wider text-azure-400">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm text-mist-500">{item.detail}</p>
                  {i < ladder.length - 1 ? (
                    <span
                      className="absolute right-0 top-1/2 hidden h-px w-4 -translate-y-1/2 translate-x-1/2 bg-azure-500/50 lg:block"
                      aria-hidden
                    />
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <Eyebrow>The Decision</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              How I decide what to build for you
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-300 md:text-lg">
              The right product is determined in the audit — not guessed on the
              application. I look at your audience size, how they engage, what
              buying intent already shows up, and what you actually want to own.
              Then we pick the one with the highest chance of selling.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {decisionFactors.map((factor, i) => (
              <Reveal key={factor.title} delay={i * 0.06}>
                <div className="border-t border-white/8 pt-6">
                  <h3 className="font-display text-lg font-bold text-white">
                    {factor.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-300">
                    {factor.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
