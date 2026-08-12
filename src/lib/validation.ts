import { z } from "zod";
import { copy } from "@/lib/copy";

export const LANE_VALUES = ["creator", "physical"] as const;
export const HAS_PRODUCT_VALUES = ["yes", "no", "sort_of"] as const;

export const FOLLOWER_RANGE_OPTIONS = copy.form.questions[6].options;
export const INVESTMENT_RANGE_OPTIONS = copy.form.questions[9].options;
export const READY_TO_START_OPTIONS = copy.form.questions[10].options;

function blankToUndefined(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

const optionalText = z.preprocess(blankToUndefined, z.string().optional());

export const leadSchema = z
  .object({
    full_name: z.string().trim().min(1, copy.validation.name),
    email: z
      .string()
      .trim()
      .min(1, copy.validation.email)
      .email(copy.validation.emailInvalid),
    brand_name: z.string().trim().min(1, copy.validation.brand),
    lane: z.enum(LANE_VALUES, {
      error: copy.validation.choice,
    }),
    socials: z.object({
      instagram: optionalText,
      tiktok: optionalText,
      youtube: optionalText,
      website: optionalText,
    }),
    follower_range: z.enum(FOLLOWER_RANGE_OPTIONS, {
      error: copy.validation.choice,
    }),
    has_product: z.enum(HAS_PRODUCT_VALUES, {
      error: copy.validation.choice,
    }),
    biggest_bottleneck: z
      .string()
      .trim()
      .min(20, copy.validation.bottleneck),
    investment_range: z.enum(INVESTMENT_RANGE_OPTIONS, {
      error: copy.validation.choice,
    }),
    ready_to_start: z.enum(READY_TO_START_OPTIONS).optional(),
    terms_ack: z.boolean().optional().default(false),
    qualified: z.boolean().optional().default(true),
    utm: z
      .object({
        utm_source: optionalText,
        utm_medium: optionalText,
        utm_campaign: optionalText,
        referrer: optionalText,
      })
      .default({
        utm_source: undefined,
        utm_medium: undefined,
        utm_campaign: undefined,
        referrer: undefined,
      }),
    company_website: z.string().optional().default(""),
    startedAt: z.number({
      error: copy.system.errorBody,
    }),
  })
  .superRefine((data, ctx) => {
    const hasSocial =
      Boolean(data.socials.instagram) ||
      Boolean(data.socials.tiktok) ||
      Boolean(data.socials.youtube) ||
      Boolean(data.socials.website);

    if (!hasSocial) {
      ctx.addIssue({
        code: "custom",
        path: ["socials", "instagram"],
        message: copy.validation.socials,
      });
    }

    const qualified = data.qualified !== false;

    if (qualified) {
      if (!data.ready_to_start) {
        ctx.addIssue({
          code: "custom",
          path: ["ready_to_start"],
          message: copy.validation.choice,
        });
      }
      if (data.terms_ack !== true) {
        ctx.addIssue({
          code: "custom",
          path: ["terms_ack"],
          message: copy.validation.checkbox,
        });
      }
      if (data.investment_range === "Nothing right now") {
        ctx.addIssue({
          code: "custom",
          path: ["investment_range"],
          message: copy.validation.choice,
        });
      }
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;
export type LeadFormValues = z.input<typeof leadSchema>;

export type LeadRecord = Omit<LeadInput, "company_website" | "startedAt">;
