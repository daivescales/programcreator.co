import type { Metadata } from "next";
import FinalCTA from "@/components/sections/FinalCTA";
import FounderPortrait from "@/components/sections/FounderPortrait";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "I'm not teaching this from the sidelines. ProgramCreator is a done-with-you build partner for creators who have an audience and need a real product business.",
};

const principles = [
  {
    title: "Small client list, real attention",
    body: "I take on a limited number of partners so the work stays hands-on and the standard stays high.",
  },
  {
    title: "You own everything we build",
    body: "The brand, the storefront, the community, the assets — 100% yours. No equity grab, no hostage IP.",
  },
  {
    title: "Honest answers on the call, even when it's no",
    body: "If it's not worth building, I'll say so. A bad fit costs both of us more than a polite yes.",
  },
  {
    title: "Built to sell, not built to look good",
    body: "Every decision is measured against whether your audience will pay — not whether it photographs well.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        eyebrow="The Operator"
        title="I'm not teaching this from the sidelines."
        description="ProgramCreator exists because creators keep getting sold courses about building products — and leave with slides instead of assets."
      />

      <Section>
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <FounderPortrait />
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-7">
              <div className="space-y-6 text-base leading-relaxed text-mist-300 md:text-lg">
                <p>
                  I&apos;m [YOUR NAME]. I run ProgramCreator — a done-with-you
                  build partner for creators and brand owners who already have
                  attention and need a real product business attached to it.
                </p>
                <p>
                  [YOUR BACKGROUND]. [WHAT YOU&apos;VE BUILT]. I work directly
                  with a small number of partners at a time, taking them from
                  idea to launched product — clothing, info products, or paid
                  communities.
                </p>
                <p>
                  Most creators have an audience and no assets. Brand deals pay
                  once. Advice without execution leaves you with a Notion doc and
                  the same problem. I started ProgramCreator to close that gap:
                  I do the building alongside you, not a curriculum about how to
                  figure it out alone.
                </p>
                <p>
                  What&apos;s different is simple. I&apos;m in the build — systems,
                  storefronts, suppliers, delivery, launch. You stay in the room
                  for the decisions only you can make. I take on a small number
                  of partners so the work stays personal and the product that
                  ships is something you actually own.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section variant="darker">
        <Container>
          <Reveal>
            <Eyebrow>How I Work</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              Four principles. No soft edges.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {principles.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="border-t border-white/8 pt-6">
                  <p className="font-display text-sm font-bold tracking-wider text-azure-400">
                    0{i + 1}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-mist-300">
                    {item.body}
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
