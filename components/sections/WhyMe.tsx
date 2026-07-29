import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const points = [
  {
    title: "Built by an operator",
    body: "I've shipped my own product to my own audience. I'm not guessing at this.",
  },
  {
    title: "You own everything",
    body: "The brand, the audience, and every asset we build stays 100% yours.",
  },
  {
    title: "A short client list",
    body: "I take on a few partners at a time so every build gets real attention.",
  },
];

export default function WhyMe() {
  return (
    <Section variant="base">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Work With Me"
            title="I built this for myself first."
          />
          <div className="mx-auto mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-text-muted md:text-lg">
            <p>
              I built Clipora — an AI platform I created off the back of my own
              YouTube channel, with my own process built into it, made to help
              YouTubers grow faster and get more out of what they were already
              posting. I scaled my personal brand, then turned what I knew into a
              product that served the exact audience I understood.
            </p>
            <p>
              ProgramCreator is me doing that for other people. Not teaching it,
              not selling a course on it — actually building it, to prove that
              what worked for me works for anybody with an audience and something
              worth selling.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {points.map((point) => (
              <div key={point.title} className="flex flex-col items-center">
                <Check
                  className="mb-4 text-sky-500"
                  size={20}
                  strokeWidth={2.5}
                />
                <h3 className="text-lg font-semibold text-white">
                  {point.title}
                </h3>
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
