import { HoverRow, MaskLines, StaggerList } from "@/components/motion";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";

const rows = [
  {
    number: "01",
    title: "Build the offer",
    body: "A digital product your audience has already told you they want. Positioned, priced and packaged, ready to sell.",
  },
  {
    number: "02",
    title: "Rebuild the page",
    body: "The page where the money is actually made. Real copy, real structure, and a checkout that does not lose people on mobile.",
  },
  {
    number: "03",
    title: "Scale it through your socials",
    body: "Hooks and funnel paths that route the attention you already have into the product, then I keep tightening it against live data.",
  },
] as const;

export default function Model() {
  return (
    <Section id="model" tone="750" contain={false}>
      <Container>
        <SectionLabel number="01" label="What I do" />
        <Heading
          as="h2"
          text="You don't have a traffic problem. You have an offer problem."
          className="mt-6 max-w-[16ch]"
        />

        <MaskLines
          delay={0.12}
          className="mt-6 max-w-[50ch] text-[17px] leading-[1.65] text-pc-text"
        >
          {
            "You are already getting attention. Creator Product Scaling fixes what that attention lands on."
          }
        </MaskLines>

        <StaggerList className="mt-16">
          {rows.map((row) => (
            <HoverRow
              key={row.number}
              className="grid grid-cols-1 items-start gap-4 py-10 md:grid-cols-12 md:gap-6"
            >
              <span className="text-[13px] text-accent md:col-span-1">
                {row.number}
              </span>
              <h3 className="text-[clamp(1.15rem,1.9vw,1.5rem)] font-semibold tracking-[-0.035em] text-pc-white md:col-span-4">
                {row.title}
              </h3>
              <p className="max-w-[50ch] text-[17px] leading-[1.65] text-pc-text md:col-span-7">
                {row.body}
              </p>
            </HoverRow>
          ))}
        </StaggerList>
      </Container>
    </Section>
  );
}
