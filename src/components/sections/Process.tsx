import { MaskLines, Reveal } from "@/components/motion";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";

const steps = [
  {
    number: "01",
    title: "You apply",
    body: "Three minutes. It asks what you sell, who follows you, and what is currently broken.",
  },
  {
    number: "02",
    title: "I read it",
    body: "I read every application myself. If I think I can move the number, I reach out and we book a call.",
  },
  {
    number: "03",
    title: "I build",
    body: "Product, page and funnel depending on your lane. You review at two checkpoints. I handle the rest so you can keep making content.",
  },
  {
    number: "04",
    title: "I scale it",
    body: "It goes live and I drive your audience into it, then keep tightening the offer against what the data actually says.",
  },
] as const;

export default function Process() {
  return (
    <Section id="process" tone="750">
      <SectionLabel number="03" label="How it works" />

      <Heading
        as="h2"
        text="From application to first sale."
        className="mt-6 max-w-[14ch]"
      />

      <MaskLines delay={0.12} className="t-body mt-5 max-w-[52ch]">
        Four steps. Two to four weeks depending on the lane.
      </MaskLines>

      <div className="mt-14 hidden gap-10 md:grid md:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal key={step.number} delay={0.08 * index}>
            <article>
              <p className="t-label text-accent">{step.number}</p>
              <h3 className="t-h3 mt-3">{step.title}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.65] text-pc-text">
                {step.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <ol className="mt-14 space-y-10 md:hidden">
        {steps.map((step) => (
          <li key={step.number}>
            <p className="t-label text-accent">{step.number}</p>
            <h3 className="t-h3 mt-2">{step.title}</h3>
            <p className="mt-2.5 max-w-[46ch] text-[15px] leading-[1.65] text-pc-text">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
