import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "ProgramCreator is an agency built for creators and brand owners who have an audience but haven't turned it into a real product-based business yet.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="!pt-20 sm:!pt-28">
        <Container>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Built by someone who scales creators for a living.
          </h1>

          <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-gray-800 sm:text-lg">
            <p>
              I&apos;m [YOUR NAME]. I run ProgramCreator, an agency built
              specifically for creators and brand owners who have an audience but
              haven&apos;t turned it into a real product-based business yet.
            </p>
            <p>
              [YOUR BACKGROUND/CREDIBILITY DETAIL]. I work directly with a small
              number of partners at a time — taking them from idea to launched
              product, whether that&apos;s a clothing brand, an info product, or
              a paid community.
            </p>
            <p>
              I stay hands-on through the build. This isn&apos;t a course about
              how to figure it out yourself. It&apos;s a done-for-you partnership
              designed to leave you with a real business asset attached to the
              audience you already built.
            </p>
          </div>
        </Container>
      </Section>

      <div className="divider" />

      <Section>
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-600">
            How I Work
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            A build partnership, not a freelance gig.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-800">
            It starts with an intro call to evaluate fit — your audience, your
            goals, and whether a product business makes sense right now. If it
            does, we move into a build partnership: clear scope, hands-on
            execution, and a launched product you own. I take on a limited number
            of partners so the work stays focused and the standard stays high.
          </p>
        </Container>
      </Section>

      <Section className="bg-black text-white">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Think we&apos;d be a good fit?
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
