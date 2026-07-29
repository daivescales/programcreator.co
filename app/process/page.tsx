import type { Metadata } from "next";
import FinalCTA from "@/components/sections/FinalCTA";
import PageHero from "@/components/sections/PageHero";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "From application to launch — the exact stages of a ProgramCreator build partnership, and what I need from you along the way.",
};

const needs = [
  {
    title: "Platform access",
    body: "Access to your platforms and numbers so decisions are based on real data, not guesses.",
  },
  {
    title: "Weekly session",
    body: "Availability for a weekly working session — short, focused, and decision-heavy.",
  },
  {
    title: "48-hour decisions",
    body: "Decisions made within 48 hours so the build doesn't stall on approvals.",
  },
  {
    title: "Launch content",
    body: "Showing up for the launch content. The product needs your audience to hear from you.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        label="Process"
        eyebrow="How It Works"
        title="From application to launch, here's exactly what happens."
        description="No mystery process. Six clear stages from the first application to ongoing scale — with honest calls, a real audit, and a hands-on build."
      />

      <Section>
        <Container>
          <Reveal>
            <Eyebrow>The Stages</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              Clear steps. Real timelines.
            </h2>
          </Reveal>
          <div className="mt-14 max-w-3xl">
            <ProcessTimeline />
          </div>
        </Container>
      </Section>

      <Section variant="darker">
        <Container>
          <Reveal>
            <Eyebrow>Your Side</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              What I need from you
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-300 md:text-lg">
              I do the build. You stay in the room for the decisions only you
              can make. These four things keep the partnership moving.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {needs.map((item, i) => (
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
