import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="bg-base px-6 py-28 text-center md:py-40">
      <Container>
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base text-text-muted">
          The link may be broken, or the page may have moved.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/apply">Apply</Button>
          <Button href="/" variant="secondary">
            Back home
          </Button>
        </div>
        <p className="mt-8 text-sm text-text-muted">
          Or go to the{" "}
          <Link href="/faq" className="text-sky-500 hover:text-sky-400">
            FAQ
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
