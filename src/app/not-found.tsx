import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-navy-800 py-24 text-center">
      <Container>
        <p className="t-label mb-4 text-accent">404</p>
        <h1 className="t-h2">This page does not exist.</h1>
        <p className="t-body mx-auto mt-4">
          The link may be broken, or the page may have moved.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href="/apply">Apply to work with me</CTAButton>
          <CTAButton href="/" variant="ghost">
            Back home
          </CTAButton>
        </div>
        <p className="t-small mt-6 text-pc-muted">
          Or read the{" "}
          <Link href="/#faq" className="text-accent underline underline-offset-4">
            FAQ
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
