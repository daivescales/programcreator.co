import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import Reveal from "@/components/ui/Reveal";

const proof = [
  { value: "$0", label: "Upfront for creators" },
  { value: "14 days", label: "Avg. product launch" },
  { value: "2 lanes", label: "Digital + physical" },
  { value: "1:1", label: "You work with me, not a team" },
] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-pc-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 500px at 50% -10%, var(--pc-blue-50), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--pc-ink) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Container className="relative w-full pt-10 pb-0 md:pt-16">
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal delay={0}>
            <div className="inline-flex h-8 items-center gap-2 rounded-full border border-pc-blue-100 bg-pc-blue-50 px-4 text-[13px] font-medium text-pc-blue">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-pc-blue opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pc-blue" />
              </span>
              Now taking 4 new brands for Q3
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-7 text-[clamp(2.6rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-pc-ink">
              Turn your audience into a product that{" "}
              <span className="text-pc-blue">actually sells</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-[62ch] text-lg leading-relaxed text-pc-body md:text-xl">
              I&apos;m Daive. I build digital products for creators and rebuild
              storefronts for physical brands — then scale them through the
              audience you already have. Creators pay nothing upfront; I take a
              revenue split. Product brands run on a flat retainer.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <CTAButton href="/apply" size="lg" className="w-full sm:w-auto">
                Apply to work with me
              </CTAButton>
              <CTAButton
                href="#how"
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto"
              >
                See how it works
              </CTAButton>
            </div>
            <p className="mt-5 text-[13px] text-pc-muted">
              Free 20-minute brand audit call · No pitch decks · You&apos;ll know
              if it&apos;s a fit by the end of the call
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.22} className="mt-14 md:mt-20">
          <div className="border-y border-pc-line py-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0">
              {proof.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex flex-col items-center px-4 text-center ${
                    index > 0 ? "md:border-l md:border-pc-line" : ""
                  }`}
                >
                  <p className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight text-pc-ink">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[13px] uppercase tracking-wide text-pc-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
