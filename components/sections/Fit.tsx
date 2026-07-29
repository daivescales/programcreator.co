import { Check, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

const forYou = [
  "You have an engaged audience, at any size, that trusts you",
  "You're tired of brand deals being your only income",
  "You want to own a product, not rent your attention out",
  "You can be involved in the build, not disappear for three months",
  "You're ready to invest in doing it properly the first time",
];

const notForYou = [
  "You want passive income with zero involvement",
  "You're looking for a course to watch on your own time",
  "You want the cheapest possible option",
  "You're not willing to sell to your own audience",
  "You expect results without a launch",
];

export default function Fit() {
  return (
    <Section variant="darker">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:gap-0">
          <Reveal>
            <div className="md:pr-10">
              <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                This is for you if
              </h2>
              <ul className="mt-8 space-y-4">
                {forYou.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-mist-300">
                    <Check
                      size={16}
                      className="mt-1 shrink-0 text-azure-400"
                      strokeWidth={2.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border-t border-white/8 pt-10 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                This isn&apos;t for you if
              </h2>
              <ul className="mt-8 space-y-4">
                {notForYou.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-mist-300">
                    <X
                      size={16}
                      className="mt-1 shrink-0 text-mist-700"
                      strokeWidth={2.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-col items-center gap-5 text-center">
            <p className="text-mist-300">
              If the left column sounds like you, apply below.
            </p>
            <Button href="/apply" size="lg">
              Apply Now
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
