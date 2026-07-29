import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="grain relative flex min-h-[80vh] items-center overflow-hidden bg-ink py-24">
      <div className="azure-glow pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative z-10">
        <div className="relative mx-auto max-w-2xl text-center">
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-display text-[10rem] font-extrabold leading-none text-white/[0.04] sm:text-[14rem]"
            aria-hidden
          >
            404
          </span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            This page doesn&apos;t exist. The build still can.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-mist-300">
            The link may be outdated or the page moved. Head home or apply if
            you&apos;re ready to build.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/apply" size="lg">
              Apply Now
            </Button>
            <Button href="/" variant="secondary" size="lg">
              Back Home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
