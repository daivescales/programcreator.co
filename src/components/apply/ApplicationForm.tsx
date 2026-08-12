"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import {
  Controller,
  useForm,
  useWatch,
  type FieldPath,
  type Resolver,
} from "react-hook-form";
import { toast } from "sonner";
import BrandLogo from "@/components/brand/BrandLogo";
import { HandUnderline } from "@/components/marks";
import Glow from "@/components/system/Glow";
import {
  EASE_IN,
  EASE_OUT,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import {
  FOLLOWER_RANGE_OPTIONS,
  INVESTMENT_RANGE_OPTIONS,
  leadSchema,
  READY_TO_START_OPTIONS,
  type LeadInput,
} from "@/lib/validation";

const STORAGE_KEY = "pc_apply_draft";
const TOTAL_STEPS = 11;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const AUTO_ADVANCE_MS = 320;
const DQ_INVESTMENT = "Nothing right now";

type FormValues = {
  full_name: string;
  email: string;
  brand_name: string;
  lane: "creator" | "physical" | undefined;
  socials: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    website?: string;
  };
  follower_range: (typeof FOLLOWER_RANGE_OPTIONS)[number] | undefined;
  has_product: "yes" | "no" | "sort_of" | undefined;
  biggest_bottleneck: string;
  investment_range: (typeof INVESTMENT_RANGE_OPTIONS)[number] | undefined;
  ready_to_start: (typeof READY_TO_START_OPTIONS)[number] | undefined;
  terms_ack: boolean;
  qualified: boolean;
  utm: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    referrer?: string;
  };
  company_website?: string;
  startedAt: number;
};

const defaultValues: FormValues = {
  full_name: "",
  email: "",
  brand_name: "",
  lane: undefined,
  socials: { instagram: "", tiktok: "", youtube: "", website: "" },
  follower_range: undefined,
  has_product: undefined,
  biggest_bottleneck: "",
  investment_range: undefined,
  ready_to_start: undefined,
  terms_ack: false,
  qualified: true,
  utm: {
    utm_source: undefined,
    utm_medium: undefined,
    utm_campaign: undefined,
    referrer: undefined,
  },
  company_website: "",
  startedAt: 0,
};

type Choice = { id: string; label: string; value: string };

const LANE_OPTIONS: Choice[] = copy.form.questions[3].options.map((opt) => ({
  id: opt.key,
  label: opt.label,
  value: opt.lane,
}));

const HAS_PRODUCT_OPTIONS: Choice[] = copy.form.questions[7].options.map(
  (label, i) => {
    const values = ["yes", "sort_of", "no"] as const;
    return { id: values[i]!, label, value: values[i]! };
  }
);

const STAGES = copy.form.stages.map((stage) => ({
  id: stage.key,
  label: stage.label,
  start: stage.from-1,
  end: stage.to-1,
}));

const STEP_FIELDS: FieldPath<FormValues>[][] = [
  ["full_name"],
  ["email"],
  ["lane"],
  ["brand_name"],
  ["socials.instagram", "socials.tiktok", "socials.youtube", "socials.website"],
  ["follower_range"],
  ["has_product"],
  ["biggest_bottleneck"],
  ["investment_range"],
  ["ready_to_start"],
  ["terms_ack"],
];

function stageForStep(step: number) {
  return STAGES.find((s) => step >= s.start && step <= s.end) ?? STAGES[0]!;
}

function stageState(step: number, stage: (typeof STAGES)[number]) {
  if (step > stage.end) return "complete" as const;
  if (step >= stage.start && step <= stage.end) return "active" as const;
  return "upcoming" as const;
}

function Wordmark({ className }: { className?: string }) {
  return <BrandLogo height={24} className={className} />;
}

/** Render copy prompts. Only `_word_` becomes HandUnderline (Q9 behind, Q11 send). */
function FormPrompt({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(/(_[^_]+_)/g);
  const hasUnderline = parts.some((p) => /^_.+_$/.test(p));

  return (
    <h2
      className={cn(
        "max-w-[22ch] text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium tracking-[-0.02em] text-pc-white",
        hasUnderline && "pb-[0.4em]",
        className
      )}
    >
      {parts.map((part, i) => {
        const m = /^_(.+)_$/.exec(part);
        if (m) {
          return (
            <HandUnderline key={i} variant={1} delay={0.25}>
              {m[1]}
            </HandUnderline>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </h2>
  );
}

function UnderlineField({
  id,
  type = "text",
  placeholder,
  error,
  shake,
  prefix,
  ...rest
}: {
  id: string;
  type?: string;
  placeholder?: string;
  error?: string;
  shake?: boolean;
  prefix?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={cn(
        "relative",
        shake && "animate-[field-shake_0.35s_ease-in-out]"
      )}
    >
      <div className="flex items-baseline gap-1">
        {prefix ? (
          <span className="text-[20px] text-pc-soft" aria-hidden>
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "peer w-full border-0 bg-transparent py-3 text-[20px] text-pc-white caret-accent outline-none",
            "placeholder:text-pc-soft/55"
          )}
          {...rest}
        />
      </div>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full bg-pc-line"
      />
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ChoiceRows({
  options,
  value,
  onSelect,
  error,
  shake,
  disabled,
}: {
  options: Choice[];
  value?: string;
  onSelect: (choice: Choice) => void;
  error?: string;
  shake?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className={cn(
        "space-y-3",
        shake && "animate-[field-shake_0.35s_ease-in-out]"
      )}
      role="radiogroup"
    >
      {options.map((option, i) => {
        const selected = value === option.id || value === option.value;
        const letter = LETTERS[i] ?? String(i + 1);
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => {
              if (disabled) return;
              onSelect(option);
            }}
            className={cn(
              "group flex w-full items-center gap-4 rounded-control border px-5 py-4 text-left transition-[border-color,background-color] duration-[180ms]",
              "hover:border-pc-line-2 disabled:cursor-not-allowed disabled:opacity-60",
              selected
                ? "border-accent bg-accent/[0.06]"
                : "border-pc-line bg-transparent"
            )}
          >
            <span
              className={cn(
                "flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-control border text-[11px] font-medium tabular-nums",
                selected
                  ? "border-accent text-accent"
                  : "border-pc-line text-pc-soft"
              )}
              aria-hidden
            >
              {letter}
            </span>
            <span className="flex-1 text-[15px] text-pc-white md:text-base">
              {option.label}
            </span>
            <Check
              className={cn(
                "h-4 w-4 shrink-0 text-accent transition-opacity duration-[180ms]",
                selected ? "opacity-100" : "opacity-0"
              )}
              aria-hidden
            />
          </button>
        );
      })}
      {error ? (
        <p className="mt-2 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function StageIndex({ step }: { step: number }) {
  const activeIndex = Math.max(
    0,
    STAGES.findIndex((s) => step >= s.start && step <= s.end)
  );
  // t-label ~1.1rem, gap-5 = 1.25rem
  const rowRem = 1.1;
  const gapRem = 1.25;

  return (
    <nav aria-label="Application stages" className="relative flex flex-col gap-5">
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-px bg-pc-line"
      />
      <span
        aria-hidden
        className="absolute left-0 top-0 w-0.5 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          height: `${rowRem}rem`,
          transform: `translateY(${activeIndex * (rowRem + gapRem)}rem)`,
        }}
      />
      {STAGES.map((stage) => {
        const state = stageState(step, stage);
        return (
          <div
            key={stage.id}
            className={cn(
              "relative pl-4 transition-opacity duration-300",
              state === "upcoming" && "opacity-40"
            )}
          >
            <div className="flex items-center gap-2">
              <p
                className={cn(
                  "t-label transition-colors duration-300",
                  state === "active" && "text-pc-white",
                  state === "complete" && "text-pc-soft",
                  state === "upcoming" && "text-pc-soft"
                )}
              >
                {stage.label}
              </p>
              {state === "complete" ? (
                <Check className="h-3 w-3 text-accent" aria-hidden />
              ) : null}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

function TermsCheckboxLabel(): ReactNode {
  const text = copy.form.questions[11].checkbox;
  const marker = "Terms of Service";
  const idx = text.indexOf(marker);
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <Link
        href="/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline-offset-2 hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {marker}
      </Link>
      {text.slice(idx + marker.length)}
    </>
  );
}

export default function ApplicationForm() {
  const router = useRouter();
  const reduceMotion = usePrefersReducedMotion();
  const focusRef = useRef<HTMLDivElement>(null);
  const panelScrollRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTransitioningRef = useRef(false);

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [laneChoiceId, setLaneChoiceId] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [closed, setClosed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const closedPosted = useRef(false);

  const setTransitioning = useCallback((value: boolean) => {
    isTransitioningRef.current = value;
    setIsTransitioning(value);
  }, []);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(leadSchema) as Resolver<FormValues>,
    defaultValues,
    mode: "onSubmit",
  });

  const lane = useWatch({ control, name: "lane" });
  const followerRange = useWatch({ control, name: "follower_range" });
  const hasProduct = useWatch({ control, name: "has_product" });
  const investmentRange = useWatch({ control, name: "investment_range" });
  const readyToStart = useWatch({ control, name: "ready_to_start" });

  useEffect(() => {
    let restoredStartedAt: number | undefined;

    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as {
          step?: number;
          values?: Partial<FormValues>;
          laneChoiceId?: string | null;
          closed?: boolean;
          disqualified?: boolean;
        };
        if (draft.values) {
          const { company_website: _h, ...rest } = draft.values;
          void _h;
          for (const [key, val] of Object.entries(rest)) {
            if (key === "startedAt") continue;
            setValue(key as FieldPath<FormValues>, val as never, {
              shouldDirty: false,
            });
          }
          if (
            typeof draft.values.startedAt === "number" &&
            Number.isFinite(draft.values.startedAt) &&
            draft.values.startedAt > 0
          ) {
            restoredStartedAt = draft.values.startedAt;
          }
        }
        if (typeof draft.step === "number") {
          setStep(Math.min(Math.max(draft.step, 0), TOTAL_STEPS-1));
        }
        if (draft.laneChoiceId) setLaneChoiceId(draft.laneChoiceId);
        if (draft.closed || draft.disqualified) setClosed(true);
      }
    } catch {
      // ignore corrupt draft
    }

    setValue("startedAt", restoredStartedAt ?? Date.now());

    const params = new URLSearchParams(window.location.search);
    setValue("utm", {
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      referrer: document.referrer || undefined,
    });

    setHydrated(true);
  }, [setValue]);

  useEffect(() => {
    if (!hydrated) return;

    const persist = (values: FormValues) => {
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            values: { ...values, company_website: "" },
            step,
            laneChoiceId,
            closed,
          })
        );
      } catch {
        // ignore
      }
    };

    persist(getValues());

    const sub = watch((values) => {
      persist(values as FormValues);
    });
    return () => sub.unsubscribe();
  }, [watch, hydrated, step, laneChoiceId, getValues, closed]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const prev = raw ? JSON.parse(raw) : {};
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...prev, step, laneChoiceId, closed })
      );
    } catch {
      // ignore
    }
  }, [step, laneChoiceId, hydrated, closed]);

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    []
  );

  const focusStep = useCallback(() => {
    const el = focusRef.current?.querySelector<HTMLElement>(
      "input:not([type=hidden]):not([tabindex='-1']), textarea, button[role=radio]"
    );
    el?.focus();
  }, []);

  const resetScroll = useCallback(() => {
    panelScrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const onStepEntered = useCallback(() => {
    clearErrors();
    setShake(false);
    resetScroll();
    focusStep();
    setTransitioning(false);
  }, [clearErrors, focusStep, resetScroll, setTransitioning]);

  useEffect(() => {
    if (!hydrated || submitting) return;
    const ms = reduceMotion ? 160 : 360;
    const t = window.setTimeout(() => {
      onStepEntered();
    }, ms);
    return () => window.clearTimeout(t);
  }, [step, closed, hydrated, submitting, reduceMotion, onStepEntered]);

  const triggerShake = useCallback(() => {
    setShake(true);
    window.setTimeout(() => setShake(false), 400);
  }, []);

  const postClosed = useCallback(
    async (investment: (typeof INVESTMENT_RANGE_OPTIONS)[number]) => {
      if (closedPosted.current) return;
      closedPosted.current = true;
      try {
        const values = getValues();
        const payload = leadSchema.parse({
          ...values,
          investment_range: investment,
          qualified: false,
          terms_ack: values.terms_ack ?? false,
          ready_to_start: values.ready_to_start,
        });
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await res.json()) as { ok?: boolean; error?: string };
        if (!res.ok || !data.ok) {
          throw new Error(data.error || copy.validation.submitError);
        }
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
      } catch (err) {
        closedPosted.current = false;
        toast.error(
          err instanceof Error ? err.message : copy.validation.submitError
        );
      }
    },
    [getValues]
  );

  const enterClosed = useCallback(
    (investment: FormValues["investment_range"]) => {
      if (!investment || isTransitioningRef.current) return;
      setTransitioning(true);
      setValue("investment_range", investment, { shouldValidate: false });
      setValue("qualified", false);
      setClosed(true);
      void postClosed(investment);
    },
    [postClosed, setTransitioning, setValue]
  );

  const validateStep = useCallback(async () => {
    const fields = STEP_FIELDS[step];
    const ok = await trigger(fields);
    if (!ok) {
      triggerShake();
      return false;
    }

    if (step === 4) {
      const v = getValues();
      const has =
        Boolean(String(v.socials?.instagram ?? "").trim()) ||
        Boolean(String(v.socials?.tiktok ?? "").trim()) ||
        Boolean(String(v.socials?.youtube ?? "").trim()) ||
        Boolean(String(v.socials?.website ?? "").trim());
      if (!has) {
        setError("socials.instagram", {
          message: copy.validation.socials,
        });
        triggerShake();
        return false;
      }
    }
    return true;
  }, [step, trigger, getValues, setError, triggerShake]);

  const goTo = useCallback(
    (next: number) => {
      if (isTransitioningRef.current) return;
      setTransitioning(true);
      resetScroll();
      setStep(next);
    },
    [resetScroll, setTransitioning]
  );

  const next = useCallback(async () => {
    if (isTransitioningRef.current) return;
    if (!(await validateStep())) return;
    if (step < TOTAL_STEPS-1) goTo(step + 1);
  }, [goTo, step, validateStep]);

  const back = useCallback(() => {
    if (isTransitioningRef.current) return;
    if (step > 0) goTo(step-1);
  }, [goTo, step]);

  const selectAndAdvance = useCallback(
    (apply: () => void) => {
      if (isTransitioningRef.current) return;
      setTransitioning(true);
      apply();
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => {
        resetScroll();
        setStep((s) => Math.min(s + 1, TOTAL_STEPS-1));
      }, AUTO_ADVANCE_MS);
    },
    [resetScroll, setTransitioning]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (submitting || closed || isTransitioningRef.current) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === "textarea") return;
      if (tag === "input" && (target as HTMLInputElement).type !== "checkbox") {
        return;
      }

      const choiceMap: Record<number, Choice[]> = {
        2: LANE_OPTIONS,
        5: FOLLOWER_RANGE_OPTIONS.map((v) => ({ id: v, label: v, value: v })),
        6: HAS_PRODUCT_OPTIONS,
        8: INVESTMENT_RANGE_OPTIONS.map((v) => ({ id: v, label: v, value: v })),
        9: READY_TO_START_OPTIONS.map((v) => ({ id: v, label: v, value: v })),
      };

      const choices = choiceMap[step];
      if (choices && e.key.length === 1) {
        const idx = LETTERS.indexOf(e.key.toUpperCase());
        if (idx >= 0 && idx < choices.length) {
          e.preventDefault();
          const choice = choices[idx]!;
          if (step === 2) {
            selectAndAdvance(() => {
              setLaneChoiceId(choice.id);
              setValue("lane", choice.value as FormValues["lane"], {
                shouldValidate: true,
              });
            });
          } else if (step === 5) {
            selectAndAdvance(() =>
              setValue(
                "follower_range",
                choice.value as FormValues["follower_range"],
                { shouldValidate: true }
              )
            );
          } else if (step === 6) {
            selectAndAdvance(() =>
              setValue(
                "has_product",
                choice.value as FormValues["has_product"],
                { shouldValidate: true }
              )
            );
          } else if (step === 8) {
            if (choice.value === DQ_INVESTMENT) {
              enterClosed(choice.value as FormValues["investment_range"]);
            } else {
              selectAndAdvance(() =>
                setValue(
                  "investment_range",
                  choice.value as FormValues["investment_range"],
                  { shouldValidate: true }
                )
              );
            }
          } else if (step === 9) {
            selectAndAdvance(() =>
              setValue(
                "ready_to_start",
                choice.value as FormValues["ready_to_start"],
                { shouldValidate: true }
              )
            );
          }
          return;
        }
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (step === TOTAL_STEPS-1) {
          void handleSubmit(onSubmit)();
        } else {
          void next();
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // onSubmit defined below. Intentionally omit to avoid rebind loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    step,
    submitting,
    closed,
    selectAndAdvance,
    setValue,
    next,
    back,
    handleSubmit,
    enterClosed,
  ]);

  async function onSubmit(values: FormValues) {
    if (isTransitioningRef.current) return;
    setSubmitting(true);
    try {
      const payload: LeadInput = leadSchema.parse({
        ...values,
        qualified: true,
      });
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || copy.validation.submitError);
      }

      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }

      const first = values.full_name.trim().split(/\s+/)[0] ?? "";
      const params = new URLSearchParams({
        name: first,
        email: values.email,
        lane: values.lane ?? "",
      });
      router.push(`/book?${params.toString()}`);
    } catch (err) {
      setSubmitting(false);
      toast.error(
        err instanceof Error ? err.message : copy.validation.submitError
      );
    }
  }

  const onContinueKey = (e: ReactKeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isTransitioningRef.current) return;
      if (step === TOTAL_STEPS-1) void handleSubmit(onSubmit)();
      else void next();
    }
  };

  const progress = (step + 1) / TOTAL_STEPS;
  const currentStage = stageForStep(step);

  const stepError =
    errors.full_name?.message ||
    errors.email?.message ||
    errors.lane?.message ||
    errors.brand_name?.message ||
    errors.socials?.instagram?.message ||
    errors.follower_range?.message ||
    errors.has_product?.message ||
    errors.biggest_bottleneck?.message ||
    errors.investment_range?.message ||
    errors.ready_to_start?.message ||
    errors.terms_ack?.message;

  const variants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.15 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        enter: { opacity: 0, y: 16 },
        center: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.34, ease: EASE_IN },
        },
        exit: {
          opacity: 0,
          y: -16,
          transition: { duration: 0.22, ease: EASE_OUT },
        },
      };

  const locked = isTransitioning || submitting;
  const q = copy.form.questions;

  return (
    <div className="relative flex min-h-dvh flex-col bg-navy-800 lg:flex-row">
      <header className="sticky top-0 z-[3] bg-navy-900 lg:hidden">
        <div className="flex h-14 items-center justify-between px-5">
          <Wordmark />
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-pc-soft">
            <span className="text-pc-text">{currentStage.label}</span>
            <span className="tabular-nums text-pc-white">
              {copy.form.questionLabel(step + 1).replace(/^Question /, "")}
            </span>
          </div>
        </div>
        <div className="h-0.5 w-full bg-pc-line" aria-hidden>
          <motion.div
            className="h-full origin-left bg-accent"
            initial={false}
            animate={{ scaleX: closed ? 1 : progress }}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 280, damping: 32 }
            }
            style={{ willChange: "transform" }}
          />
        </div>
      </header>

      <aside className="relative hidden w-[34%] shrink-0 flex-col overflow-hidden bg-navy-900 p-9 lg:sticky lg:top-0 lg:flex lg:h-dvh">
        <Glow className="pointer-events-none absolute inset-0 opacity-50" />
        <Wordmark className="relative z-[1] text-base" />

        <div className="relative z-[1] mt-16 flex-1">
          <StageIndex step={closed ? 8 : step} />
        </div>

        <div className="relative z-[1] mt-auto pt-8">
          <p className="t-label">{copy.form.railLabel}</p>
          <p className="mt-3 max-w-[36ch] text-[14px] leading-relaxed text-pc-text">
            {copy.form.railNote}
          </p>
        </div>
      </aside>

      <div
        ref={panelScrollRef}
        className="relative flex min-h-0 flex-1 flex-col overflow-y-auto bg-navy-800 lg:w-[66%]"
      >
        <div
          className="relative z-[1] hidden h-0.5 w-full bg-pc-line lg:block"
          aria-hidden
        >
          <motion.div
            className="h-full origin-left bg-accent"
            initial={false}
            animate={{ scaleX: closed ? 1 : progress }}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 280, damping: 32 }
            }
            style={{ willChange: "transform" }}
          />
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {closed
            ? copy.closed.label
            : copy.form.questionLabel(step + 1)}
        </div>

        <div className="relative z-[1] flex min-h-[calc(100dvh-3.625rem)] flex-1 flex-col px-5 py-8 sm:px-8 lg:min-h-0 lg:justify-center lg:px-10 lg:py-14 xl:px-16">
          <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col lg:mx-0 lg:flex-none">
            <div
              className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden opacity-0"
              aria-hidden
            >
              <label htmlFor="company_website">Company website</label>
              <input
                id="company_website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("company_website")}
              />
            </div>

            <div
              className="relative min-h-[340px] flex-1 md:min-h-[420px] lg:flex-none"
              ref={focusRef}
            >
              <AnimatePresence mode="wait">
                {closed ? (
                  <motion.div
                    key="closed"
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={variants}
                    className="w-full"
                  >
                    <p className="t-label mb-3">{copy.closed.label}</p>
                    <h2 className="text-[1.75rem] font-medium tracking-[-0.02em] text-pc-white">
                      {copy.closed.heading}
                    </h2>
                    <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.7] text-pc-text">
                      {copy.closed.body1}
                    </p>
                    <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.7] text-pc-text">
                      {copy.closed.body2}
                    </p>
                    <div className="mt-10 flex flex-col gap-4">
                      <Link
                        href="/"
                        className="inline-flex w-fit items-center text-sm text-pc-soft transition-colors hover:text-pc-white"
                      >
                        {copy.closed.button}
                      </Link>
                      <p className="text-sm text-pc-text">
                        {copy.closed.underButton}
                      </p>
                    </div>
                  </motion.div>
                ) : !submitting ? (
                  <motion.div
                    key={step}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={variants}
                    onKeyDown={onContinueKey}
                    className="w-full"
                  >
                    <p className="t-label mb-3 text-accent">
                      {copy.form.questionLabel(step + 1)}
                    </p>

                    {step === 0 && (
                      <>
                        <FormPrompt text={q[1].prompt} />
                        <div className="mt-8">
                          <UnderlineField
                            id="full_name"
                            autoComplete="name"
                            error={errors.full_name?.message}
                            shake={shake}
                            {...register("full_name")}
                          />
                        </div>
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <FormPrompt text={q[2].prompt} />
                        <div className="mt-8">
                          <UnderlineField
                            id="email"
                            type="email"
                            autoComplete="email"
                            error={errors.email?.message}
                            shake={shake}
                            {...register("email")}
                          />
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <FormPrompt text={q[3].prompt} />
                        <div className="mt-8">
                          <ChoiceRows
                            options={LANE_OPTIONS}
                            value={laneChoiceId ?? undefined}
                            error={errors.lane?.message}
                            shake={shake}
                            disabled={locked}
                            onSelect={(choice) =>
                              selectAndAdvance(() => {
                                setLaneChoiceId(choice.id);
                                setValue(
                                  "lane",
                                  choice.value as FormValues["lane"],
                                  { shouldValidate: true }
                                );
                              })
                            }
                          />
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <FormPrompt text={q[4].prompt} />
                        <div className="mt-8">
                          <UnderlineField
                            id="brand_name"
                            error={errors.brand_name?.message}
                            shake={shake}
                            {...register("brand_name")}
                          />
                        </div>
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <FormPrompt text={q[5].prompt} />
                        <p className="mt-2 text-[15px] text-pc-text">
                          {q[5].helper}
                        </p>
                        <div
                          className={cn(
                            "mt-8 space-y-5",
                            shake && "animate-[field-shake_0.35s_ease-in-out]"
                          )}
                        >
                          <UnderlineField
                            id="instagram"
                            placeholder="instagram"
                            prefix="@"
                            error={errors.socials?.instagram?.message}
                            {...register("socials.instagram")}
                          />
                          <UnderlineField
                            id="tiktok"
                            placeholder="tiktok"
                            prefix="@"
                            {...register("socials.tiktok")}
                          />
                          <UnderlineField
                            id="youtube"
                            placeholder="youtube"
                            prefix="@"
                            {...register("socials.youtube")}
                          />
                          <UnderlineField
                            id="website"
                            type="url"
                            placeholder="website"
                            {...register("socials.website")}
                          />
                        </div>
                      </>
                    )}

                    {step === 5 && (
                      <>
                        <FormPrompt text={q[6].prompt} />
                        <div className="mt-8">
                          <ChoiceRows
                            options={FOLLOWER_RANGE_OPTIONS.map((v) => ({
                              id: v,
                              label: v,
                              value: v,
                            }))}
                            value={followerRange}
                            error={errors.follower_range?.message}
                            shake={shake}
                            disabled={locked}
                            onSelect={(choice) =>
                              selectAndAdvance(() =>
                                setValue(
                                  "follower_range",
                                  choice.value as FormValues["follower_range"],
                                  { shouldValidate: true }
                                )
                              )
                            }
                          />
                        </div>
                      </>
                    )}

                    {step === 6 && (
                      <>
                        <FormPrompt text={q[7].prompt} />
                        <div className="mt-8">
                          <ChoiceRows
                            options={HAS_PRODUCT_OPTIONS}
                            value={hasProduct}
                            error={errors.has_product?.message}
                            shake={shake}
                            disabled={locked}
                            onSelect={(choice) =>
                              selectAndAdvance(() =>
                                setValue(
                                  "has_product",
                                  choice.value as FormValues["has_product"],
                                  { shouldValidate: true }
                                )
                              )
                            }
                          />
                        </div>
                      </>
                    )}

                    {step === 7 && (
                      <>
                        <FormPrompt text={q[8].prompt} />
                        <p className="mt-2 text-[15px] text-pc-text">
                          {q[8].helper}
                        </p>
                        <div
                          className={cn(
                            "relative mt-8",
                            shake && "animate-[field-shake_0.35s_ease-in-out]"
                          )}
                        >
                          <textarea
                            id="biggest_bottleneck"
                            rows={5}
                            aria-invalid={Boolean(errors.biggest_bottleneck)}
                            className={cn(
                              "peer w-full resize-none border-0 bg-transparent py-3 text-[18px] leading-relaxed text-pc-white caret-accent outline-none md:text-[20px]",
                              "placeholder:text-pc-soft/55"
                            )}
                            {...register("biggest_bottleneck")}
                          />
                          <span
                            aria-hidden
                            className="absolute bottom-0 left-0 h-px w-full bg-pc-line"
                          />
                          <span
                            aria-hidden
                            className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100"
                          />
                          {errors.biggest_bottleneck?.message ? (
                            <p
                              className="mt-2 text-sm text-red-400"
                              role="alert"
                            >
                              {errors.biggest_bottleneck.message}
                            </p>
                          ) : null}
                        </div>
                      </>
                    )}

                    {step === 8 && (
                      <>
                        <FormPrompt text={q[9].prompt} />
                        <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-pc-text">
                          {q[9].helper}
                        </p>
                        <div className="mt-8">
                          <ChoiceRows
                            options={INVESTMENT_RANGE_OPTIONS.map((v) => ({
                              id: v,
                              label: v,
                              value: v,
                            }))}
                            value={investmentRange}
                            error={errors.investment_range?.message}
                            shake={shake}
                            disabled={locked}
                            onSelect={(choice) => {
                              if (choice.value === DQ_INVESTMENT) {
                                enterClosed(
                                  choice.value as FormValues["investment_range"]
                                );
                                return;
                              }
                              selectAndAdvance(() =>
                                setValue(
                                  "investment_range",
                                  choice.value as FormValues["investment_range"],
                                  { shouldValidate: true }
                                )
                              );
                            }}
                          />
                        </div>
                      </>
                    )}

                    {step === 9 && (
                      <>
                        <FormPrompt text={q[10].prompt} />
                        <div className="mt-8">
                          <ChoiceRows
                            options={READY_TO_START_OPTIONS.map((v) => ({
                              id: v,
                              label: v,
                              value: v,
                            }))}
                            value={readyToStart}
                            error={errors.ready_to_start?.message}
                            shake={shake}
                            disabled={locked}
                            onSelect={(choice) =>
                              selectAndAdvance(() =>
                                setValue(
                                  "ready_to_start",
                                  choice.value as FormValues["ready_to_start"],
                                  { shouldValidate: true }
                                )
                              )
                            }
                          />
                        </div>
                      </>
                    )}

                    {step === 10 && (
                      <>
                        <FormPrompt text={q[11].heading} />
                        <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-pc-text md:text-base">
                          {lane === "creator"
                            ? q[11].creatorBody
                            : q[11].physicalBody}
                        </p>
                        <div
                          className={cn(
                            "mt-8",
                            shake && "animate-[field-shake_0.35s_ease-in-out]"
                          )}
                        >
                          <Controller
                            name="terms_ack"
                            control={control}
                            render={({ field }) => (
                              <label className="flex cursor-pointer items-start gap-3 rounded-control border border-pc-line px-5 py-4 transition-colors hover:border-pc-line-2">
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={(e) =>
                                    field.onChange(e.target.checked)
                                  }
                                  className="mt-1 h-4 w-4 shrink-0 accent-accent"
                                />
                                <span className="text-[15px] leading-relaxed text-pc-white">
                                  <TermsCheckboxLabel />
                                </span>
                              </label>
                            )}
                          />
                          {errors.terms_ack?.message ? (
                            <p
                              className="mt-2 text-sm text-red-400"
                              role="alert"
                            >
                              {errors.terms_ack.message}
                            </p>
                          ) : null}
                          <p className="mt-4 text-xs leading-relaxed text-pc-text">
                            {q[11].underCheckbox}
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="sending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex min-h-[340px] flex-col justify-center md:min-h-[420px]"
                  >
                    <motion.div
                      className="mb-8 h-px w-full origin-left bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={
                        reduceMotion
                          ? { duration: 0.15 }
                          : { duration: 0.85, ease: EASE_IN }
                      }
                    />
                    <p className="text-[15px] text-pc-text">{copy.sending}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!submitting && !closed ? (
              <div className="mt-10 border-t border-pc-line pt-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={back}
                        disabled={locked}
                        className="group inline-flex items-center gap-1.5 text-sm text-pc-soft transition-colors hover:text-pc-white disabled:opacity-50"
                      >
                        <ChevronLeft
                          className="h-4 w-4 transition-transform duration-[180ms] group-hover:-translate-x-[3px]"
                          aria-hidden
                        />
                        {copy.form.back}
                      </button>
                    ) : (
                      <span />
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      type="button"
                      disabled={locked}
                      onClick={() => {
                        if (locked) return;
                        if (step === TOTAL_STEPS-1)
                          void handleSubmit(onSubmit)();
                        else void next();
                      }}
                      className="inline-flex h-12 items-center justify-center rounded-control bg-accent px-8 text-[15px] font-medium text-navy-900 transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {step === TOTAL_STEPS-1
                        ? copy.form.submit
                        : copy.form.continue}
                    </button>
                    <p className="text-[12px] text-pc-soft">
                      {copy.form.enterHint}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {stepError && !submitting && !closed ? (
              <span className="sr-only" aria-live="assertive">
                {stepError}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
