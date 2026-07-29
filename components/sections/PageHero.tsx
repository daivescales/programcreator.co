import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  label?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  label,
}: PageHeroProps) {
  return (
    <section className="grain relative overflow-hidden bg-ink pb-16 pt-28 md:pb-20 md:pt-36">
      <div className="azure-glow pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative z-10">
        <Reveal>
          {label ? (
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-mist-500">
              {label}
            </p>
          ) : null}
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-300 md:text-lg">
            {description}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
