import { MaskLines, Reveal } from "@/components/motion";
import Heading from "@/components/ui/Heading";
import Spine from "@/components/ui/Spine";

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
    <Spine
      id="process"
      number="03"
      label="HOW IT WORKS"
      className="border-t border-pc-line py-28 md:py-36"
    >
      <Heading
        as="h2"
        text="From application to first sale."
        className="max-w-[14ch]"
      />

      <MaskLines
        delay={0.12}
        className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-pc-text"
      >
        Four steps. Two to four weeks depending on the lane.
      </MaskLines>

      <div className="mt-14 hidden border-t border-pc-line md:block">
        <div className="grid grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={0.08 * index}>
              <article
                className={`group h-full p-7 transition-colors duration-[200ms] hover:bg-white/[0.02] ${
                  index > 0 ? "border-l border-pc-line" : ""
                }`}
              >
                <p className="text-[clamp(2.5rem,4vw,3.5rem)] font-semibold tracking-[-0.04em] text-accent opacity-30 transition-opacity duration-[200ms] group-hover:opacity-[0.65]">
                  {step.number}
                </p>
                <h3 className="mt-4 text-[clamp(1.15rem,1.9vw,1.5rem)] font-semibold tracking-[-0.035em] text-pc-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-pc-text">
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <ol className="relative mt-14 space-y-0 border-l border-pc-line md:hidden">
        {steps.map((step) => (
          <li key={step.number} className="relative py-7 pl-8">
            <span className="absolute top-8 -left-px h-8 w-px bg-accent/40" />
            <p className="text-[13px] text-accent">{step.number}</p>
            <h3 className="mt-2 text-[clamp(1.15rem,1.9vw,1.5rem)] font-semibold tracking-[-0.035em] text-pc-white">
              {step.title}
            </h3>
            <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.6] text-pc-text">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Spine>
  );
}
