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
    <section className="flex min-h-[70vh] items-center bg-pc-white py-24 text-center">
      <Container>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-pc-ink">
          Something went wrong.
        </h1>
        <p className="mx-auto mt-4 max-w-[50ch] text-lg text-pc-body">
          Refresh and try again. If it keeps happening, email hello@programcreator.com.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton type="button" onClick={reset}>
            Try again
          </CTAButton>
          <CTAButton href="/" variant="ghost">
            Back home
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
