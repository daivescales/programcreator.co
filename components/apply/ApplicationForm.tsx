"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from "react";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { questions } from "@/content/questions";
import { getSupabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import WelcomeStep from "./steps/WelcomeStep";
import TextStep from "./steps/TextStep";
import EmailStep from "./steps/EmailStep";
import PhoneStep from "./steps/PhoneStep";
import LongTextStep from "./steps/LongTextStep";
import ChoiceStep from "./steps/ChoiceStep";
import MultiChoiceStep from "./steps/MultiChoiceStep";
import ReviewStep, { type Answers } from "./steps/ReviewStep";

const DRAFT_KEY = "pc_application_draft";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type DraftState = {
  answers: Answers;
  step: number;
  consent: boolean;
};

function emptyAnswers(): Answers {
  const initial: Answers = {};
  for (const q of questions) {
    if (!q.field) continue;
    initial[q.field] = q.type === "multichoice" ? [] : "";
  }
  return initial;
}

function validateQuestion(
  stepIndex: number,
  answers: Answers,
  consent: boolean
): string | null {
  const q = questions[stepIndex];
  if (!q) return null;

  if (q.type === "welcome") return null;

  if (q.type === "review") {
    if (!consent) return "Please agree to the Privacy Policy and Terms.";
    return null;
  }

  if (!q.field) return null;
  const value = answers[q.field];
  const isOptional = q.optional === true || q.required === false;

  if (q.type === "multichoice") {
    const arr = Array.isArray(value) ? value : [];
    const min = q.minSelections ?? 1;
    if (q.required && arr.length < min) {
      return `Please select at least ${min} option${min === 1 ? "" : "s"}.`;
    }
    return null;
  }

  const str = typeof value === "string" ? value.trim() : "";

  if (!isOptional && !str) {
    return "This field is required.";
  }

  if (q.type === "email" && str && !EMAIL_RE.test(str)) {
    return "Enter a valid email address.";
  }

  return null;
}

export default function ApplicationForm() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submitLocked = useRef(false);

  const current = questions[step];
  const totalSteps = questions.length;
  const progress = Math.round((step / Math.max(totalSteps - 1, 1)) * 100);

  const fieldQuestionNumber = (() => {
    if (!current || current.type === "welcome" || current.type === "review") {
      return null;
    }
    let n = 0;
    for (let i = 0; i <= step; i++) {
      const q = questions[i];
      if (q.field) n += 1;
    }
    return n;
  })();

  // Restore draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as DraftState;
        if (draft.answers) {
          setAnswers({ ...emptyAnswers(), ...draft.answers });
        }
        if (
          typeof draft.step === "number" &&
          draft.step >= 0 &&
          draft.step < questions.length
        ) {
          setStep(draft.step);
        }
        if (typeof draft.consent === "boolean") {
          setConsent(draft.consent);
        }
      }
    } catch {
      // ignore corrupt draft
    }
    setHydrated(true);
  }, []);

  // Persist draft
  useEffect(() => {
    if (!hydrated) return;
    const draft: DraftState = { answers, step, consent };
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // ignore quota errors
    }
  }, [answers, step, consent, hydrated]);

  // Autofocus on step change
  useEffect(() => {
    if (!hydrated) return;
    const t = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(t);
  }, [step, hydrated]);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setError("");
    setShake(false);
    setStep(next);
  }, []);

  const showValidationError = useCallback((message: string) => {
    setError(message);
    setShake(true);
    window.setTimeout(() => setShake(false), 450);
  }, []);

  const advance = useCallback(() => {
    const message = validateQuestion(step, answers, consent);
    if (message) {
      showValidationError(message);
      return;
    }
    if (step < totalSteps - 1) {
      goTo(step + 1, 1);
    }
  }, [step, answers, consent, totalSteps, goTo, showValidationError]);

  const goBack = useCallback(() => {
    if (step > 0) {
      goTo(step - 1, -1);
    }
  }, [step, goTo]);

  const setFieldValue = useCallback((field: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setError("");
  }, []);

  const selectChoice = useCallback(
    (value: string, autoAdvance = true) => {
      if (!current?.field) return;
      setFieldValue(current.field, value);
      if (current.type === "choice" && autoAdvance) {
        if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
        autoAdvanceTimer.current = setTimeout(() => {
          const nextStep = step + 1;
          // validate with the new value
          const nextAnswers = { ...answers, [current.field!]: value };
          const message = validateQuestion(step, nextAnswers, consent);
          if (message) {
            showValidationError(message);
            return;
          }
          if (nextStep < totalSteps) {
            goTo(nextStep, 1);
          }
        }, 350);
      }
    },
    [
      current,
      setFieldValue,
      step,
      answers,
      consent,
      totalSteps,
      goTo,
      showValidationError,
    ]
  );

  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@programcreator.com";

  const handleSubmit = useCallback(async () => {
    const message = validateQuestion(step, answers, consent);
    if (message) {
      showValidationError(message);
      return;
    }

    if (honeypot.trim()) {
      // Silent reject for bots
      router.push("/thank-you");
      return;
    }

    if (submitLocked.current || submitting) return;
    submitLocked.current = true;
    setSubmitting(true);
    setSubmitError("");

    try {
      const params =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      const payload: Record<string, unknown> = {
        first_name: String(answers.first_name || "").trim() || null,
        last_name: String(answers.last_name || "").trim() || null,
        email: String(answers.email || "").trim(),
        phone: String(answers.phone || "").trim() || null,
        brand_name: String(answers.brand_name || "").trim() || null,
        applicant_type: String(answers.applicant_type || "").trim() || null,
        primary_platform:
          String(answers.primary_platform || "").trim() || null,
        primary_handle: String(answers.primary_handle || "").trim() || null,
        audience_size: String(answers.audience_size || "").trim() || null,
        other_platforms:
          String(answers.other_platforms || "").trim() || null,
        avg_views: String(answers.avg_views || "").trim() || null,
        audience_description:
          String(answers.audience_description || "").trim() || null,
        audience_location:
          String(answers.audience_location || "").trim() || null,
        email_list_size:
          String(answers.email_list_size || "").trim() || null,
        currently_monetizing:
          String(answers.currently_monetizing || "").trim() || null,
        current_revenue_streams:
          String(answers.current_revenue_streams || "").trim() || null,
        monthly_revenue:
          String(answers.monthly_revenue || "").trim() || null,
        build_interest: Array.isArray(answers.build_interest)
          ? answers.build_interest
          : [],
        product_vision: String(answers.product_vision || "").trim() || null,
        biggest_goal: String(answers.biggest_goal || "").trim() || null,
        timeline: String(answers.timeline || "").trim() || null,
        whats_blocking: String(answers.whats_blocking || "").trim() || null,
        investment_range:
          String(answers.investment_range || "").trim() || null,
        decision_maker: String(answers.decision_maker || "").trim() || null,
        commitment_level:
          String(answers.commitment_level || "").trim() || null,
        referral_source:
          String(answers.referral_source || "").trim() || null,
        additional_notes:
          String(answers.additional_notes || "").trim() || null,
        utm_source: params.get("utm_source") || null,
        utm_medium: params.get("utm_medium") || null,
        utm_campaign: params.get("utm_campaign") || null,
      };

      const { error: insertError } = await getSupabase()
        .from("applications")
        .insert(payload);

      if (insertError) throw insertError;

      localStorage.removeItem(DRAFT_KEY);
      router.push("/thank-you");
    } catch (err) {
      console.error(err);
      setSubmitError(
        `Something went wrong. Your answers are saved — try again, or email ${contactEmail}.`
      );
      setSubmitting(false);
      submitLocked.current = false;
    }
  }, [
    step,
    answers,
    consent,
    honeypot,
    submitting,
    showValidationError,
    router,
    contactEmail,
  ]);

  // Global keyboard handling
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (submitting) return;

      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isTyping =
        tag === "input" || tag === "textarea" || target?.isContentEditable;

      // Letter shortcuts for choice / multichoice
      if (
        current &&
        (current.type === "choice" || current.type === "multichoice") &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        e.key.length === 1
      ) {
        const letter = e.key.toUpperCase();
        const index = letter.charCodeAt(0) - 65;
        const options = current.options ?? [];
        if (index >= 0 && index < options.length) {
          // Allow letter select even when focused on buttons
          if (!isTyping || tag === "button") {
            e.preventDefault();
            if (current.type === "choice") {
              selectChoice(options[index], true);
            } else if (current.field) {
              const existing = Array.isArray(answers[current.field])
                ? (answers[current.field] as string[])
                : [];
              const option = options[index];
              const next = existing.includes(option)
                ? existing.filter((v) => v !== option)
                : [...existing, option];
              setFieldValue(current.field, next);
            }
            return;
          }
        }
      }

      if (e.key === "Enter") {
        if (current?.type === "longtext" && e.shiftKey) {
          return; // allow newline
        }
        if (current?.type === "review") {
          e.preventDefault();
          void handleSubmit();
          return;
        }
        if (current?.type === "longtext" && !e.shiftKey) {
          e.preventDefault();
          advance();
          return;
        }
        if (current?.type !== "longtext") {
          e.preventDefault();
          if (current?.type === "welcome") {
            advance();
          } else {
            advance();
          }
        }
      }

      if (e.key === "ArrowUp" && !isTyping) {
        e.preventDefault();
        goBack();
      }
      if (e.key === "ArrowDown" && !isTyping) {
        e.preventDefault();
        advance();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    current,
    answers,
    advance,
    goBack,
    selectChoice,
    setFieldValue,
    handleSubmit,
    submitting,
  ]);

  function handleStepKeyDown(e: ReactKeyboardEvent) {
    // Prevent double-handling inside inputs for Enter on short fields
    if (e.key === "Enter" && current?.type !== "longtext") {
      e.preventDefault();
    }
  }

  const variants = prefersReducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: number) => ({
          y: dir > 0 ? 40 : -40,
          opacity: 0,
        }),
        center: { y: 0, opacity: 1 },
        exit: (dir: number) => ({
          y: dir > 0 ? -40 : 40,
          opacity: 0,
        }),
      };

  const fieldValue = current?.field ? answers[current.field] : undefined;
  const stringValue =
    typeof fieldValue === "string" ? fieldValue : "";
  const arrayValue = Array.isArray(fieldValue) ? fieldValue : [];

  if (submitting) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink">
        <div className="text-center">
          <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-azure-500/40 animate-pulse-azure" />
          <p className="font-display text-lg text-white">
            Submitting your application...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] bg-ink grain">
      {/* Soft azure glow that shifts with step */}
      <div
        className="pointer-events-none absolute inset-0 azure-glow transition-transform duration-700"
        style={{
          transform: `translate(${(step % 5) * 2 - 4}%, ${(step % 3) * 3 - 3}%)`,
        }}
        aria-hidden
      />

      {/* Progress bar — below minimal header (h-16) */}
      <div className="fixed inset-x-0 top-16 z-40">
        <div className="flex items-center gap-3 px-5 sm:px-8">
          <div className="h-0.5 flex-1 overflow-hidden bg-white/10">
            <div
              className="h-full bg-azure-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="shrink-0 text-xs tabular-nums text-mist-500">
            {progress}%
          </span>
        </div>
      </div>

      {/* Honeypot */}
      <label className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        Company website
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </label>

      <div className="relative z-10 flex min-h-[100dvh] items-center px-5 pb-24 pt-28 sm:px-8">
        <div className="mx-auto w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={cn(shake && "animate-shake")}
              onKeyDown={handleStepKeyDown}
            >
              {current.type !== "welcome" &&
                current.type !== "review" &&
                fieldQuestionNumber != null && (
                  <p className="mb-4 text-sm font-medium text-azure-400">
                    {String(fieldQuestionNumber).padStart(2, "0")} →
                  </p>
                )}

              {current.type === "welcome" && (
                <WelcomeStep question={current} onStart={advance} />
              )}

              {current.type !== "welcome" &&
                current.type !== "review" &&
                current.question && (
                  <label
                    htmlFor={`q-${current.id}`}
                    className="block font-display text-3xl font-bold leading-[1.15] tracking-tight text-white md:text-5xl"
                  >
                    {current.question}
                    {current.optional && (
                      <span className="ml-2 text-base font-normal text-mist-700 md:text-lg">
                        Optional
                      </span>
                    )}
                  </label>
                )}

              {current.helper && current.type !== "welcome" && (
                <p className="mt-3 text-base text-mist-500">{current.helper}</p>
              )}

              <div className="mt-8">
                {current.type === "text" && current.field && (
                  <TextStep
                    ref={inputRef as RefObject<HTMLInputElement>}
                    id={`q-${current.id}`}
                    question={current}
                    value={stringValue}
                    onChange={(v) => setFieldValue(current.field!, v)}
                  />
                )}
                {current.type === "email" && current.field && (
                  <EmailStep
                    ref={inputRef as RefObject<HTMLInputElement>}
                    id={`q-${current.id}`}
                    question={current}
                    value={stringValue}
                    onChange={(v) => setFieldValue(current.field!, v)}
                  />
                )}
                {current.type === "phone" && current.field && (
                  <PhoneStep
                    ref={inputRef as RefObject<HTMLInputElement>}
                    id={`q-${current.id}`}
                    question={current}
                    value={stringValue}
                    onChange={(v) => setFieldValue(current.field!, v)}
                  />
                )}
                {current.type === "longtext" && current.field && (
                  <LongTextStep
                    ref={inputRef as RefObject<HTMLTextAreaElement>}
                    id={`q-${current.id}`}
                    question={current}
                    value={stringValue}
                    onChange={(v) => setFieldValue(current.field!, v)}
                  />
                )}
                {current.type === "choice" && (
                  <ChoiceStep
                    question={current}
                    value={stringValue}
                    onSelect={(v) => selectChoice(v, true)}
                  />
                )}
                {current.type === "multichoice" && current.field && (
                  <MultiChoiceStep
                    question={current}
                    value={arrayValue}
                    onChange={(v) => setFieldValue(current.field!, v)}
                  />
                )}
                {current.type === "review" && (
                  <ReviewStep
                    answers={answers}
                    consent={consent}
                    onConsentChange={setConsent}
                    onEdit={(i) => goTo(i, i < step ? -1 : 1)}
                    onSubmit={() => void handleSubmit()}
                    submitting={submitting}
                    submitError={submitError}
                    onRetry={() => void handleSubmit()}
                    error={error}
                  />
                )}
              </div>

              {error && current.type !== "review" && (
                <p
                  className="mt-4 text-sm text-azure-300"
                  role="alert"
                  aria-live="polite"
                >
                  {error}
                </p>
              )}

              {current.type !== "welcome" &&
                current.type !== "review" && (
                  <div className="mt-8 flex items-center gap-4">
                    <Button type="button" onClick={advance}>
                      OK
                    </Button>
                    <span className="text-sm text-mist-700">
                      press{" "}
                      <kbd className="rounded border border-white/10 bg-navy-900 px-1.5 py-0.5 text-mist-500">
                        Enter ↵
                      </kbd>
                    </span>
                  </div>
                )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Nav chevrons */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col gap-2 sm:right-8">
        <button
          type="button"
          aria-label="Previous question"
          onClick={goBack}
          disabled={step === 0}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-navy-900 text-mist-300 transition-colors hover:border-azure-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronUp size={18} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Next question"
          onClick={advance}
          disabled={step >= totalSteps - 1}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-navy-900 text-mist-300 transition-colors hover:border-azure-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
