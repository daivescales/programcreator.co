import type { Metadata } from "next";
import Image from "next/image";
import FinalCTA from "@/components/sections/FinalCTA";
import PageHero from "@/components/sections/PageHero";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Stat from "@/components/ui/Stat";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Case studies and outcomes from ProgramCreator build partnerships — real products launched with creators and brand owners.",
};

// IMPORTANT: Keep HAS_RESULTS false until you have real case studies. Never publish fake proof.
const HAS_RESULTS = false;

// TODO: replace with real case studies before setting HAS_RESULTS to true
const caseStudies = [
  {
    category: "Clothing Brand",
    handle: "@[HANDLE]",
    headline: "[RESULT HEADLINE]",
    body: "[Short paragraph describing the partnership outcome. Replace before launch.]",
    image: "/case-study-1.png",
  },
  {
    category: "Info Product",
    handle: "@[HANDLE]",
    headline: "[RESULT HEADLINE]",
    body: "[Short paragraph describing the partnership outcome. Replace before launch.]",
    image: "/case-study-2.png",
  },
  {
    category: "Paid Community",
    handle: "@[HANDLE]",
    headline: "[RESULT HEADLINE]",
    body: "[Short paragraph describing the partnership outcome. Replace before launch.]",
    image: "/case-study-1.png",
  },
];

// TODO: replace with real testimonials before setting HAS_RESULTS to true
const testimonials = [
  {
    quote:
      "[Placeholder quote about the build partnership and what changed after launch.]",
    name: "[NAME]",
    handle: "@[HANDLE]",
    product: "[Product built]",
  },
  {
    quote:
      "[Placeholder quote about working together through the audit, build, and launch.]",
    name: "[NAME]",
    handle: "@[HANDLE]",
    product: "[Product built]",
  },
  {
    quote:
      "[Placeholder quote about ownership, results, and the hands-on process.]",
    name: "[NAME]",
    handle: "@[HANDLE]",
    product: "[Product built]",
  },
];

export default function ResultsPage() {
  if (!HAS_RESULTS) {
    return (
      <>
        <PageHero
          label="Results"
          eyebrow="Proof"
          title="Case studies coming soon."
          description="Partner work is in progress. When real outcomes are ready to share, they'll live here — no fabricated numbers, no borrowed screenshots. If you want to be part of the next build, apply below."
        />
        <FinalCTA />
      </>
    );
  }

  return (
    <>
      <PageHero
        label="Results"
        eyebrow="Proof"
        title="The work speaks before I do."
        description="Real products launched with creators and brand owners. Every number and story below is from a completed partnership."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {/* TODO: replace placeholder stats with real numbers */}
            <Reveal>
              <Stat value="[X]+" label="Creators Partnered" />
            </Reveal>
            <Reveal delay={0.05}>
              <Stat value="[X]" label="Products Launched" />
            </Reveal>
            <Reveal delay={0.1}>
              <Stat value="$[X]" label="Generated For Partners" />
            </Reveal>
            <Reveal delay={0.15}>
              <Stat value="[X]" label="Day Average Build" />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section variant="darker">
        <Container>
          <Reveal>
            <Eyebrow>Case Studies</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              What we built together.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* TODO: replace with real case studies */}
            {caseStudies.map((study, i) => (
              <Reveal key={study.category} delay={i * 0.08}>
                <Card className="h-full overflow-hidden p-0">
                  <div className="relative aspect-[16/10] bg-navy-800">
                    <Image
                      src={study.image}
                      alt={`${study.category} case study placeholder`}
                      fill
                      className="object-cover opacity-60"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3">
                      <span className="rounded-md border border-azure-500/40 px-2 py-0.5 text-xs uppercase tracking-wider text-azure-400">
                        {study.category}
                      </span>
                      <span className="text-sm text-mist-500">
                        {study.handle}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold text-white">
                      {study.headline}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist-300">
                      {study.body}
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <Eyebrow>From Partners</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              In their words.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* TODO: replace with real testimonials */}
            {testimonials.map((item, i) => (
              <Reveal key={item.name + i} delay={i * 0.08}>
                <Card className="h-full" hover={false}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-800 text-sm text-mist-500">
                    {/* Avatar placeholder */}
                  </div>
                  <blockquote className="mt-6 text-base leading-relaxed text-mist-100">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 border-t border-white/8 pt-5">
                    <p className="font-display text-sm font-bold text-white">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-mist-500">
                      {item.handle} · {item.product}
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
