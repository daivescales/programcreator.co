import {
  CountUp,
  IndexRow,
  Reveal,
  StaggerList,
} from "@/components/motion";
import Heading from "@/components/ui/Heading";
import Spine from "@/components/ui/Spine";

// TODO: replace with real figures before launch
export const proofStats = [
  { value: 34, suffix: "%", label: "Avg. conversion lift" },
  { value: 11, suffix: "", label: "Products shipped" },
  { value: 4, suffix: "", label: "Active brands" },
] as const;

// TODO: replace with real client results before launch
export const proofResults = [
  {
    stat: "+38%",
    client: "Creator digital product",
    meta: "Fitness creator · Digital",
    quote:
      "Went from a freebie that never converted to a paid program people finish buying on their phones.",
  },
  {
    stat: "+22%",
    client: "Coaching program",
    meta: "Business coach · Program",
    quote:
      "The page finally matches the way I sell on calls. Close rate moved without buying more ads.",
  },
  {
    stat: "+19%",
    client: "Clothing brand storefront",
    meta: "Apparel · Physical",
    quote:
      "Traffic was fine. The old site leaked on mobile. Rebuild fixed checkout and product pages.",
  },
] as const;

export default function Proof() {
  return (
    <Spine
      id="proof"
      number="04"
      label="PROOF"
      className="border-t border-pc-line py-28 md:py-36"
    >
      <Heading as="h2" text="Receipts." className="max-w-[10ch]" />

      <Reveal delay={0.1}>
        <div className="mt-12 grid grid-cols-1 border-y border-pc-line sm:grid-cols-3">
          {proofStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-0 py-8 sm:px-6 ${
                index > 0
                  ? "border-t border-pc-line sm:border-t-0 sm:border-l"
                  : ""
              }`}
            >
              <p className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] text-pc-white">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-pc-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <StaggerList className="mt-4 border-t border-pc-line">
        {proofResults.map((result) => (
          <IndexRow
            key={result.client}
            className="grid grid-cols-1 items-start gap-4 py-8 md:grid-cols-12 md:gap-6"
          >
            <p className="text-[20px] font-semibold tracking-[-0.03em] text-accent md:col-span-1">
              {result.stat}
            </p>
            <div className="md:col-span-3">
              <p
                data-index-label
                className="text-[15px] text-pc-white transition-transform duration-200 group-hover:translate-x-1.5"
              >
                {result.client}
              </p>
              <p className="mt-1 text-[13px] text-pc-muted">{result.meta}</p>
            </div>
            <p className="max-w-[58ch] text-[17px] leading-[1.6] text-pc-text md:col-span-8">
              {result.quote}
            </p>
          </IndexRow>
        ))}
      </StaggerList>

      <p className="mt-8 text-[12px] text-pc-muted">
        Results are from past client work. Outcomes depend on your audience,
        offer, and market.
      </p>
    </Spine>
  );
}
