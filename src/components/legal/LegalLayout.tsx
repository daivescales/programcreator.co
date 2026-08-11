import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/disclaimer", label: "Results Disclaimer" },
] as const;

export type LegalLayoutProps = {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
  /** Current path so the footer omits the self-link. */
  currentPath: (typeof LEGAL_LINKS)[number]["href"] | "/legal";
};

export default function LegalLayout({
  title,
  lastUpdated = "August 11, 2026",
  children,
  currentPath,
}: LegalLayoutProps) {
  const others = LEGAL_LINKS.filter((l) => l.href !== currentPath);

  return (
    <div className="bg-navy-800 py-32">
      <Container>
        <article className="mx-auto max-w-[760px]">
          <Link
            href="/"
            className="mb-10 inline-block text-sm text-pc-muted transition-colors hover:text-pc-white"
          >
            ← Back to home
          </Link>

          <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.035em] text-pc-white">
            {title}
          </h1>
          <p className="mt-4 text-pc-muted">Last updated: {lastUpdated}</p>

          <div className="mt-14 space-y-10">{children}</div>

          <nav
            aria-label="Related legal documents"
            className="mt-16 border-t border-pc-line pt-8"
          >
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-pc-muted">
              Also see
            </p>
            <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {others.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-accent underline-offset-2 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {currentPath !== "/legal" ? (
                <li>
                  <Link
                    href="/legal"
                    className="text-sm text-accent underline-offset-2 hover:underline"
                  >
                    All legal
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
        </article>
      </Container>
    </div>
  );
}

export function LegalSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-pc-line pt-10">
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-pc-white">
        <span className="mr-3 text-accent">{number}</span>
        {title}
      </h2>
      <div className="space-y-4 text-[17px] leading-[1.7] text-pc-text">
        {children}
      </div>
    </section>
  );
}
