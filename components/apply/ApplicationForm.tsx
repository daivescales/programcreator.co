"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Check, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Button from "@/components/ui/Button";
import { fieldQuestions, questions, type Question } from "@/content/questions";
import { getSupabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";

const DRAFT_KEY = "pc_application";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Answers = Record<string, string | string[]>;

export default function ApplicationForm() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const current = questions[step];
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "daive@programcreator.com";

  const fieldIndex = useMemo(() => {
    if (!current.field) return null;
    return fieldQuestions.findIndex((q) => q.id === current.id) + 1;
  }, [current]);

  const progress =
    current.type === "welcome"
      ? 0
      : current.type === "review"
        ? 100
        : Math.round(((fieldIndex || 1) / fieldQuestions.length) * 100);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as {
          step?: number;
          answers?: Answers;
          consent?: boolean;
        };
        if (draft.answers) setAnswers(draft.answers);
        if (typeof draft.step === "number") {
          setStep(Math.min(draft.step, questions.length - 1));
        }
        if (typeof draft.consent === "boolean") setConsent(draft.consent);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ step, answers, consent })
    );
  }, [step, answers, consent, hydrated]);

  useEffect(() => {
    setError("");
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    []
  );

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setStep(next);
  }, []);

  const setField = useCallback((field: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }, []);

  const validate = useCallback((): boolean => {
    if (current.type === "welcome" || current.type === "review") return true;
    if (!current.field) return true;

    const value = answers[current.field];

    if (current.type === "multichoice") {
      const arr = Array.isArray(value) ? value : [];
      if (current.required && arr.length < (current.minSelections || 1)) {
        setError("Please select at least one option.");
        return false;
      }
      return true;
    }

    const text = typeof value === "string" ? value.trim() : "";
    if (current.required && !text) {
      setError("This field is required.");
      return false;
    }
    if (current.type === "email" && text && !EMAIL_RE.test(text)) {
      setError("Enter a valid email address.");
      return false;
    }
    return true;
  }, [answers, current]);

  const next = useCallback(() => {
    if (!validate()) return;
    if (step < questions.length - 1) goTo(step + 1, 1);
  }, [goTo, step, validate]);

  const back = useCallback(() => {
    if (step > 0) goTo(step - 1, -1);
  }, [goTo, step]);

  const selectChoice = useCallback(
    (option: string) => {
      if (!current.field) return;
      setField(current.field, option);
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => {
        if (step < questions.length - 1) goTo(step + 1, 1);
      }, 300);
    },
    [current.field, goTo, setField, step]
  );

  const toggleMulti = useCallback(
    (option: string) => {
      if (!current.field) return;
      const existing = Array.isArray(answers[current.field])
        ? (answers[current.field] as string[])
        : [];
      setField(
        current.field,
        existing.includes(option)
          ? existing.filter((item) => item !== option)
          : [...existing, option]
      );
    },
    [answers, current.field, setField]
  );

  async function handleSubmit() {
    if (honeypot) return;
    if (!consent) {
      setSubmitError("Please agree to the Privacy Policy and Terms.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const { error: insertError } = await getSupabase()
        .from("applications")
        .insert({
          name: answers.name,
          email: answers.email,
          brand_name: answers.brand_name || null,
          social_link: answers.social_link || null,
          audience_size: answers.audience_size || null,
          build_interest: Array.isArray(answers.build_interest)
            ? answers.build_interest
            : [],
          goal: answers.goal || null,
          budget: answers.budget || null,
          timeline: answers.timeline || null,
          notes: answers.notes || null,
        });

      if (insertError) throw insertError;
      localStorage.removeItem(DRAFT_KEY);
      router.push("/thank-you");
    } catch (err) {
      console.error(err);
      setSubmitError(
        `Something went wrong — your answers are saved. Try again, or email ${contactEmail}.`
      );
      setSubmitting(false);
    }
  }

  const variants = reduceMotion
    ? {
        enter: { opacity: 1, y: 0 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
      }
    : {
        enter: { opacity: 0, y: direction > 0 ? 12 : -12 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: direction > 0 ? -12 : 12 },
      };

  if (submitting) {
    return (
      <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-base px-6 text-center">
        <div>
          <div className="mx-auto h-10 w-10 animate-pulse rounded-full bg-sky-500/40" />
          <p className="mt-5 text-lg text-white">Sending your application…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100dvh-4rem)] bg-base">
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-line">
        <div
          className="h-full bg-sky-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute left-[-9999px] opacity-0"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {current.type === "welcome" && (
              <Welcome
                question={current}
                onStart={next}
              />
            )}

            {current.type !== "welcome" && current.type !== "review" && (
              <>
                {fieldIndex != null && (
                  <p className="mb-4 text-sm font-medium text-sky-500">
                    {fieldIndex} of {fieldQuestions.length}
                  </p>
                )}
                <h2 className="text-2xl font-semibold text-white md:text-4xl">
                  {current.question}
                </h2>
                {current.helper && (
                  <p className="mt-3 text-sm text-text-faint">{current.helper}</p>
                )}

                <div className="mt-8">
                  {(current.type === "text" || current.type === "email") && (
                    <input
                      ref={inputRef as React.RefObject<HTMLInputElement>}
                      id={current.id}
                      type={current.type === "email" ? "email" : "text"}
                      aria-label={current.question}
                      value={(answers[current.field!] as string) || ""}
                      placeholder={current.placeholder}
                      onChange={(e) => setField(current.field!, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          next();
                        }
                      }}
                      className="w-full border-0 border-b-2 border-line bg-transparent py-3 text-center text-xl text-white placeholder:text-text-faint focus:border-sky-500 focus:outline-none"
                    />
                  )}

                  {current.type === "longtext" && (
                    <textarea
                      ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                      id={current.id}
                      aria-label={current.question}
                      rows={3}
                      value={(answers[current.field!] as string) || ""}
                      placeholder={current.placeholder}
                      onChange={(e) => setField(current.field!, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          next();
                        }
                      }}
                      className="w-full resize-none border-0 border-b-2 border-line bg-transparent py-3 text-center text-xl text-white placeholder:text-text-faint focus:border-sky-500 focus:outline-none"
                    />
                  )}

                  {current.type === "choice" && current.options && (
                    <div className="mx-auto max-w-md space-y-3">
                      {current.options.map((option) => {
                        const selected = answers[current.field!] === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => selectChoice(option)}
                            className={cn(
                              "w-full rounded-lg border px-4 py-3 text-center text-base transition-colors",
                              selected
                                ? "border-sky-500 bg-sky-500/10 text-white"
                                : "border-line bg-surface text-text-muted hover:border-sky-500 hover:bg-sky-500/10 hover:text-white"
                            )}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {current.type === "multichoice" && current.options && (
                    <div className="mx-auto max-w-md space-y-3">
                      {current.options.map((option) => {
                        const selected = Array.isArray(answers[current.field!])
                          ? (answers[current.field!] as string[]).includes(option)
                          : false;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleMulti(option)}
                            className={cn(
                              "flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3 text-center text-base transition-colors",
                              selected
                                ? "border-sky-500 bg-sky-500/10 text-white"
                                : "border-line bg-surface text-text-muted hover:border-sky-500 hover:bg-sky-500/10 hover:text-white"
                            )}
                          >
                            {selected && <Check size={16} className="text-sky-500" />}
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {error && (
                    <p className="mt-4 text-sm text-sky-400" role="alert" aria-live="polite">
                      {error}
                    </p>
                  )}
                </div>

                {current.type !== "choice" && (
                  <div className="mt-8">
                    <Button type="button" onClick={next}>
                      Continue
                    </Button>
                    <p className="mt-3 text-sm text-text-faint">press Enter</p>
                  </div>
                )}

                {current.type === "multichoice" && (
                  <div className="mt-8">
                    <Button type="button" onClick={next}>
                      Continue
                    </Button>
                    <p className="mt-3 text-sm text-text-faint">press Enter</p>
                  </div>
                )}

                {step > 0 && (
                  <button
                    type="button"
                    onClick={back}
                    className="mt-8 inline-flex items-center gap-1 text-sm text-text-faint hover:text-white"
                    aria-label="Go back"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>
                )}
              </>
            )}

            {current.type === "review" && (
              <Review
                answers={answers}
                consent={consent}
                onConsent={setConsent}
                onEdit={(id) => {
                  const index = questions.findIndex((q) => q.id === id);
                  if (index >= 0) goTo(index, -1);
                }}
                onSubmit={handleSubmit}
                submitting={submitting}
                error={submitError}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Welcome({
  question,
  onStart,
}: {
  question: Question;
  onStart: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter") onStart();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onStart]);

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {question.headline}
      </h1>
      <p className="mx-auto mt-5 max-w-md text-base text-text-muted">
        {question.body}
      </p>
      <div className="mt-10">
        <Button type="button" onClick={onStart}>
          {question.buttonLabel}
        </Button>
        <p className="mt-3 text-sm text-text-faint">press Enter</p>
      </div>
    </div>
  );
}

function Review({
  answers,
  consent,
  onConsent,
  onEdit,
  onSubmit,
  submitting,
  error,
}: {
  answers: Answers;
  consent: boolean;
  onConsent: (v: boolean) => void;
  onEdit: (id: string) => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string;
}) {
  function format(value: string | string[] | undefined) {
    if (!value || (Array.isArray(value) && value.length === 0)) return "—";
    if (Array.isArray(value)) return value.join(", ");
    return value;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white md:text-4xl">
        Review your application
      </h2>
      <div className="mt-10 space-y-6 text-left">
        {fieldQuestions.map((q) => (
          <div key={q.id} className="border-b border-line pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-text-faint">{q.question}</p>
                <p className="mt-1 text-base text-white">
                  {format(answers[q.field!])}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onEdit(q.id)}
                className="shrink-0 text-sm text-sky-500 hover:text-sky-400"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <label className="mt-8 flex items-start justify-center gap-3 text-left text-sm text-text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => onConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-sky-500"
        />
        <span>
          I agree to the{" "}
          <Link href="/privacy" target="_blank" className="text-sky-500 underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" target="_blank" className="text-sky-500 underline">
            Terms
          </Link>
          .
        </span>
      </label>

      {error && (
        <p className="mt-4 text-sm text-sky-400" role="alert" aria-live="polite">
          {error}
        </p>
      )}

      <div className="mt-8">
        <Button type="button" onClick={onSubmit} disabled={submitting}>
          Submit Application
        </Button>
      </div>
    </div>
  );
}
