import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Apply",
    body: "Answer ten quick questions about your brand and audience.",
  },
  {
    number: "02",
    title: "Call",
    body: "We talk it through and I tell you honestly what I'd build.",
  },
  {
    number: "03",
    title: "Build",
    body: "I build the product and the systems behind it, with you in every decision.",
  },
  {
    number: "04",
    title: "Launch",
    body: "We launch to your audience together and scale what works.",
  },
];

export default function HowItWorks() {
  return (
    <Section id="how" variant="base">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The Process"
            title="Four steps. No guesswork."
          />
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`px-4 ${
                  index < steps.length - 1
                    ? "md:border-r md:border-line"
                    : ""
                }`}
              >
                <p className="text-sm font-semibold text-sky-500">{step.number}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
