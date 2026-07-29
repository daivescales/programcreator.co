"use client";

import { ReactNode, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type TocItem = {
  id: string;
  label: string;
};

type LegalLayoutProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
  toc: TocItem[];
};

export default function LegalLayout({
  title,
  lastUpdated,
  children,
  toc,
}: LegalLayoutProps) {
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");

  useEffect(() => {
    const headings = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <div className="bg-ink pb-24 pt-28 md:pt-32">
      <Container>
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[240px_minmax(0,48rem)]">
          <aside className="mb-10 hidden lg:block">
            <nav
              aria-label="On this page"
              className="sticky top-28 space-y-1"
            >
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-mist-500">
                On this page
              </p>
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "block border-l py-1.5 pl-3 text-sm transition-colors",
                    activeId === item.id
                      ? "border-azure-400 text-white"
                      : "border-white/10 text-mist-500 hover:border-mist-500 hover:text-mist-300"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <article>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-sm text-mist-500">
              Last updated: {lastUpdated}
            </p>
            <div className="legal-prose mt-10 max-w-3xl">{children}</div>
          </article>
        </div>
      </Container>
    </div>
  );
}
