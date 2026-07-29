import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

export default function FinalCTA() {
  return (
    <Section variant="surface" className="!py-24">
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Let&apos;s build something your audience can actually buy.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-text-muted md:text-lg">
            Ten questions. Five minutes. Reviewed personally by me.
          </p>
          <div className="mt-8">
            <Button href="/apply">Apply to Work With Me</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
