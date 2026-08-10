import { MaskLines, Reveal } from "@/components/motion";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionNumber from "@/components/ui/SectionNumber";

const cells = [
  {
    number: "01",
    title: "Build the offer",
    body: "A digital product your audience has already told you they want — course, program, template pack, membership, coaching container. Positioned, priced, packaged, and ready to sell.",
  },
  {
    number: "02",
    title: "Rebuild the page",
    body: "The page where the money is actually made. Rewritten copy, real hierarchy, a checkout that doesn't leak on mobile, and a design that matches the brand you spent years building.",
  },
  {
    number: "03",
    title: "Scale through your socials",
    body: "Hooks, angles and funnel paths that route the attention you already have into the product — then we keep iterating on the page against live data.",
  },
] as const;

export default function Model() {
  return (
    <Section id="model" bordered className="scroll-mt-section">
      <Container>
        <SectionNumber number="01" label="The Model" />

        <Heading
          as="h2"
          text="Most brands don't have a traffic problem. They have an *offer problem*."
          className="mt-8 max-w-[18ch]"
        />

        <MaskLines
          delay={0.12}
          className="mt-6 max-w-[58ch] text-lg leading-[1.65] text-pc-text"
        >
          {"You're already generating attention. Creator Product Scaling fixes what that attention lands on — then keeps feeding it."}
        </MaskLines>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-pc-line bg-pc-line md:grid-cols-3">
          {cells.map((cell, index) => (
            <Reveal key={cell.number} delay={0.1 * index} className="h-full">
              <article className="group relative h-full bg-navy-800 p-8 transition-colors duration-[400ms] hover:bg-navy-700 md:p-10">
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-6 right-6 text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-none text-accent opacity-[0.22] transition-opacity duration-[400ms] group-hover:opacity-40"
                >
                  {cell.number}
                </span>
                <h3 className="relative max-w-[14ch] text-[clamp(1.25rem,2vw,1.65rem)] font-semibold tracking-[-0.03em] text-pc-white">
                  {cell.title}
                </h3>
                <p className="relative mt-5 max-w-[36ch] text-[17px] leading-[1.65] text-pc-text">
                  {cell.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
