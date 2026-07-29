import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TheProblem() {
  return (
    <Section variant="surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The Gap"
            title="Platforms cap what you can earn."
          />
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
            YouTube and Instagram give you two ways to make money: platform
            payouts and sponsorships. Both are capped, both are rented, and both
            stop the moment you do. The audience you&apos;ve built is worth far
            more than what a platform will ever pay you for it — you just need
            something of your own to offer them.
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-xl font-semibold text-white">
            That&apos;s the part I build.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
