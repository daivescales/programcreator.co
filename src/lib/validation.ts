import { z } from "zod";

export const LANE_VALUES = ["creator", "physical"] as const;
export const HAS_PRODUCT_VALUES = ["yes", "no", "sort_of"] as const;

export const FOLLOWER_RANGE_OPTIONS = [
  "Under 5k",
  "5k-25k",
  "25k-100k",
  "100k+",
] as const;

export const INVESTMENT_RANGE_OPTIONS = [
  "Nothing right now",
  "Under $1,000",
  "$1,000 to $3,000",
  "$3,000 to $10,000",
  "$10,000 or more",
] as const;

export const READY_TO_START_OPTIONS = [
  "Immediately",
  "Within a month",
  "Just exploring",
] as const;

function blankToUndefined(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

const optionalText = z.preprocess(blankToUndefined, z.string().optional());

export const leadSchema = z
  .object({
    full_name: z
      .string()
      .trim()
      .min(1, "I need your name so I know who I'm talking to."),
    email: z.email("I need an email to get back to you."),
    brand_name: z
      .string()
      .trim()
      .min(1, "What do you call the brand or business?"),
    lane: z.enum(LANE_VALUES, {
      error: "Pick the option that fits you best.",
    }),
    socials: z.object({
      instagram: optionalText,
      tiktok: optionalText,
      youtube: optionalText,
      website: optionalText,
    }),
    follower_range: z.enum(FOLLOWER_RANGE_OPTIONS, {
      error: "Pick an audience size so I know the scale.",
    }),
    has_product: z.enum(HAS_PRODUCT_VALUES, {
      error: "Tell me whether something is already for sale.",
    }),
    biggest_bottleneck: z
      .string()
      .trim()
      .min(20, "Give me a bit more. At least a couple of sentences."),
    investment_range: z.enum(INVESTMENT_RANGE_OPTIONS, {
      error: "Pick what you can put behind a launch.",
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
      error: "Something went wrong. Refresh and try again.",
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
        message: "Drop at least one handle or a website so I can find you.",
      });
    }

    const qualified = data.qualified !== false;

    if (qualified) {
      if (!data.ready_to_start) {
        ctx.addIssue({
          code: "custom",
          path: ["ready_to_start"],
          message: "How soon do you want to start?",
        });
      }
      if (data.terms_ack !== true) {
        ctx.addIssue({
          code: "custom",
          path: ["terms_ack"],
          message: "Check the box so we're aligned before you send this.",
        });
      }
      if (data.investment_range === "Nothing right now") {
        ctx.addIssue({
          code: "custom",
          path: ["investment_range"],
          message: "Pick what you can put behind a launch.",
        });
      }
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;
export type LeadFormValues = z.input<typeof leadSchema>;

export type LeadRecord = Omit<LeadInput, "company_website" | "startedAt">;
