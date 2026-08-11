"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { HandCircle } from "@/components/marks";
import { MaskLines, Reveal } from "@/components/motion";
import Annotation from "@/components/ui/Annotation";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";

const included = [
  "content angles that drive traffic",
  "ongoing conversion iteration",
  "tracking set up properly",
  "direct access to me rather than an account manager",
] as const;

type LanePanel = {
  key: "a" | "b";
  title: string;
  subtitle: string;
  featured: boolean;
  rows: { label: string; value: ReactNode }[];
};

const lanes: LanePanel[] = [
  {
    key: "a",
    title: "Lane A",
    subtitle: "Creators and digital brands",
    featured: true,
    rows: [
      {
        label: "Who it's for",
        value:
          "You have an audience. You do not have a product, or the one you have does not convert.",
      },
      {
        label: "What I build",
        value:
          "Digital product from scratch, sales page, checkout flow, store page rebuild.",
      },
      {
        label: "How I'm paid",
        value: (
          <p className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.03em] text-pc-white">
            <HandCircle variant={1}>Revenue split</HandCircle>
          </p>
        ),
      },
      {
        label: "When I'm paid",
        value: "Only when it sells. No deposit, nothing upfront.",
      },
      {
        label: "Why it works this way",
        value:
          "If it does not sell, I do not get paid. That is exactly why I am picky about who I take on.",
      },
    ],
  },
  {
    key: "b",
    title: "Lane B",
    subtitle: "Physical product brands",
    featured: false,
    rows: [
      {
        label: "Who it's for",
        value:
          "You have inventory and traffic. The site is where the sale is dying.",
      },
      {
        label: "What I build",
        value:
          "Full storefront rebuild, product pages, checkout and cart recovery.",
      },
      {
        label: "How I'm paid",
        value: (
          <p className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold tracking-[-0.03em] text-pc-white">
            Monthly retainer
          </p>
        ),
      },
      {
        label: "When I'm paid",
        value: "Flat monthly fee, billed in advance.",
      },
      {
        label: "Why it works this way",
        value:
          "Physical brands carry real costs and thinner margins, so a split does not make sense. A retainer keeps the work continuous and the incentives clean.",
      },
    ],
  },
];

function LaneCard({ lane }: { lane: LanePanel }) {
  return (
    <article
      className={
        lane.featured
          ? "rounded-panel border border-accent/30 bg-navy-700 p-8 md:p-10"
          : "rounded-panel border border-pc-line bg-navy-750 p-8 md:p-10"
      }
    >
      <p
        className={
          lane.featured
            ? "text-[12px] uppercase tracking-[0.18em] text-accent"
            : "text-[12px] uppercase tracking-[0.18em] text-pc-muted"
        }
      >
        {lane.title}
      </p>
      <h3 className="mt-2 text-[clamp(1.15rem,1.9vw,1.4rem)] font-semibold tracking-[-0.03em] text-pc-white">
        {lane.subtitle}
      </h3>

      <div className="mt-8 space-y-0">
        {lane.rows.map((row, index) => (
          <div
            key={row.label}
            className={
              index === 0
                ? "pb-6"
                : index === lane.rows.length - 1
                  ? "border-t border-pc-line pt-6"
                  : "border-t border-pc-line py-6"
            }
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-pc-muted">
              {row.label}
            </p>
            <div className="mt-3 text-[16px] leading-[1.65] text-pc-text">
              {row.value}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function Lanes() {
  return (
    <Section id="lanes" tone="800" className="scroll-mt-section">
      <SectionLabel number="02" label="Two lanes" />

      <Heading
        as="h2"
        text="Two lanes. The _same_ work."
        underlineVariant={2}
        className="mt-6 max-w-[14ch]"
      />

      <MaskLines
        delay={0.12}
        className="mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-pc-text"
      >
        {
          "The job is identical in both. Turn attention into something people buy. The only thing that changes is how I get paid."
        }
      </MaskLines>

      <Reveal delay={0.2}>
        <div className="relative mt-14">
          <div className="mb-3 lg:absolute lg:-top-2 lg:left-0 lg:mb-0 lg:-translate-y-full">
            <div className="hidden lg:block">
              <Annotation arrow="ltr" arrowPosition="after">
                most people land here
              </Annotation>
            </div>
            <p className="hand text-[16px] lg:hidden">most people land here</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {lanes.map((lane) => (
              <LaneCard key={lane.key} lane={lane} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.28}>
        <div className="mt-10">
          <p className="text-[11px] uppercase tracking-[0.18em] text-pc-muted">
            Both lanes include
          </p>
          <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2">
            {included.map((item, index) => (
              <li
                key={item}
                className="flex items-center gap-3 text-[15px] text-pc-text"
              >
                {index > 0 && (
                  <span aria-hidden className="hidden text-pc-muted sm:inline">
                    ·
                  </span>
                )}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <p className="mt-10 text-[15px] text-pc-muted">
        Not sure which lane you are in. That is what the call is for.{" "}
        <Link
          href="/apply"
          className="group relative inline-block text-accent"
        >
          Apply
          <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
        </Link>
      </p>
    </Section>
  );
}
