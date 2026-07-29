import { ReactNode } from "react";
import Container from "@/components/ui/Container";

export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-base px-6 py-20 md:py-28">
      <Container className="max-w-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-text-faint">
            Last updated: {lastUpdated}
          </p>
        </div>
        <div className="legal-body mt-12 text-left">{children}</div>
      </Container>
    </section>
  );
}
