import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

const statements = [
  {
    title: "Brand deals pay once.",
    body: "You trade your audience's attention for a flat fee, then start over next month. Nothing compounds.",
  },
  {
    title: "Your audience is asking to buy from you.",
    body: "They comment it, they DM it, they ask where to get it. There's just nothing to sell them yet.",
  },
  {
    title: "Building it yourself is a full-time job.",
    body: "Suppliers, storefronts, checkout, fulfillment, delivery, support. It's a second business, and it's not the one you're good at.",
  },
];

export default function Problem() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>The Gap</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.03em] text-white md:text-6xl">
                You built the audience. You&apos;re still renting it out.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-10">
              {statements.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="border-l-2 border-azure-500 pl-6">
                    <h3 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-mist-300">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3}>
              <p className="mt-12 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                That&apos;s the part I take off your plate.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
