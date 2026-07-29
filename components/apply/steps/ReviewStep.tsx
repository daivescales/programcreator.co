"use client";

import Link from "next/link";
import { SECTION_ORDER, questions } from "@/content/questions";
import Button from "@/components/ui/Button";

export type Answers = Record<string, string | string[]>;

type ReviewStepProps = {
  answers: Answers;
  consent: boolean;
  onConsentChange: (value: boolean) => void;
  onEdit: (stepIndex: number) => void;
  onSubmit: () => void;
  submitting: boolean;
  submitError: string;
  onRetry: () => void;
  error?: string;
};

function formatAnswer(value: string | string[] | undefined): string {
  if (value == null || value === "") return "—";
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "—";
  }
  return value;
}

export default function ReviewStep({
  answers,
  consent,
  onConsentChange,
  onEdit,
  onSubmit,
  submitting,
  submitError,
  onRetry,
  error,
}: ReviewStepProps) {
  const fieldQuestions = questions.filter(
    (q) => q.field && q.type !== "welcome" && q.type !== "review"
  );

  return (
    <div className="w-full">
      <p className="mb-3 text-sm font-medium text-azure-400">Review</p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
        Does everything look right?
      </h2>
      <p className="mt-3 text-mist-500">
        Check your answers, then submit when you&apos;re ready.
      </p>

      <div className="mt-10 space-y-10">
        {SECTION_ORDER.map((section) => {
          const sectionQuestions = fieldQuestions.filter(
            (q) => q.section === section
          );
          if (sectionQuestions.length === 0) return null;

          return (
            <div key={section}>
              <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-mist-500">
                {section}
              </h3>
              <ul className="space-y-4">
                {sectionQuestions.map((q) => {
                  const stepIndex = questions.findIndex((item) => item.id === q.id);
                  const raw = q.field ? answers[q.field] : undefined;
                  return (
                    <li
                      key={q.id}
                      className="grid gap-2 border-b border-white/8 pb-4 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6"
                    >
                      <div className="min-w-0">
                        <p className="text-sm text-mist-500">
                          {q.question}
                        </p>
                        <p className="mt-1 break-words text-base text-white">
                          {formatAnswer(raw)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onEdit(stepIndex)}
                        className="justify-self-start text-sm text-azure-400 hover:text-azure-300 sm:justify-self-end"
                      >
                        Edit
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <label className="mt-10 flex cursor-pointer items-start gap-3 text-sm text-mist-300">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => onConsentChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-azure-500"
        />
        <span>
          I agree to the{" "}
          <Link
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-azure-400 underline underline-offset-2 hover:text-azure-300"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-azure-400 underline underline-offset-2 hover:text-azure-300"
          >
            Terms of Service
          </Link>
          .
        </span>
      </label>

      {error && (
        <p className="mt-3 text-sm text-azure-300" role="alert" aria-live="polite">
          {error}
        </p>
      )}

      {submitError && (
        <div className="mt-6 rounded-lg border border-azure-500/30 bg-azure-500/10 p-4">
          <p className="text-sm text-mist-100">{submitError}</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 text-sm font-medium text-azure-400 hover:text-azure-300"
          >
            Try again
          </button>
        </div>
      )}

      <div className="mt-8">
        <Button
          type="button"
          size="lg"
          onClick={onSubmit}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </div>
  );
}
