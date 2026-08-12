"use client";

import CTAButton from "@/components/ui/CTAButton";
import Container from "@/components/ui/Container";
import { contactEmail } from "@/lib/site-config";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const email = contactEmail();

  return (
    <section className="flex min-h-[70vh] items-center bg-navy-800 py-24 text-center">
      <Container>
        <p className="t-label mb-4 text-accent">Error</p>
        <h1 className="t-h2">Something went wrong.</h1>
        <p className="t-body mx-auto mt-4">
          Refresh and try again.
          {email ? (
            <>
              {" "}
              If it keeps happening, email{" "}
              <a
                href={`mailto:${email}`}
                className="text-accent underline underline-offset-4"
              >
                {email}
              </a>
              .
            </>
          ) : (
            <> If it keeps happening, Email coming soon.</>
          )}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center justify-center rounded-control bg-accent px-7 text-[15px] font-medium text-navy-900 transition-[color,transform] duration-[180ms] hover:-translate-y-px hover:bg-[#6aafff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
