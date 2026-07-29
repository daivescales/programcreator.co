import Image from "next/image";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Stat from "@/components/ui/Stat";

// TODO: replace with real case studies before launch
const caseStudies = [
  {
    category: "Clothing Brand",
    handle: "@[HANDLE]",
    headline: "[RESULT HEADLINE]",
    body: "[Short paragraph describing the partnership outcome. Replace before launch.]",
    image: "/case-study-1.png",
  },
  {
    category: "Info Product",
    handle: "@[HANDLE]",
    headline: "[RESULT HEADLINE]",
    body: "[Short paragraph describing the partnership outcome. Replace before launch.]",
    image: "/case-study-2.png",
  },
];

type ResultsProps = {
  /** Pass true to hide this section until you have real proof. Never publish fake numbers. */
  hidden?: boolean;
};

export default function Results({ hidden = false }: ResultsProps) {
  if (hidden) return null;

  return (
    <Section className="grid-lines relative overflow-hidden">
      <Container className="relative z-10">
        <Reveal>
          <Eyebrow>Proof</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.03em] text-white md:text-6xl">
            Built to make the audience pay for itself.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* TODO: replace placeholder stats before launch */}
          <Reveal>
            <Stat value="[X]+" label="Creators Partnered" />
          </Reveal>
          <Reveal delay={0.05}>
            <Stat value="[X]" label="Products Launched" />
          </Reveal>
          <Reveal delay={0.1}>
            <Stat value="$[X]" label="Generated For Partners" />
          </Reveal>
          <Reveal delay={0.15}>
            <Stat value="[X]" label="Day Average Build" />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* TODO: replace with real case studies before launch */}
          {caseStudies.map((study, i) => (
            <Reveal key={study.category} delay={i * 0.08}>
              <Card className="overflow-hidden p-0">
                <div className="relative aspect-[16/10] bg-navy-800">
                  <Image
                    src={study.image}
                    alt={`${study.category} case study placeholder`}
                    fill
                    className="object-cover opacity-60"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="rounded-md border border-azure-500/40 px-2 py-0.5 text-xs uppercase tracking-wider text-azure-400">
                      {study.category}
                    </span>
                    <span className="text-sm text-mist-500">{study.handle}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">
                    {study.headline}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-300">
                    {study.body}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
