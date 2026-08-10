import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-pc-white py-24 text-center">
      <Container>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-pc-ink">
          This page does not exist.
        </h1>
        <p className="mx-auto mt-4 max-w-[50ch] text-lg text-pc-body">
          The link may be broken, or the page may have moved.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href="/apply">Apply to work with me</CTAButton>
          <CTAButton href="/" variant="ghost">
            Back home
          </CTAButton>
        </div>
        <p className="mt-6 text-sm text-pc-muted">
          Or read the{" "}
          <Link href="/#faq" className="text-pc-blue underline underline-offset-4">
            FAQ
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
