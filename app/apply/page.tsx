"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getSupabase } from "@/lib/supabaseClient";

const followerOptions = [
  "Under 10k",
  "10k–50k",
  "50k–200k",
  "200k–1M",
  "1M+",
];

const investmentOptions = [
  "Under $2,000",
  "$2,000–$5,000",
  "$5,000–$10,000",
  "$10,000–$25,000",
  "$25,000+",
];

const buildOptions = [
  "Clothing/Merch Brand",
  "Info Product or Course",
  "Paid Community",
  "Not Sure Yet / Open to Recommendation",
];

const creatorOptions = ["Creator", "Existing Brand/Business", "Both"] as const;

type FormState = {
  fullName: string;
  email: string;
  brandName: string;
  creatorOrBrand: string;
  socialLinks: string;
  followerRange: string;
  currentGoals: string;
  buildInterest: string[];
  investmentRange: string;
  additionalNotes: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  fullName: "",
  email: "",
  brandName: "",
  creatorOrBrand: "",
  socialLinks: "",
  followerRange: "",
  currentGoals: "",
  buildInterest: [],
  investmentRange: "",
  additionalNotes: "",
};

const inputClass =
  "mt-2 w-full border border-black bg-white px-4 py-3 text-sm text-black placeholder:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded-md";

const labelClass = "block text-sm font-medium text-black";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-gray-800">
      <AlertCircle size={14} className="mt-0.5 shrink-0" strokeWidth={2} />
      <span>{message}</span>
    </p>
  );
}

export default function ApplyPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function toggleBuildInterest(option: string) {
    setForm((prev) => {
      const exists = prev.buildInterest.includes(option);
      return {
        ...prev,
        buildInterest: exists
          ? prev.buildInterest.filter((item) => item !== option)
          : [...prev.buildInterest, option],
      };
    });
  }

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!form.brandName.trim()) next.brandName = "Brand or creator name is required.";
    if (!form.creatorOrBrand) next.creatorOrBrand = "Please select an option.";
    if (!form.socialLinks.trim()) next.socialLinks = "Social platform + link is required.";
    if (!form.followerRange) next.followerRange = "Please select an audience size.";
    if (!form.currentGoals.trim()) next.currentGoals = "Current goals are required.";
    if (!form.investmentRange) next.investmentRange = "Please select an investment range.";
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError("");

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await getSupabase().from("applications").insert({
        full_name: form.fullName.trim(),
        email: form.email.trim(),
        brand_name: form.brandName.trim(),
        creator_or_brand: form.creatorOrBrand,
        social_links: form.socialLinks.trim(),
        follower_range: form.followerRange,
        current_goals: form.currentGoals.trim(),
        build_interest: form.buildInterest,
        investment_range: form.investmentRange,
        additional_notes: form.additionalNotes.trim() || null,
      });

      if (error) throw error;
      router.push("/thank-you");
    } catch (err) {
      console.error(err);
      setSubmitError(
        "Something went wrong. Please try again or email [YOUR EMAIL]."
      );
      setSubmitting(false);
    }
  }

  return (
    <Section className="!pt-20 sm:!pt-28 !pb-20">
      <Container className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          Let&apos;s See If We&apos;re a Fit
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-800">
          Answer a few questions about your brand and audience. If it looks like
          a good match, you&apos;ll get access to book an intro call.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-8" noValidate>
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              className={inputClass}
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              autoComplete="name"
            />
            <FieldError message={errors.fullName} />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              autoComplete="email"
            />
            <FieldError message={errors.email} />
          </div>

          <div>
            <label htmlFor="brandName" className={labelClass}>
              Brand or Creator Name
            </label>
            <input
              id="brandName"
              type="text"
              className={inputClass}
              value={form.brandName}
              onChange={(e) => updateField("brandName", e.target.value)}
            />
            <FieldError message={errors.brandName} />
          </div>

          <fieldset>
            <legend className={labelClass}>Are you primarily a</legend>
            <div className="mt-3 space-y-3">
              {creatorOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 text-sm"
                >
                  <input
                    type="radio"
                    name="creatorOrBrand"
                    value={option}
                    checked={form.creatorOrBrand === option}
                    onChange={() => updateField("creatorOrBrand", option)}
                    className="h-4 w-4 accent-black"
                  />
                  {option}
                </label>
              ))}
            </div>
            <FieldError message={errors.creatorOrBrand} />
          </fieldset>

          <div>
            <label htmlFor="socialLinks" className={labelClass}>
              Main social platform + link
            </label>
            <input
              id="socialLinks"
              type="text"
              className={inputClass}
              placeholder="e.g. Instagram - instagram.com/yourhandle"
              value={form.socialLinks}
              onChange={(e) => updateField("socialLinks", e.target.value)}
            />
            <FieldError message={errors.socialLinks} />
          </div>

          <div>
            <label htmlFor="followerRange" className={labelClass}>
              Approximate audience size
            </label>
            <select
              id="followerRange"
              className={inputClass}
              value={form.followerRange}
              onChange={(e) => updateField("followerRange", e.target.value)}
            >
              <option value="">Select a range</option>
              {followerOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError message={errors.followerRange} />
          </div>

          <div>
            <label htmlFor="currentGoals" className={labelClass}>
              What are your current goals?
            </label>
            <textarea
              id="currentGoals"
              rows={4}
              className={`${inputClass} resize-y`}
              placeholder="What are you trying to achieve in the next 6-12 months?"
              value={form.currentGoals}
              onChange={(e) => updateField("currentGoals", e.target.value)}
            />
            <FieldError message={errors.currentGoals} />
          </div>

          <fieldset>
            <legend className={labelClass}>
              What would you want to build for your audience?
            </legend>
            <div className="mt-3 space-y-3">
              {buildOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-start gap-3 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={form.buildInterest.includes(option)}
                    onChange={() => toggleBuildInterest(option)}
                    className="mt-0.5 h-4 w-4 accent-black"
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="investmentRange" className={labelClass}>
              How much are you able to invest to work together?
            </label>
            <select
              id="investmentRange"
              className={inputClass}
              value={form.investmentRange}
              onChange={(e) => updateField("investmentRange", e.target.value)}
            >
              <option value="">Select a range</option>
              {investmentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError message={errors.investmentRange} />
          </div>

          <div>
            <label htmlFor="additionalNotes" className={labelClass}>
              Anything else we should know?{" "}
              <span className="font-normal text-gray-600">(optional)</span>
            </label>
            <textarea
              id="additionalNotes"
              rows={3}
              className={`${inputClass} resize-y`}
              value={form.additionalNotes}
              onChange={(e) => updateField("additionalNotes", e.target.value)}
            />
          </div>

          {submitError && (
            <p className="flex items-start gap-2 text-sm font-semibold text-black">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              {submitError}
            </p>
          )}

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </Container>
    </Section>
  );
}
