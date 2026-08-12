import BrandLogo from "@/components/brand/BrandLogo";
import CTAButton from "@/components/ui/CTAButton";
import Container from "@/components/ui/Container";
import { copy } from "@/lib/copy";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-navy-800 py-24 text-center">
      <Container>
        <div className="mb-8 flex justify-center">
          <BrandLogo height={32} />
        </div>
        <h1 className="t-h2">{copy.system.notFoundTitle}</h1>
        <p className="t-body mx-auto mt-4">{copy.system.notFoundBody}</p>
        <div className="mt-8 flex justify-center gap-3">
          <CTAButton href="/apply">{copy.hero.primaryCta}</CTAButton>
          <CTAButton href="/" variant="ghost">
            {copy.system.backHome}
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
