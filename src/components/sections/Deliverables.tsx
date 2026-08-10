import {
  BarChart3,
  FileText,
  Palette,
  Smartphone,
  Video,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const cards = [
  {
    icon: FileText,
    title: "Offer & positioning doc",
    body: "The exact product, who it's for, what it costs, and why they buy it now rather than later.",
  },
  {
    icon: Palette,
    title: "Brand-consistent design",
    body: "Type, colour, spacing and layout that look like your brand — not like a template someone bought.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first build",
    body: "Your audience is on their phone. The page is designed there first and desktop second.",
  },
  {
    icon: Video,
    title: "Content angles that sell",
    body: "A set of hooks and content structures built to push people from feed to page without sounding like an ad.",
  },
  {
    icon: BarChart3,
    title: "Numbers you can read",
    body: "Tracking set up properly so you can see what's converting instead of guessing.",
  },
] as const;

function PageMockup() {
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-pc-line bg-pc-white">
      <div className="flex items-center gap-1.5 border-b border-pc-line bg-pc-surface px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-pc-line" />
        <span className="h-2 w-2 rounded-full bg-pc-line" />
        <span className="h-2 w-2 rounded-full bg-pc-line" />
      </div>
      <div className="space-y-2.5 p-4">
        <div className="h-2.5 w-1/3 rounded bg-pc-line" />
        <div className="h-3 w-4/5 rounded bg-pc-line" />
        <div className="h-2.5 w-full rounded bg-pc-line" />
        <div className="h-2.5 w-5/6 rounded bg-pc-line" />
        <div className="h-2.5 w-2/3 rounded bg-pc-blue-300" />
        <div className="h-2.5 w-3/4 rounded bg-pc-line" />
        <div className="pt-2">
          <div className="h-7 w-28 rounded-full bg-pc-blue" />
        </div>
      </div>
    </div>
  );
}

export default function Deliverables() {
  return (
    <Section id="deliverables">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What you actually get"
            title="No vague 'strategy'. Real assets."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="h-full rounded-xl border border-pc-line bg-pc-surface p-7">
              <h3 className="text-lg font-semibold tracking-tight text-pc-ink">
                A product page that converts
              </h3>
              <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-pc-body">
                Written and designed from zero. Real hierarchy, real objection
                handling, a checkout that doesn&apos;t lose people on mobile, and
                speed that doesn&apos;t kill the sale.
              </p>
              <PageMockup />
            </div>
          </Reveal>

          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={0.04 * (index + 1)}>
                <div className="h-full rounded-xl border border-pc-line bg-pc-white p-7">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[12px] bg-pc-blue-50 text-pc-blue">
                    <Icon size={22} strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-pc-ink">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-pc-body">
                    {card.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
