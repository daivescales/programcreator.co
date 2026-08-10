import { Suspense } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import CalEmbed from "@/components/CalEmbed";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site-config";

type Search = { name?: string; email?: string; lane?: string };

function BookContent({ name, email, lane }: Search) {
  const firstName = name?.trim().split(/\s+/)[0];
  const hasParams = Boolean(firstName || email);

  return (
    <main className="pb-20 pt-10 md:pt-14">
      <Container className="max-w-[960px]">
        <div className="mx-auto mb-10 max-w-[560px] text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-pc-blue-50">
            <Check className="h-7 w-7 text-pc-blue" strokeWidth={2.5} aria-hidden />
          </div>

          {hasParams ? (
            <>
              <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-ink">
                You&apos;re in{firstName ? `, ${firstName}` : ""}.
              </h1>
              <p className="mt-3 text-base text-pc-body md:text-lg">
                Application received. Last step: pick a time and we&apos;ll talk it
                through.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-ink">
                Book a call with {site.founder}
              </h1>
              <p className="mt-3 text-base text-pc-body md:text-lg">
                Prefer to apply first?{" "}
                <Link
                  href="/apply"
                  className="text-pc-blue underline-offset-2 hover:underline"
                >
                  Start the application
                </Link>
                .
              </p>
            </>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-pc-blue-50 px-3 py-1 text-xs font-medium text-pc-blue">
              1 Application ✓
            </span>
            <span className="rounded-full border border-pc-blue bg-pc-white px-3 py-1 text-xs font-medium text-pc-ink">
              2 Book your call
            </span>
            <span className="rounded-full bg-pc-surface px-3 py-1 text-xs font-medium text-pc-muted">
              3 We build
            </span>
          </div>

          {lane ? (
            <p className="mt-3 text-xs text-pc-muted">
              Lane: {lane === "creator" ? "Creator / digital" : "Physical brand"}
            </p>
          ) : null}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="rounded-2xl border border-pc-line bg-pc-white p-2 shadow-[0_1px_2px_rgba(16,32,47,0.04)]">
            <CalEmbed name={name} email={email} />
          </div>

          <aside className="h-fit rounded-2xl border border-pc-line bg-pc-surface p-6">
            <h2 className="text-sm font-semibold tracking-tight text-pc-ink">
              What to expect
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-pc-body">
              <li>20 minutes, video call</li>
              <li>No deck. Straight conversation</li>
              <li>Bring your numbers if you have them</li>
              <li>You leave with a clear yes, no, or not yet</li>
            </ul>
          </aside>
        </div>
      </Container>
    </main>
  );
}

async function BookFromParams({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const params = await searchParams;
  return (
    <BookContent
      name={params.name}
      email={params.email}
      lane={params.lane}
    />
  );
}

export default function BookPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-dvh items-center justify-center">
          <div className="h-10 w-10 animate-pulse rounded-full bg-pc-blue-100" />
        </main>
      }
    >
      <BookFromParams searchParams={searchParams} />
    </Suspense>
  );
}
