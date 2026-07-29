import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

export default function FinalCTA() {
  return (
    <Section variant="base" className="!py-24">
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Let&apos;s find out what your audience will buy.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-text-muted md:text-lg">
            Eleven questions, five minutes, then you book a call with me
            directly.
          </p>
          <div className="mt-8">
            <Button href="/apply">Apply to Work With Me</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
