"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CalEmbed from "@/components/CalEmbed";
import MaskText from "@/components/motion/MaskText";
import Aurora from "@/components/system/Aurora";
import Container from "@/components/ui/Container";
import {
  EASE_IN,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function SuccessCheck() {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-[4px] border border-accent/40 bg-accent/10"
      aria-hidden
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        className="text-accent"
      >
        <motion.path
          d="M6 14.5L11.5 20L22 8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={
            reduced
              ? { duration: 0.2 }
              : { duration: 0.7, ease: EASE_IN, delay: 0.15 }
          }
        />
      </svg>
    </div>
  );
}

function BookContent() {
  const params = useSearchParams();
  const name = params.get("name") ?? undefined;
  const email = params.get("email") ?? undefined;
  const lane = params.get("lane") ?? undefined;
  const firstName = name?.trim().split(/\s+/)[0];
  const hasParams = Boolean(firstName || email);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-navy-800 pb-20 pt-10 md:pt-14">
      <Aurora className="opacity-40" />

      <Container className="relative z-[1] max-w-[960px]">
        <div className="mx-auto mb-10 max-w-[560px] text-center">
          <SuccessCheck />

          {hasParams ? (
            <>
              <MaskText
                as="h1"
                className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.035em] text-pc-white"
              >
                {firstName
                  ? `You're in, ${firstName}.`
                  : "You're in."}
              </MaskText>
              <p className="mt-3 text-base text-pc-text md:text-lg">
                Application received. Last step: pick a time and we&apos;ll talk
                it through.
              </p>
            </>
          ) : (
            <>
              <MaskText
                as="h1"
                className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.035em] text-pc-white"
              >
                {`Book a call with ${site.founder}`}
              </MaskText>
              <p className="mt-3 text-base text-pc-text md:text-lg">
                Prefer to apply first?{" "}
                <Link
                  href="/apply"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  Start the application
                </Link>
                .
              </p>
            </>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-[4px] border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              1 Application ✓
            </span>
            <span className="rounded-[4px] border border-accent bg-transparent px-3 py-1 text-xs font-medium text-pc-white">
              2 Book your call
            </span>
            <span className="rounded-[4px] border border-pc-line bg-navy-700 px-3 py-1 text-xs font-medium text-pc-muted">
              3 We build
            </span>
          </div>

          {lane ? (
            <p className="mt-3 text-xs text-pc-muted">
              Lane:{" "}
              {lane === "creator" ? "Creator / digital" : "Physical brand"}
            </p>
          ) : null}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="rounded-[4px] border border-pc-line bg-navy-700 p-2">
            <CalEmbed name={name} email={email} />
          </div>

          <aside
            className={cn(
              "h-fit rounded-[4px] border border-pc-line bg-navy-700 p-6"
            )}
          >
            <h2 className="text-sm font-semibold tracking-tight text-pc-white">
              What to expect
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-pc-text">
              <li>20 minutes, video call</li>
              <li>No deck. Straight conversation</li>
              <li>Bring your numbers if you have them</li>
              <li>You leave with a clear yes, no, or not yet</li>
            </ul>
          </aside>
        </div>
      </Container>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-navy-800">
          <div className="h-10 w-10 animate-pulse rounded-[4px] bg-navy-700" />
        </div>
      }
    >
      <BookContent />
    </Suspense>
  );
}
