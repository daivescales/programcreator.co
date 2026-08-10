import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

// TODO: replace with real client results before launch
export const resultsData = [
  {
    stat: "+38%",
    label: "Checkout conversion",
    quote:
      "We rebuilt the sales page for a creator's digital template pack. Same traffic, clearer offer, cleaner checkout. Conversion moved in the first two weeks.",
    name: "Maya Chen",
    handle: "Creator · digital products",
    initials: "MC",
  },
  {
    stat: "3 weeks",
    label: "Offer to first sale",
    quote:
      "Built a coaching program page from scratch — positioning, pricing, and funnel. First paid cohort filled from the audience they already had.",
    name: "Jordan Ellis",
    handle: "Coach · program launch",
    initials: "JE",
  },
  {
    stat: "+22%",
    label: "Store conversion",
    quote:
      "Clothing brand storefront rebuild: product pages, cart flow, and social-to-site paths. Same ads, stronger page. Revenue per visitor improved within a month.",
    name: "Alex Rivera",
    handle: "Apparel brand",
    initials: "AR",
  },
] as const;

export default function Results() {
  return (
    <Section id="results" tint>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Results"
            title="What this looks like in practice"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {resultsData.map((result, index) => (
            <Reveal key={result.name} delay={0.06 * index}>
              <article className="flex h-full flex-col rounded-xl border border-pc-line bg-pc-white p-7">
                <div>
                  <p className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-pc-blue">
                    {result.stat}
                  </p>
                  <p className="mt-1 text-[13px] uppercase tracking-wide text-pc-muted">
                    {result.label}
                  </p>
                </div>
                <p className="mt-5 flex-1 text-base leading-relaxed text-pc-body">
                  &ldquo;{result.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pc-blue-100 text-[13px] font-medium text-pc-blue">
                    {result.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-pc-ink">
                      {result.name}
                    </p>
                    <p className="text-[13px] text-pc-muted">{result.handle}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p className="mt-8 text-center text-xs text-pc-muted">
            Results shown are from past client work. Outcomes depend on your
            audience, offer, and market.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
