"use client";

import CTAButton from "@/components/ui/CTAButton";
import Container from "@/components/ui/Container";
import { copy } from "@/lib/copy";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[70vh] items-center bg-navy-800 py-24 text-center">
      <Container>
        <h1 className="t-h2">{copy.system.errorTitle}</h1>
        <p className="t-body mx-auto mt-4">{copy.system.errorBody}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center justify-center rounded-control bg-accent px-7 text-[15px] font-medium text-navy-900 transition-[color,transform] duration-[180ms] hover:-translate-y-px hover:bg-[#6aafff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {copy.system.tryAgain}
          </button>
          <CTAButton href="/" variant="ghost">
            {copy.system.backHome}
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
