"use client";

import { useEffect, useState } from "react";
import Accordion from "@/components/ui/Accordion";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import type { FAQCategory } from "@/content/faq";
import { cn } from "@/lib/utils";

type FAQCategoriesProps = {
  categories: FAQCategory[];
};

export default function FAQCategories({ categories }: FAQCategoriesProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(category.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop
          );

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  return (
    <Section className="!pt-0">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <nav
            aria-label="FAQ categories"
            className="lg:sticky lg:top-28 lg:w-56 lg:shrink-0 lg:self-start"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-500">
              Categories
            </p>
            <ul className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
              {categories.map((category) => (
                <li key={category.id} className="shrink-0">
                  <a
                    href={`#${category.id}`}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm transition-colors duration-200",
                      activeId === category.id
                        ? "bg-navy-800 text-white"
                        : "text-mist-300 hover:text-white"
                    )}
                    onClick={() => setActiveId(category.id)}
                  >
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 flex-1 space-y-16 md:space-y-20">
            {categories.map((category, index) => (
              <Reveal key={category.id} delay={index * 0.04}>
                <div id={category.id} className="scroll-mt-28">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {category.title}
                  </h2>
                  <div className="mt-6">
                    <Accordion items={category.items} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
