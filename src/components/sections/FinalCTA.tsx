import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import Reveal from "@/components/ui/Reveal";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-y border-pc-line bg-pc-blue-50 py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 320px at 50% 0%, var(--pc-blue-100), transparent 70%)",
        }}
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-pc-ink">
              You already have the attention. Let&apos;s build the thing it
              points to.
            </h2>
            <p className="mx-auto mt-5 max-w-[58ch] text-lg leading-relaxed text-pc-body">
              Apply below. If I can move the number, we&apos;ll get on a call
              this week. If I can&apos;t, I&apos;ll tell you that instead of
              selling you something.
            </p>
            <div className="mt-9">
              <CTAButton href="/apply" size="lg">
                Apply to work with me
              </CTAButton>
            </div>
            <p className="mt-5 text-[13px] text-pc-muted">
              Takes 3 minutes · Free 20-minute call · Limited spots each month
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
