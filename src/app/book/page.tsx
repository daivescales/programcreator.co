"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CalEmbed, {
  type CalBookingSuccessPayload,
} from "@/components/CalEmbed";
import BrandLogo from "@/components/brand/BrandLogo";
import MaskText from "@/components/motion/MaskText";
import Container from "@/components/ui/Container";
import SocialLinks from "@/components/ui/SocialLinks";
import {
  EASE_IN,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { copy } from "@/lib/copy";
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
  const steps = copy.booking.steps.map((label, i) => {
    let state: "complete" | "active" | "muted" = "muted";
    if (i === 0) state = "complete";
    else if (i === 1) state = active === "book" ? "active" : "complete";
    return { label, state };
  });

  return (
    <ol className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] uppercase tracking-[0.14em]">
      {steps.map((s, i) => (
        <li key={s.label} className="flex items-center gap-3">
          {i > 0 ? (
            <span className="h-1 w-1 rounded-full bg-pc-soft/50" aria-hidden />
          ) : null}
          <span
            className={cn(
              s.state === "complete" && "text-accent",
              s.state === "active" && "text-pc-white",
              s.state === "muted" && "text-pc-soft"
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
          <div className="mb-8 flex justify-center">
            <BrandLogo height={30} />
          </div>
          <div className="flex justify-center">
            <SuccessCheck />
          </div>
          <MaskText as="h1" className="t-display">
            {copy.booking.thanksHeading}
          </MaskText>
          <p className="hand mt-3">{copy.booking.thanksNote}</p>
          <p className="mt-7 text-[16px] leading-[1.7] text-pc-text">
            {copy.booking.confirmation(when, state.email)}
          </p>
          <p className="mt-5 text-[16px] leading-[1.7] text-pc-text">
            {copy.booking.expectation}
          </p>
          <div className="mt-8 text-left">
            <p className="t-label">{copy.booking.beforeLabel}</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-pc-text">
              {copy.booking.beforeItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-10 flex flex-col items-center gap-5">
            <Link
              href="/"
              className="text-sm text-pc-soft transition-colors hover:text-pc-white"
            >
              {copy.booking.backToSite}
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
          <div className="mb-8">
            <BrandLogo height={28} />
          </div>

          {hasParams ? (
            <>
              <MaskText as="h1" className="t-display">
                {firstName
                  ? copy.booking.heading(firstName)
                  : copy.booking.headingNeutral}
              </MaskText>
              <p className="t-body mt-5">{copy.booking.body}</p>
            </>
          ) : (
            <>
              <MaskText as="h1" className="t-display">
                {copy.booking.headingNeutral}
              </MaskText>
              <p className="t-body mt-5">
                <Link
                  href="/apply"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {copy.booking.backToApply}
                </Link>
              </p>
            </>
          )}

          <ProgressRow active="book" />

          {lane ? (
            <p className="mt-3 text-xs text-pc-soft">
              {lane === "creator" ? "Lane A" : "Lane B"}
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
            <h2 className="t-h3">{copy.booking.expectLabel}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-pc-text">
              {copy.booking.expectItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-pc-text">
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
