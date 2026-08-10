import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "You apply",
    body: "Fill in the application. It takes about three minutes and asks the things I actually need to know: what you sell, who follows you, and what's currently broken.",
  },
  {
    number: "02",
    title: "We get on a call",
    body: "Twenty minutes, no deck, no pressure. I tell you straight whether I can move the number and what I'd do first. If it's not a fit, I'll say so.",
  },
  {
    number: "03",
    title: "I build",
    body: "Product, page, funnel — depending on your lane. You review at two checkpoints. I handle everything else, so you keep making content.",
  },
  {
    number: "04",
    title: "We scale it",
    body: "It goes live and we drive your audience into it. Then we keep tightening the page and the offer against real data.",
  },
] as const;

export default function Process() {
  return (
    <Section id="how" tint>
      <Container>
        <Reveal>
          <SectionHeading
            center
            eyebrow="The process"
            title="From first message to first sale"
            subtitle="Four steps. Roughly two to four weeks depending on the lane."
          />
        </Reveal>

        <Reveal delay={0.08}>
          {/* Desktop horizontal */}
          <div className="relative mt-14 hidden md:block">
            <div
              aria-hidden
              className="absolute top-6 right-[12.5%] left-[12.5%] h-px bg-pc-line"
            />
            <ol className="grid grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                return (
                  <li key={step.number} className="relative flex flex-col items-center text-center">
                    <span
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold ${
                        isLast
                          ? "bg-pc-blue text-white"
                          : "border border-pc-line bg-pc-white text-pc-blue"
                      }`}
                    >
                      {step.number}
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-pc-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-pc-body">
                      {step.body}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Mobile vertical */}
          <ol className="relative mt-12 space-y-8 pl-2 md:hidden">
            <div
              aria-hidden
              className="absolute top-3 bottom-3 left-[23px] w-px bg-pc-line"
            />
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              return (
                <li key={step.number} className="relative flex gap-4">
                  <span
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      isLast
                        ? "bg-pc-blue text-white"
                        : "border border-pc-line bg-pc-white text-pc-blue"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div className="pt-2">
                    <h3 className="text-lg font-semibold tracking-tight text-pc-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-pc-body">
                      {step.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
