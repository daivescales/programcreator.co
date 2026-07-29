import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

const mostSell = [
  "A curriculum and a Discord",
  "Templates you have to implement alone",
  "Advice with no execution",
  "You do 100% of the work",
  "Support ends when the program does",
];

const whatIDo = [
  "I build the product with you",
  "I set up the systems myself",
  "Decisions made on your real numbers",
  "You stay in the room, you learn it by doing",
  "I'm there through the launch, not just the plan",
];

export default function Difference() {
  return (
    <Section variant="light">
      <Container>
        <Reveal>
          <Eyebrow light>The Difference</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.03em] text-ink md:text-6xl">
            This isn&apos;t a course. I&apos;m in the build with you.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-0">
          <Reveal>
            <div className="md:pr-10">
              <h3 className="font-display text-xl font-bold text-ink">
                What most people sell you
              </h3>
              <ul className="mt-6 space-y-4">
                {mostSell.map((item) => (
                  <li key={item} className="text-base text-navy-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border-t border-navy-800/10 pt-10 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <h3 className="font-display text-xl font-bold text-ink">
                What I actually do
              </h3>
              <ul className="mt-6 space-y-4">
                {whatIDo.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-ink">
                    <Check
                      size={16}
                      className="mt-1 shrink-0 text-azure-600"
                      strokeWidth={2.5}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-14 text-center font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            You keep the brand. You keep the audience. You keep 100% of the
            ownership.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
