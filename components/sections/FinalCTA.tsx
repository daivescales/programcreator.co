import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function FinalCTA() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="azure-glow pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative z-10 text-center">
        <Reveal>
          <div className="flex justify-center">
            <Eyebrow>Next Step</Eyebrow>
          </div>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-extrabold tracking-[-0.04em] text-white md:text-6xl lg:text-7xl">
            Your audience is already there. Let&apos;s give them something to
            buy.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mist-300 md:text-lg">
            Applications are reviewed personally. If it&apos;s a fit, you&apos;ll
            book a call with me directly.
          </p>
          <div className="mt-10 flex justify-center">
            <Button href="/apply" size="lg">
              Apply to Work With Me
            </Button>
          </div>
          <p className="mt-5 text-sm text-mist-500">
            Takes about 5 minutes. No payment required to apply.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
