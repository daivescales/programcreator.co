import { HandCircle } from "@/components/marks";
import { MaskLines, Reveal } from "@/components/motion";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";

const steps = [
  {
    number: "01",
    title: "You apply",
    body: "Three minutes. It asks what you sell, who follows you, and what is currently broken.",
    circled: false,
  },
  {
    number: "02",
    title: "I read it",
    body: "I read every application myself. If I think I can move the number, I reach out and we book a call.",
    circled: true,
  },
  {
    number: "03",
    title: "I build",
    body: "Product, page and funnel depending on your lane. You review at two checkpoints. I handle the rest so you can keep making content.",
    circled: false,
  },
  {
    number: "04",
    title: "I scale it",
    body: "It goes live and I drive your audience into it, then keep tightening the offer against what the data actually says.",
    circled: false,
  },
] as const;

export default function Process() {
  return (
    <Section id="process" tone="750" className="scroll-mt-section">
      <SectionLabel number="03" label="How it works" />

      <Heading
        as="h2"
        text="From application to first sale."
        className="mt-6 max-w-[14ch]"
      />

      <MaskLines
        delay={0.12}
        className="mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-pc-text"
      >
        Four steps. Two to four weeks depending on the lane.
      </MaskLines>

      <div className="mt-14 hidden gap-10 md:grid md:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal key={step.number} delay={0.08 * index}>
            <article className="group h-full">
              <p className="text-[clamp(2rem,3vw,2.75rem)] font-semibold tracking-[-0.04em] text-accent opacity-35 transition-opacity duration-[200ms] group-hover:opacity-70">
                {step.circled ? (
                  <HandCircle variant={1}>{step.number}</HandCircle>
                ) : (
                  step.number
                )}
              </p>
              <h3 className="mt-4 text-[clamp(1.15rem,1.9vw,1.5rem)] font-semibold tracking-[-0.035em] text-pc-white">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-pc-text">
                {step.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <ol className="mt-14 space-y-10 md:hidden">
        {steps.map((step) => (
          <li key={step.number}>
            <p className="text-[13px] text-accent">
              {step.circled ? (
                <HandCircle variant={1}>{step.number}</HandCircle>
              ) : (
                step.number
              )}
            </p>
            <h3 className="mt-2 text-[clamp(1.15rem,1.9vw,1.5rem)] font-semibold tracking-[-0.035em] text-pc-white">
              {step.title}
            </h3>
            <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.65] text-pc-text">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
