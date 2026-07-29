import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const points = [
  {
    title: "Done with you, not sold to you",
    body: "I build it. You stay involved on the decisions that need your taste and your voice.",
  },
  {
    title: "You own everything",
    body: "The brand, the audience, and every asset we build stays 100% yours.",
  },
  {
    title: "A short client list",
    body: "I only take on a few partners at a time so every build gets real attention.",
  },
];

export default function WhyMe() {
  return (
    <Section variant="surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Work With Me"
            title="You're not buying a course. You're getting me in the build."
          />
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
            Most people in this space will sell you a program and leave you to
            figure out the hard part alone. I do the opposite. I take on a small
            number of creators and brands at a time and build the product myself,
            alongside you, so it&apos;s done to a professional standard the first
            time.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {points.map((point) => (
              <div key={point.title} className="flex flex-col items-center">
                <Check className="mb-4 text-sky-500" size={20} strokeWidth={2.5} />
                <h3 className="text-lg font-semibold text-white">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button href="/about" variant="secondary">
              More about Daive
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
