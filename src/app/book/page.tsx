"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CalEmbed, {
  type CalBookingSuccessPayload,
} from "@/components/CalEmbed";
import MaskText from "@/components/motion/MaskText";
import Container from "@/components/ui/Container";
import SocialLinks from "@/components/ui/SocialLinks";
import {
  EASE_IN,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const BOOKED_STORAGE_PREFIX = "pc_booked_";

type ThankYouState = {
  email: string;
  bookedAt: string;
  name?: string;
};

function SuccessCheck() {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="mb-8 flex h-12 w-12 items-center justify-center rounded-control border border-accent"
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

function ProgressRow({ active }: { active: "book" | "done" }) {
  const steps = [
    {
      label: "Application sent",
      state: "complete" as const,
    },
    {
      label: "Book your call",
      state: active === "book" ? ("active" as const) : ("complete" as const),
    },
    {
      label: "We build",
      state: "muted" as const,
    },
  ];

  return (
    <ol className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] uppercase tracking-[0.14em]">
      {steps.map((s, i) => (
        <li key={s.label} className="flex items-center gap-3">
          {i > 0 ? (
            <span className="h-1 w-1 rounded-full bg-pc-muted/50" aria-hidden />
          ) : null}
          <span
            className={cn(
              s.state === "complete" && "text-accent",
              s.state === "active" && "text-pc-white",
              s.state === "muted" && "text-pc-muted"
            )}
          >
            {s.label}
          </span>
        </li>
      ))}
    </ol>
  );
}

function formatLocal(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return iso;
  }
}

function ThankYou({ state }: { state: ThankYouState }) {
  const when = formatLocal(state.bookedAt);

  return (
    <div className="relative min-h-dvh bg-navy-800 py-28">
      <Container className="relative z-[1] flex justify-center">
        <div className="mx-auto max-w-[560px] text-center">
          <div className="flex justify-center">
            <SuccessCheck />
          </div>
          <MaskText as="h1" className="t-display">
            Thanks for applying.
          </MaskText>
          <p className="hand mt-3">see you soon</p>
          <p className="mt-7 text-[16px] leading-[1.7] text-pc-text">
            Your call is booked for {when}. A calendar invite is on its way to{" "}
            {state.email}.
          </p>
          <p className="mt-5 text-[16px] leading-[1.7] text-pc-text">
            I read every application myself. If I think we are the right fit to
            work together, you will get follow up emails from me before the call
            with anything I need from you. If I do not think I am the right
            person for your brand, I will tell you that on the call rather than
            leave you guessing.
          </p>
          <div className="mt-8 text-left">
            <p className="t-label">Before we talk</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-pc-text">
              <li>Have your numbers to hand if you have them</li>
              <li>Know roughly what you want to be selling</li>
              <li>Think about what is currently costing you the most</li>
            </ul>
          </div>
          <div className="mt-10 flex flex-col items-center gap-5">
            <Link
              href="/"
              className="text-sm text-pc-muted transition-colors hover:text-pc-white"
            >
              Back to the site
            </Link>
            <SocialLinks variant="text" className="justify-center" />
          </div>
        </div>
      </Container>
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

  const [thankYou, setThankYou] = useState<ThankYouState | null>(null);

  useEffect(() => {
    if (!email) return;
    try {
      const raw = sessionStorage.getItem(`${BOOKED_STORAGE_PREFIX}${email}`);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ThankYouState;
      if (parsed?.bookedAt && parsed?.email) {
        setThankYou(parsed);
      }
    } catch {
      // ignore
    }
  }, [email]);

  const persistThankYou = useCallback((state: ThankYouState) => {
    setThankYou(state);
    try {
      sessionStorage.setItem(
        `${BOOKED_STORAGE_PREFIX}${state.email}`,
        JSON.stringify(state)
      );
    } catch {
      // ignore
    }
  }, []);

  const onBookingSuccess = useCallback(
    async (payload: CalBookingSuccessPayload) => {
      const bookedEmail = payload.email || email;
      const bookedAt = payload.bookedAt || new Date().toISOString();
      if (!bookedEmail) return;

      try {
        await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: bookedEmail,
            bookedAt,
            bookingRef: payload.bookingRef,
          }),
        });
      } catch (err) {
        console.error("[book] booking POST failed", err);
      }

      persistThankYou({
        email: bookedEmail,
        bookedAt,
        name: firstName,
      });
    },
    [email, firstName, persistThankYou]
  );

  const stableSuccess = useMemo(() => onBookingSuccess, [onBookingSuccess]);

  if (thankYou) {
    return <ThankYou state={thankYou} />;
  }

  const calHref = `https://cal.com/${(
    process.env.NEXT_PUBLIC_CAL_LINK ||
    process.env.NEXT_PUBLIC_CALCOM_LINK ||
    site.calLink
  ).replace(/^https?:\/\/(www\.)?cal\.com\//, "")}`;

  return (
    <div className="relative min-h-dvh bg-navy-800 pb-20 pt-10 md:pt-14">
      <Container className="relative z-[1] max-w-[960px]">
        <div className="mb-10 max-w-[560px]">
          <SuccessCheck />

          {hasParams ? (
            <>
              <MaskText as="h1" className="t-display">
                {firstName ? `You're in, ${firstName}.` : "You're in."}
              </MaskText>
              <p className="t-body mt-5">
                Application received. Book your call below and we will talk it
                through.
              </p>
            </>
          ) : (
            <>
              <MaskText as="h1" className="t-display">
                {`Book a call with ${site.founder}`}
              </MaskText>
              <p className="t-body mt-5">
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

          <ProgressRow active="book" />

          {lane ? (
            <p className="mt-3 text-xs text-pc-muted">
              Lane:{" "}
              {lane === "creator" ? "Creator / digital" : "Physical brand"}
            </p>
          ) : null}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_240px] lg:items-start">
          <div className="min-h-[560px] rounded-panel bg-pc-surface p-2">
            <CalEmbed
              name={name}
              email={email}
              onBookingSuccess={stableSuccess}
            />
          </div>

          <aside className="h-fit">
            <h2 className="t-h3">What to expect</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-pc-text">
              <li>20 minutes</li>
              <li>Video call</li>
              <li>No deck</li>
              <li>Bring your numbers if you have them</li>
              <li>A straight answer either way</li>
            </ul>
            <p className="mt-6 text-sm text-pc-muted">
              Embed blocked?{" "}
              <a
                href={calHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-2 hover:underline"
              >
                Open Cal.com
              </a>
            </p>
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
          <div className="h-10 w-10 rounded-panel bg-navy-750" />
        </div>
      }
    >
      <BookContent />
    </Suspense>
  );
}
