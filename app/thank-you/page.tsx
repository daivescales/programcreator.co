"use client";

import { motion, useReducedMotion } from "framer-motion";
import CalEmbed from "@/components/CalEmbed";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

const callSteps = [
  "We review your audience and what it will actually buy",
  "I tell you what I'd build and the realistic timeline",
  "If it's a fit, we map out next steps. If it's not, I'll tell you straight.",
];

export default function ThankYouPage() {
  const calLink = process.env.NEXT_PUBLIC_CALCOM_LINK || "";
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@programcreator.com";
  const reduceMotion = useReducedMotion();

  const entrance = reduceMotion
    ? { initial: false, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div className="grain relative min-h-screen overflow-hidden bg-ink pb-24 pt-20 md:pt-28">
      <div className="azure-glow pointer-events-none absolute inset-0" aria-hidden />

      <Container className="relative z-10">
        <motion.div className="mx-auto max-w-3xl text-center" {...entrance}>
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-azure-500/40 bg-azure-500/10">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M5 13l4 4L19 7"
                stroke="#4E7CF0"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex justify-center">
            <Eyebrow>Application Received</Eyebrow>
          </div>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            You&apos;re in. Now let&apos;s get you on the calendar.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-mist-300 sm:text-lg">
            I&apos;ve got your answers. The next step is a short call where we go
            through them together and I tell you exactly what I&apos;d build for
            your audience — and whether it&apos;s worth building.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 max-w-3xl">
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-mist-500">
            What happens on the call
          </p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {callSteps.map((step, index) => (
              <li
                key={step}
                className="rounded-xl border border-white/8 bg-navy-900/60 p-5 text-left"
              >
                <span className="font-display text-2xl font-bold text-azure-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-mist-300">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <Card
            hover={false}
            className="overflow-hidden border-white/10 bg-navy-900 p-0 md:p-0"
          >
            <div className="min-h-[720px] w-full">
              <CalEmbed calLink={calLink} />
            </div>
          </Card>

          <p className="mt-6 text-center text-sm text-mist-500">
            Can&apos;t find a time that works? Email{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-azure-400 underline underline-offset-2"
            >
              {contactEmail}
            </a>{" "}
            and we&apos;ll sort it.
          </p>
          <p className="mt-2 text-center text-sm text-mist-500">
            Please only book if you can make the time — slots are limited.
          </p>

          <div className="mt-10 flex justify-center">
            <Button href="/" variant="secondary" size="sm">
              Back Home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
