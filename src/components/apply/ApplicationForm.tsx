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
import MaskText from "@/components/motion/MaskText";
import Glow from "@/components/system/Glow";
import {
  EASE_IN,
  EASE_OUT,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { site } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import {
  FOLLOWER_RANGE_OPTIONS,
  leadSchema,
  READY_TO_START_OPTIONS,
  type LeadInput,
} from "@/lib/validation";

const STORAGE_KEY = "pc_apply_draft";
const TOTAL_STEPS = 10;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const AUTO_ADVANCE_MS = 280;

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
  ready_to_start: (typeof READY_TO_START_OPTIONS)[number] | undefined;
  terms_ack: boolean;
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
  ready_to_start: undefined,
  terms_ack: false,
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
  {
    id: "creator",
    label: "I'm a creator with an audience",
    value: "creator",
  },
  {
    id: "physical",
    label: "I run a physical product brand",
    value: "physical",
  },
  {
    id: "both",
    label: "Both — audience and physical products",
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
  ["socials.instagram", "socials.tiktok", "socials.youtube", "socials.website"],
  ["follower_range"],
  ["has_product"],
  ["biggest_bottleneck"],
  ["ready_to_start"],
  ["terms_ack"],
];

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
          <span className="text-[22px] text-pc-muted md:text-[26px]" aria-hidden>
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
            "peer w-full border-0 bg-transparent py-3 text-[22px] text-pc-white caret-accent outline-none md:text-[26px]",
            "placeholder:text-pc-muted/55"
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
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100"
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
}: {
  options: Choice[];
  value?: string;
  onSelect: (choice: Choice) => void;
  error?: string;
  shake?: boolean;
}) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div
      className={cn(
        "space-y-2",
        shake && "animate-[field-shake_0.35s_ease-in-out]"
      )}
      role="radiogroup"
    >
      {options.map((option, i) => {
        const selected = value === option.id;
        const letter = LETTERS[i] ?? String(i + 1);
        return (
          <motion.button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(option)}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { duration: 0.35, delay: i * 0.05, ease: EASE_IN }
            }
            className={cn(
              "group flex w-full items-center gap-4 border px-6 py-5 text-left transition-[border-color,background-color,transform] duration-[160ms]",
              selected
                ? "border-accent bg-accent/[0.08]"
                : "border-pc-line bg-transparent hover:translate-x-1 hover:border-pc-line-2 hover:bg-white/[0.03]"
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center border text-[11px] font-medium",
                selected
                  ? "border-accent text-accent"
                  : "border-pc-line text-pc-muted"
              )}
            >
              {letter}
            </span>
            <span className="flex-1 text-[15px] text-pc-white md:text-base">
              {option.label}
            </span>
            <Check
              className={cn(
                "h-4 w-4 shrink-0 text-accent transition-opacity duration-[160ms]",
                selected ? "opacity-100" : "opacity-0"
              )}
              aria-hidden
            />
          </motion.button>
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

export default function ApplicationForm() {
  const router = useRouter();
  const reduceMotion = usePrefersReducedMotion();
  const focusRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [laneChoiceId, setLaneChoiceId] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

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
          // Keep original start time across draft restores so a late-step
          // refresh + quick submit isn't treated as bot spam (fake OK).
          if (
            typeof draft.values.startedAt === "number" &&
            Number.isFinite(draft.values.startedAt) &&
            draft.values.startedAt > 0
          ) {
            restoredStartedAt = draft.values.startedAt;
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
          })
        );
      } catch {
        // ignore
      }
    };

    // Persist immediately so startedAt survives a refresh before the first edit.
    persist(getValues());

    const sub = watch((values) => {
      persist(values as FormValues);
    });
    return () => sub.unsubscribe();
  }, [watch, hydrated, step, laneChoiceId, getValues]);

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
    setShake(false);
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

  const triggerShake = useCallback(() => {
    setShake(true);
    window.setTimeout(() => setShake(false), 400);
  }, []);

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
          message: "Drop at least one handle or a website so I can find you.",
        });
        triggerShake();
        return false;
      }
    }
    return true;
  }, [step, trigger, getValues, setError, triggerShake]);

  const goTo = useCallback((next: number) => {
    setStep(next);
  }, []);

  const next = useCallback(async () => {
    if (!(await validateStep())) return;
    if (step < TOTAL_STEPS - 1) goTo(step + 1);
  }, [goTo, step, validateStep]);

  const back = useCallback(() => {
    if (step > 0) goTo(step - 1);
  }, [goTo, step]);

  const selectAndAdvance = useCallback((apply: () => void) => {
    apply();
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
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
        8: READY_TO_START_OPTIONS.map((v) => ({ id: v, label: v, value: v })),
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
        if (step === TOTAL_STEPS - 1) {
          void handleSubmit(onSubmit)();
        } else {
          void next();
        }
      }
      if (e.key === "Escape") {
        e.preventDefault();
        back();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // onSubmit defined below — intentionally omit to avoid rebind loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    step,
    submitting,
    selectAndAdvance,
    setValue,
    next,
    back,
    handleSubmit,
  ]);

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const payload: LeadInput = leadSchema.parse(values);
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Could not submit. Try again.");
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
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    }
  }

  const onContinueKey = (e: ReactKeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (step === TOTAL_STEPS - 1) void handleSubmit(onSubmit)();
      else void next();
    }
  };

  const stepLabel = String(step + 1).padStart(2, "0");
  const progress = (step + 1) / TOTAL_STEPS;

  const stepError =
    errors.full_name?.message ||
    errors.email?.message ||
    errors.lane?.message ||
    errors.brand_name?.message ||
    errors.socials?.instagram?.message ||
    errors.follower_range?.message ||
    errors.has_product?.message ||
    errors.biggest_bottleneck?.message ||
    errors.ready_to_start?.message ||
    errors.terms_ack?.message;

  const variants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.15 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        enter: { opacity: 0, y: 20 },
        center: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.38, ease: EASE_IN },
        },
        exit: {
          opacity: 0,
          y: -20,
          transition: { duration: 0.25, ease: EASE_OUT },
        },
      };

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-navy-800">
      <Glow className="opacity-35 [&>div]:left-[18%] [&>div]:top-auto [&>div]:bottom-[-10%] [&>div]:translate-x-0 [&>div]:translate-y-0" />

      <header className="relative z-[2] border-b border-pc-line">
        <div className="flex items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[-0.02em] text-pc-white"
          >
            {site.name}
          </Link>
          <p className="text-[11px] uppercase tracking-[0.2em] text-pc-muted">
            {stepLabel} / {String(TOTAL_STEPS).padStart(2, "0")}
          </p>
        </div>
        <div className="h-0.5 w-full bg-pc-line" aria-hidden>
          <motion.div
            className="h-full origin-left bg-accent"
            initial={false}
            animate={{ scaleX: progress }}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 280, damping: 32 }
            }
            style={{ willChange: "transform" }}
          />
        </div>
      </header>

      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >{`Question ${step + 1} of ${TOTAL_STEPS}`}</div>

      <div className="relative z-[2] flex flex-1 flex-col px-5 pb-8 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto flex w-full max-w-[640px] flex-1 flex-col self-start md:ml-[max(0px,calc((100%-640px)*0.12))]">
          {/* honeypot */}
          <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden opacity-0" aria-hidden>
            <label htmlFor="company_website">Company website</label>
            <input
              id="company_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("company_website")}
            />
          </div>

          <div className="relative flex-1" ref={focusRef}>
            <AnimatePresence mode="wait">
              {!submitting ? (
                <motion.div
                  key={step}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  onKeyDown={onContinueKey}
                  className="w-full"
                >
                  <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-accent">
                    Question {stepLabel}
                  </p>

                  {step === 0 && (
                    <>
                      <MaskText
                        as="h2"
                        className="max-w-[20ch] text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-white"
                      >
                        What&apos;s your name?
                      </MaskText>
                      <div className="mt-8">
                        <UnderlineField
                          id="full_name"
                          placeholder="Full name"
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
                      <MaskText
                        as="h2"
                        className="max-w-[20ch] text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-white"
                      >
                        Where should I reply?
                      </MaskText>
                      <div className="mt-8">
                        <UnderlineField
                          id="email"
                          type="email"
                          placeholder="you@brand.com"
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
                      <MaskText
                        as="h2"
                        className="max-w-[20ch] text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-white"
                      >
                        Which best describes you?
                      </MaskText>
                      <div className="mt-8">
                        <ChoiceRows
                          options={LANE_OPTIONS}
                          value={
                            laneChoiceId ??
                            (lane === "creator" ? "creator" : lane ? "physical" : undefined)
                          }
                          error={errors.lane?.message}
                          shake={shake}
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
                      <MaskText
                        as="h2"
                        className="max-w-[20ch] text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-white"
                      >
                        Brand or business name?
                      </MaskText>
                      <div className="mt-8">
                        <UnderlineField
                          id="brand_name"
                          placeholder="Brand name"
                          error={errors.brand_name?.message}
                          shake={shake}
                          {...register("brand_name")}
                        />
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <MaskText
                        as="h2"
                        className="max-w-[20ch] text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-white"
                      >
                        Where can I see you?
                      </MaskText>
                      <p className="mt-2 text-[15px] text-pc-muted">
                        At least one handle or a website.
                      </p>
                      <div
                        className={cn(
                          "mt-8 space-y-5",
                          shake && "animate-[field-shake_0.35s_ease-in-out]"
                        )}
                      >
                        <UnderlineField
                          id="instagram"
                          placeholder="handle"
                          prefix="@"
                          error={errors.socials?.instagram?.message}
                          {...register("socials.instagram")}
                        />
                        <UnderlineField
                          id="tiktok"
                          placeholder="handle"
                          prefix="@"
                          {...register("socials.tiktok")}
                        />
                        <UnderlineField
                          id="youtube"
                          placeholder="handle or channel"
                          prefix="@"
                          {...register("socials.youtube")}
                        />
                        <UnderlineField
                          id="website"
                          type="url"
                          placeholder="https://yoursite.com"
                          {...register("socials.website")}
                        />
                      </div>
                    </>
                  )}

                  {step === 5 && (
                    <>
                      <MaskText
                        as="h2"
                        className="max-w-[20ch] text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-white"
                      >
                        Audience size on your main platform?
                      </MaskText>
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
                      <MaskText
                        as="h2"
                        className="max-w-[20ch] text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-white"
                      >
                        Do you already sell something?
                      </MaskText>
                      <div className="mt-8">
                        <ChoiceRows
                          options={HAS_PRODUCT_OPTIONS}
                          value={hasProduct}
                          error={errors.has_product?.message}
                          shake={shake}
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
                      <MaskText
                        as="h2"
                        className="max-w-[20ch] text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-white"
                      >
                        What&apos;s actually broken right now?
                      </MaskText>
                      <p className="mt-2 text-[15px] text-pc-muted">
                        Be specific. This is the answer I read first.
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
                          placeholder="What's stuck..."
                          aria-invalid={Boolean(errors.biggest_bottleneck)}
                          className={cn(
                            "peer w-full resize-none border-0 bg-transparent py-3 text-[18px] leading-relaxed text-pc-white caret-accent outline-none md:text-[20px]",
                            "placeholder:text-pc-muted/55"
                          )}
                          {...register("biggest_bottleneck")}
                        />
                        <span
                          aria-hidden
                          className="absolute bottom-0 left-0 h-px w-full bg-pc-line"
                        />
                        <span
                          aria-hidden
                          className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100"
                        />
                        {errors.biggest_bottleneck?.message ? (
                          <p className="mt-2 text-sm text-red-400" role="alert">
                            {errors.biggest_bottleneck.message}
                          </p>
                        ) : null}
                      </div>
                    </>
                  )}

                  {step === 8 && (
                    <>
                      <MaskText
                        as="h2"
                        className="max-w-[20ch] text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-white"
                      >
                        How soon do you want to start?
                      </MaskText>
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

                  {step === 9 && (
                    <>
                      <MaskText
                        as="h2"
                        className="max-w-[20ch] text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-pc-white"
                      >
                        One thing before you send this.
                      </MaskText>
                      <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-pc-text md:text-base">
                        {lane === "creator"
                          ? "This is a revenue split, not a flat fee. I'm paid a percentage of what your product earns, so there's no upfront cost — and no work happens without an active agreement. If the arrangement ends, you keep everything already built, but all further updates stop."
                          : "Physical brands work on a flat monthly retainer. Work continues for as long as the retainer is active. If it ends, you keep everything already built, but all further updates stop and maintenance becomes yours."}
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
                            <label className="flex cursor-pointer items-start gap-3 border border-pc-line px-5 py-4 transition-colors hover:border-pc-line-2">
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                                className="mt-1 h-4 w-4 shrink-0 accent-accent"
                              />
                              <span className="text-[15px] leading-relaxed text-pc-white">
                                I&apos;ve read and accept the{" "}
                                <Link
                                  href="/terms"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-accent underline-offset-2 hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Terms of Service
                                </Link>
                                .
                              </span>
                            </label>
                          )}
                        />
                        {errors.terms_ack?.message ? (
                          <p className="mt-2 text-sm text-red-400" role="alert">
                            {errors.terms_ack.message}
                          </p>
                        ) : null}
                        <p className="mt-4 text-xs leading-relaxed text-pc-muted">
                          Applying doesn&apos;t commit you to anything. I only
                          reach out if I think we&apos;re a good fit.
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
                  className="flex min-h-[40vh] flex-col items-center justify-center"
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
                  <p className="text-[15px] text-pc-muted">
                    Sending your application
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!submitting ? (
            <div className="mt-10 flex items-end justify-between gap-4">
              <div>
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="group inline-flex items-center gap-1.5 text-sm text-pc-muted transition-colors hover:text-pc-white"
                  >
                    <ChevronLeft
                      className="h-4 w-4 transition-transform duration-[160ms] group-hover:-translate-x-[3px]"
                      aria-hidden
                    />
                    Back
                  </button>
                ) : (
                  <span />
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (step === TOTAL_STEPS - 1) void handleSubmit(onSubmit)();
                    else void next();
                  }}
                  className="inline-flex h-12 items-center justify-center bg-accent px-8 text-[15px] font-medium text-navy-900 transition-opacity hover:opacity-90"
                >
                  {step === TOTAL_STEPS - 1
                    ? "Submit application"
                    : "Continue"}
                </button>
                <p className="text-[11px] text-pc-muted">press Enter ↵</p>
              </div>
            </div>
          ) : null}

          {stepError && !submitting ? (
            <span className="sr-only" aria-live="assertive">
              {stepError}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
