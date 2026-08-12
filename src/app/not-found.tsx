import CTAButton from "@/components/ui/CTAButton";
import Container from "@/components/ui/Container";
import { copy } from "@/lib/copy";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-navy-800 py-24 text-center">
      <Container>
        <h1 className="t-h2">{copy.system.notFoundTitle}</h1>
        <p className="t-body mx-auto mt-4">{copy.system.notFoundBody}</p>
        <div className="mt-8 flex justify-center">
          <CTAButton href="/">{copy.system.backHome}</CTAButton>
        </div>
      </Container>
    </section>
  );
}
