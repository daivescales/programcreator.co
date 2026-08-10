"use client";

import CTAButton from "@/components/ui/CTAButton";
import Container from "@/components/ui/Container";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[70vh] items-center bg-navy-800 py-24 text-center">
      <Container>
        <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
          Error
        </p>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.035em] text-pc-white">
          Something went wrong.
        </h1>
        <p className="mx-auto mt-4 max-w-[50ch] text-lg text-pc-text">
          Refresh and try again. If it keeps happening, email
          hello@programcreator.com.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-14 items-center justify-center rounded-[4px] bg-accent px-9 text-[17px] font-medium text-navy-900 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Try again
          </button>
          <CTAButton href="/" variant="ghost">
            Back home
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
