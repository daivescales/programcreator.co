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
} from "react";
import {
  Controller,
  useForm,
  useWatch,
  type FieldPath,
  type Resolver,
} from "react-hook-form";
import { toast } from "sonner";
import CharDrift from "@/components/motion/CharDrift";
import MaskText from "@/components/motion/MaskText";
import Aurora from "@/components/system/Aurora";
import {
  EASE_IN,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import {
  FOLLOWER_RANGE_OPTIONS,
  leadSchema,
  READY_TO_START_OPTIONS,
  REVENUE_RANGE_OPTIONS,
  SOURCE_OPTIONS,
  type LeadInput,
} from "@/lib/validation";

const STORAGE_KEY = "pc_apply_draft";
const TOTAL_STEPS = 13;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const AUTO_ADVANCE_MS = 300;

type FormValues = {
  full_name: string;
  email: string;
  brand_name: string;
  lane: "creator" | "physical" | undefined;
  socials: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    other?: string;
  };
  website?: string;
  follower_range: (typeof FOLLOWER_RANGE_OPTIONS)[number] | undefined;
  has_product: "yes" | "no" | "sort_of" | undefined;
  revenue_range: (typeof REVENUE_RANGE_OPTIONS)[number] | undefined;
  biggest_bottleneck: string;
  goal_90_days: string;
  ready_to_start: (typeof READY_TO_START_OPTIONS)[number] | undefined;
  budget_ack: boolean;
  source: (typeof SOURCE_OPTIONS)[number] | undefined;
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
  socials: { instagram: "", tiktok: "", youtube: "", other: "" },
  website: "",
  follower_range: undefined,
  has_product: undefined,
  revenue_range: undefined,
  biggest_bottleneck: "",
  goal_90_days: "",
  ready_to_start: undefined,
  budget_ack: false,
  source: undefined,
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

const LANE_OPTIONS: Choice[] = [
  { id: "creator", label: "I'm a creator with an audience", value: "creator" },
  {
    id: "physical",
    label: "I run a physical product brand",
    value: "physical",
  },
  {
    id: "both",
    label: "Both — I have an audience and I sell physical products",
    value: "physical",
  },
];

const HAS_PRODUCT_OPTIONS: Choice[] = [
  { id: "yes", label: "Yes, and it's selling", value: "yes" },
  {
    id: "sort_of",
    label: "Yes, but it isn't converting",
    value: "sort_of",
  },
  { id: "no", label: "No, not yet", value: "no" },
];

const STEP_FIELDS: FieldPath<FormValues>[][] = [
  ["full_name"],
  ["email"],
  ["lane"],
  ["brand_name"],
  ["socials.instagram", "socials.tiktok", "socials.youtube", "website"],
  ["follower_range"],
  ["has_product"],
  ["revenue_range"],
  ["biggest_bottleneck"],
  ["goal_90_days"],
  ["ready_to_start"],
  ["budget_ack"],
  ["source"],
];

function padStep(n: number) {
  return String(n).padStart(2, "0");
}

function ChoiceCards({
  options,
  selectedId,
  onSelect,
}: {
  options: Choice[];
  selectedId: string | null;
  onSelect: (option: Choice) => void;
}) {
  return (
    <div className="space-y-3" role="radiogroup">
      {options.map((option, index) => {
        const selected = selectedId === option.id;
        const letter = LETTERS[index];
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            data-letter={letter}
            onClick={() => onSelect(option)}
            className={cn(
              "flex w-full items-center gap-4 rounded-[4px] border px-5 py-4 text-left transition-colors duration-[180ms]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              selected
                ? "border-accent bg-accent/10"
                : "border-pc-line bg-transparent hover:border-pc-line-2 hover:bg-white/[0.03]"
            )}
          >
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] border text-xs font-medium",
                selected
                  ? "border-accent bg-accent text-navy-900"
                  : "border-pc-line bg-navy-700 text-pc-muted"
              )}
            >
              {letter}
            </span>
            <span className="flex-1 text-[15px] font-medium text-pc-white">
              {option.label}
            </span>
            {selected ? (
              <Check className="h-5 w-5 text-accent" strokeWidth={2.5} />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

const inputClass =
  "w-full border-0 border-b border-pc-line bg-transparent py-3 text-xl text-pc-white placeholder:text-pc-muted transition-colors duration-[180ms] focus:border-accent focus:outline-none md:text-2xl";

export default function ApplicationForm() {
  const router = useRouter();
  const reduceMotion = usePrefersReducedMotion();
  const focusRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [laneChoiceId, setLaneChoiceId] = useState<string | null>(null);

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
  const revenueRange = useWatch({ control, name: "revenue_range" });
  const readyToStart = useWatch({ control, name: "ready_to_start" });
  const source = useWatch({ control, name: "source" });

  useEffect(() => {
    setValue("startedAt", Date.now());

    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as {
          step?: number;
          values?: Partial<FormValues>;
          laneChoiceId?: string | null;
        };
        if (draft.values) {
          const { startedAt: _s, company_website: _h, ...rest } = draft.values;
          void _s;
          void _h;
          for (const [key, val] of Object.entries(rest)) {
            setValue(key as FieldPath<FormValues>, val as never, {
              shouldDirty: false,
            });
          }
        }
        if (typeof draft.step === "number") {
          setStep(Math.min(Math.max(draft.step, 0), TOTAL_STEPS - 1));
        }
        if (draft.laneChoiceId) setLaneChoiceId(draft.laneChoiceId);
      }
    } catch {
      // ignore corrupt draft
    }

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
    const sub = watch((values) => {
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            values: { ...values, company_website: "" },
            step,
            laneChoiceId,
          })
        );
      } catch {
        // ignore
      }
    });
    return () => sub.unsubscribe();
  }, [watch, hydrated, step, laneChoiceId]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const prev = raw ? JSON.parse(raw) : {};
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...prev, step, laneChoiceId })
      );
    } catch {
      // ignore
    }
  }, [step, laneChoiceId, hydrated]);

  useEffect(() => {
    clearErrors();
    const t = setTimeout(() => {
      const el = focusRef.current?.querySelector<HTMLElement>(
        "input:not([type=hidden]):not([tabindex='-1']), textarea, button[role=radio]"
      );
      el?.focus();
    }, 50);
    return () => clearTimeout(t);
  }, [step, clearErrors]);

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

  const validateStep = useCallback(async () => {
    const fields = STEP_FIELDS[step];
    const ok = await trigger(fields);
    if (!ok) return false;

    if (step === 4) {
      const v = getValues();
      const has =
        Boolean(String(v.socials?.instagram ?? "").trim()) ||
        Boolean(String(v.socials?.tiktok ?? "").trim()) ||
        Boolean(String(v.socials?.youtube ?? "").trim()) ||
        Boolean(String(v.website ?? "").trim());
      if (!has) {
        setError("socials.instagram", {
          message: "Drop at least one handle or a website so I can find you.",
        });
        return false;
      }
    }
    return true;
  }, [step, trigger, getValues, setError]);

  const next = useCallback(async () => {
    if (!(await validateStep())) return;
    if (step < TOTAL_STEPS - 1) goTo(step + 1, 1);
  }, [goTo, step, validateStep]);

  const back = useCallback(() => {
    if (step > 0) goTo(step - 1, -1);
  }, [goTo, step]);

  const selectAndAdvance = useCallback((apply: () => void) => {
    apply();
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
      setDirection(1);
    }, AUTO_ADVANCE_MS);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (submitting) return;
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
        7: REVENUE_RANGE_OPTIONS.map((v) => ({ id: v, label: v, value: v })),
        10: READY_TO_START_OPTIONS.map((v) => ({ id: v, label: v, value: v })),
        12: SOURCE_OPTIONS.map((v) => ({ id: v, label: v, value: v })),
      };

      const options = choiceMap[step];
      if (!options || e.metaKey || e.ctrlKey || e.altKey) return;

      const idx = LETTERS.indexOf(e.key.toUpperCase());
      if (idx < 0 || idx >= options.length) return;
      e.preventDefault();
      const option = options[idx];

      if (step === 2) {
        selectAndAdvance(() => {
          setLaneChoiceId(option.id);
          setValue("lane", option.value as FormValues["lane"], {
            shouldValidate: true,
          });
        });
        return;
      }

      const fieldByStep: Record<number, FieldPath<FormValues>> = {
        5: "follower_range",
        6: "has_product",
        7: "revenue_range",
        10: "ready_to_start",
        12: "source",
      };
      const field = fieldByStep[step];
      if (!field) return;

      if (step === 12) {
        setValue(field, option.value as never, { shouldValidate: true });
        return;
      }

      selectAndAdvance(() => {
        setValue(field, option.value as never, { shouldValidate: true });
      });
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectAndAdvance, setValue, step, submitting]);

  async function onValidSubmit(data: FormValues) {
    setSubmitting(true);
    try {
      const parsed = leadSchema.safeParse(data);
      if (!parsed.success) {
        toast.error("Check your answers and try again.");
        setSubmitting(false);
        return;
      }

      const payload: LeadInput = parsed.data;
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Could not submit");
      }

      sessionStorage.removeItem(STORAGE_KEY);
      const first = payload.full_name.trim().split(/\s+/)[0] || "";
      router.push(
        `/book?name=${encodeURIComponent(first)}&email=${encodeURIComponent(payload.email)}&lane=${encodeURIComponent(payload.lane)}`
      );
    } catch {
      toast.error(
        "Something went wrong. Your answers are still here — try again."
      );
      setSubmitting(false);
    }
  }

  async function submitOrNext() {
    if (step === TOTAL_STEPS - 1) {
      if (!(await validateStep())) return;
      void handleSubmit(onValidSubmit)();
      return;
    }
    await next();
  }

  function onEnter(e: ReactKeyboardEvent) {
    if (e.key !== "Enter" || e.shiftKey) return;
    const tag = (e.target as HTMLElement).tagName.toLowerCase();
    if (tag === "textarea") return;
    e.preventDefault();
    void submitOrNext();
  }

  const variants = reduceMotion
    ? {
        enter: { opacity: 1, y: 0 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
      }
    : {
        enter: { opacity: 0, y: direction > 0 ? 20 : -20 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: direction > 0 ? -20 : 20 },
      };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;
  const stepError =
    errors.full_name?.message ||
    errors.email?.message ||
    errors.lane?.message ||
    errors.brand_name?.message ||
    errors.socials?.instagram?.message ||
    errors.follower_range?.message ||
    errors.has_product?.message ||
    errors.revenue_range?.message ||
    errors.biggest_bottleneck?.message ||
    errors.goal_90_days?.message ||
    errors.ready_to_start?.message ||
    errors.budget_ack?.message ||
    errors.source?.message;

  const showContinue =
    [0, 1, 3, 4, 8, 9, 11].includes(step) || step === TOTAL_STEPS - 1;

  if (submitting) {
    return (
      <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-navy-800 px-6 text-center">
        <Aurora className="opacity-40 [&>div:first-child]:bottom-[-20%] [&>div:first-child]:left-[-15%] [&>div:first-child]:top-auto [&>div:last-child]:hidden" />
        <CharDrift
          as="p"
          className="relative z-[1] text-lg text-pc-text"
        >
          Sending your application...
        </CharDrift>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-navy-800">
      <Aurora className="opacity-35 [&>div:first-child]:bottom-[-25%] [&>div:first-child]:left-[-20%] [&>div:first-child]:top-auto [&>div:last-child]:hidden" />

      <header className="relative z-40 sticky top-0 border-b border-pc-line bg-navy-800/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6">
          <Link
            href="/"
            className="text-[18px] font-semibold tracking-tight text-pc-white"
          >
            Program<span className="text-accent">Creator</span>
          </Link>
          <p className="font-mono text-sm tabular-nums text-pc-muted">
            {padStep(step + 1)} / {padStep(TOTAL_STEPS)}
          </p>
        </div>
        <div className="h-[2px] w-full bg-pc-line" aria-hidden>
          <motion.div
            className="h-full bg-accent"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.32, ease: EASE_IN }
            }
          />
        </div>
      </header>

      <div className="sr-only" aria-live="polite">
        Question {step + 1} of {TOTAL_STEPS}
      </div>

      <form
        className="relative z-[1] flex flex-1 flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          void submitOrNext();
        }}
        noValidate
      >
        <div
          className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
          aria-hidden
        >
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            tabIndex={-1}
            autoComplete="off"
            {...register("company_website")}
          />
        </div>
        <input
          type="hidden"
          {...register("startedAt", { valueAsNumber: true })}
        />

        <div
          ref={focusRef}
          className="mx-auto flex w-full max-w-[640px] flex-1 flex-col justify-center px-6 py-12 md:py-16"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.32, ease: EASE_IN }
              }
            >
              {step === 0 && (
                <>
                  <MaskText
                    as="h1"
                    className="max-w-[20ch] text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[-0.035em] text-pc-white"
                  >
                    What&apos;s your full name?
                  </MaskText>
                  <input
                    className={cn(inputClass, "mt-8")}
                    placeholder="Your name"
                    autoComplete="name"
                    aria-label="Full name"
                    onKeyDown={onEnter}
                    {...register("full_name")}
                  />
                </>
              )}

              {step === 1 && (
                <>
                  <MaskText
                    as="h1"
                    className="max-w-[20ch] text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[-0.035em] text-pc-white"
                  >
                    What&apos;s the best email for you?
                  </MaskText>
                  <input
                    type="email"
                    className={cn(inputClass, "mt-8")}
                    placeholder="you@email.com"
                    autoComplete="email"
                    aria-label="Email"
                    onKeyDown={onEnter}
                    {...register("email")}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <MaskText
                    as="h1"
                    className="max-w-[20ch] text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[-0.035em] text-pc-white"
                  >
                    Which best describes you?
                  </MaskText>
                  <div className="mt-8">
                    <ChoiceCards
                      selectedId={laneChoiceId}
                      options={LANE_OPTIONS}
                      onSelect={(option) => {
                        selectAndAdvance(() => {
                          setLaneChoiceId(option.id);
                          setValue(
                            "lane",
                            option.value as FormValues["lane"],
                            { shouldValidate: true }
                          );
                        });
                      }}
                    />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <MaskText
                    as="h1"
                    className="max-w-[20ch] text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[-0.035em] text-pc-white"
                  >
                    Brand or business name?
                  </MaskText>
                  <input
                    className={cn(inputClass, "mt-8")}
                    placeholder="Brand name"
                    aria-label="Brand name"
                    onKeyDown={onEnter}
                    {...register("brand_name")}
                  />
                </>
              )}

              {step === 4 && (
                <>
                  <MaskText
                    as="h1"
                    className="max-w-[20ch] text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[-0.035em] text-pc-white"
                  >
                    Where can I see you?
                  </MaskText>
                  <p className="mt-3 text-[15px] text-pc-muted">
                    At least one handle or a website.
                  </p>
                  <div className="mt-8 space-y-6">
                    {(
                      [
                        ["socials.instagram", "Instagram"],
                        ["socials.tiktok", "TikTok"],
                        ["socials.youtube", "YouTube"],
                      ] as const
                    ).map(([name, label]) => (
                      <div key={name} className="flex items-center gap-2">
                        <span className="text-pc-muted">@</span>
                        <input
                          className={inputClass}
                          placeholder={label}
                          aria-label={label}
                          onKeyDown={onEnter}
                          {...register(name)}
                        />
                      </div>
                    ))}
                    <input
                      className={inputClass}
                      placeholder="Website or store link (optional)"
                      aria-label="Website"
                      onKeyDown={onEnter}
                      {...register("website")}
                    />
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <MaskText
                    as="h1"
                    className="max-w-[22ch] text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[-0.035em] text-pc-white"
                  >
                    Audience size on your main platform?
                  </MaskText>
                  <div className="mt-8">
                    <ChoiceCards
                      selectedId={followerRange ?? null}
                      options={FOLLOWER_RANGE_OPTIONS.map((v) => ({
                        id: v,
                        label: v,
                        value: v,
                      }))}
                      onSelect={(option) => {
                        selectAndAdvance(() => {
                          setValue(
                            "follower_range",
                            option.value as FormValues["follower_range"],
                            { shouldValidate: true }
                          );
                        });
                      }}
                    />
                  </div>
                </>
              )}

              {step === 6 && (
                <>
                  <MaskText
                    as="h1"
                    className="max-w-[22ch] text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[-0.035em] text-pc-white"
                  >
                    Do you already have something you sell?
                  </MaskText>
                  <div className="mt-8">
                    <ChoiceCards
                      selectedId={hasProduct ?? null}
                      options={HAS_PRODUCT_OPTIONS}
                      onSelect={(option) => {
                        selectAndAdvance(() => {
                          setValue(
                            "has_product",
                            option.value as FormValues["has_product"],
                            { shouldValidate: true }
                          );
                        });
                      }}
                    />
                  </div>
                </>
              )}

              {step === 7 && (
                <>
                  <MaskText
                    as="h1"
                    className="max-w-[20ch] text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[-0.035em] text-pc-white"
                  >
                    Current monthly revenue?
                  </MaskText>
                  <div className="mt-8">
                    <ChoiceCards
                      selectedId={revenueRange ?? null}
                      options={REVENUE_RANGE_OPTIONS.map((v) => ({
                        id: v,
                        label: v,
                        value: v,
                      }))}
                      onSelect={(option) => {
                        selectAndAdvance(() => {
                          setValue(
                            "revenue_range",
                            option.value as FormValues["revenue_range"],
                            { shouldValidate: true }
                          );
                        });
                      }}
                    />
                  </div>
                </>
              )}

              {step === 8 && (
                <>
                  <MaskText
                    as="h1"
                    className="max-w-[22ch] text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[-0.035em] text-pc-white"
                  >
                    What&apos;s actually broken right now?
                  </MaskText>
                  <p className="mt-3 text-[15px] text-pc-muted">
                    Be specific. This is the question I read first.
                  </p>
                  <textarea
                    rows={4}
                    className={cn(inputClass, "mt-8 resize-none")}
                    placeholder="Type your answer"
                    aria-label="Biggest bottleneck"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        void next();
                      }
                    }}
                    {...register("biggest_bottleneck")}
                  />
                </>
              )}

              {step === 9 && (
                <>
                  <MaskText
                    as="h1"
                    className="max-w-[24ch] text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[-0.035em] text-pc-white"
                  >
                    If this works, what does the next 90 days look like?
                  </MaskText>
                  <textarea
                    rows={4}
                    className={cn(inputClass, "mt-8 resize-none")}
                    placeholder="Type your answer"
                    aria-label="90 day goal"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        void next();
                      }
                    }}
                    {...register("goal_90_days")}
                  />
                </>
              )}

              {step === 10 && (
                <>
                  <MaskText
                    as="h1"
                    className="max-w-[20ch] text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[-0.035em] text-pc-white"
                  >
                    How soon do you want to start?
                  </MaskText>
                  <div className="mt-8">
                    <ChoiceCards
                      selectedId={readyToStart ?? null}
                      options={READY_TO_START_OPTIONS.map((v) => ({
                        id: v,
                        label: v,
                        value: v,
                      }))}
                      onSelect={(option) => {
                        selectAndAdvance(() => {
                          setValue(
                            "ready_to_start",
                            option.value as FormValues["ready_to_start"],
                            { shouldValidate: true }
                          );
                        });
                      }}
                    />
                  </div>
                </>
              )}

              {step === 11 && (
                <>
                  <MaskText
                    as="h1"
                    className="max-w-[22ch] text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[-0.035em] text-pc-white"
                  >
                    {lane === "creator"
                      ? "Creators work on a revenue split"
                      : "Physical brands work on a retainer"}
                  </MaskText>
                  <p className="mt-4 text-[15px] leading-relaxed text-pc-text">
                    {lane === "creator"
                      ? "No upfront fee. We only make money when you do. That keeps incentives aligned."
                      : "Storefront and conversion work runs on a monthly retainer. Scope is set before we start."}
                  </p>
                  <Controller
                    control={control}
                    name="budget_ack"
                    render={({ field }) => (
                      <label className="mt-8 flex cursor-pointer items-start gap-3 text-left text-[15px] text-pc-white">
                        <input
                          type="checkbox"
                          checked={field.value === true}
                          onChange={(e) => field.onChange(e.target.checked)}
                          onKeyDown={onEnter}
                          className="mt-1 h-4 w-4 accent-[var(--pc-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        />
                        <span>
                          {lane === "creator"
                            ? "I understand this is a revenue split, not a flat fee."
                            : "I understand physical product brands work on a monthly retainer."}
                        </span>
                      </label>
                    )}
                  />
                </>
              )}

              {step === 12 && (
                <>
                  <MaskText
                    as="h1"
                    className="max-w-[20ch] text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-[-0.035em] text-pc-white"
                  >
                    How did you find me?
                  </MaskText>
                  <div className="mt-8">
                    <ChoiceCards
                      selectedId={source ?? null}
                      options={SOURCE_OPTIONS.map((v) => ({
                        id: v,
                        label: v,
                        value: v,
                      }))}
                      onSelect={(option) => {
                        setValue(
                          "source",
                          option.value as FormValues["source"],
                          { shouldValidate: true }
                        );
                      }}
                    />
                  </div>
                </>
              )}

              {stepError ? (
                <p className="mt-4 text-sm text-red-400" role="alert">
                  {stepError}
                </p>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="sticky bottom-0 border-t border-pc-line bg-navy-800/95 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md">
          <div className="mx-auto flex max-w-[640px] items-center justify-between gap-4">
            <button
              type="button"
              onClick={back}
              className={cn(
                "inline-flex items-center gap-1 text-sm text-pc-muted transition-colors hover:text-pc-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                step === 0 && "invisible"
              )}
              aria-label="Back"
            >
              <ChevronLeft size={16} />
              Back
            </button>
            <div className="text-right">
              {showContinue ? (
                <>
                  <button
                    type="button"
                    onClick={() => void submitOrNext()}
                    className="inline-flex h-14 items-center justify-center rounded-[4px] bg-accent px-9 text-[17px] font-medium text-navy-900 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {step === TOTAL_STEPS - 1
                      ? "Submit application"
                      : "Continue"}
                  </button>
                  <p className="mt-2 text-[12px] text-pc-muted">press Enter ↵</p>
                </>
              ) : (
                <p className="text-[12px] text-pc-muted">
                  Select an option to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
