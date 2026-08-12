"use client";

import Link from "next/link";
import { MaskLines, Reveal } from "@/components/motion";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";

type Lane = {
  key: "a" | "b";
  title: string;
  subtitle: string;
  accent: boolean;
  rows: { label: string; value: string; emphasize?: boolean }[];
};

const lanes: Lane[] = [
  {
    key: "a",
    title: "Lane A",
    subtitle: "Creators and digital brands",
    accent: true,
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
        value: "Revenue split",
        emphasize: true,
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
    accent: false,
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
        value: "Monthly retainer",
        emphasize: true,
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

function LaneColumn({ lane }: { lane: Lane }) {
  return (
    <article>
      <div
        aria-hidden
        className={`mb-5 h-0.5 w-10 ${lane.accent ? "bg-accent" : "bg-pc-line"}`}
      />
      <p className={`t-label ${lane.accent ? "text-accent" : ""}`}>
        {lane.title}
      </p>
      <h3 className="t-h3 mt-2">{lane.subtitle}</h3>

      <div className="mt-8 space-y-7">
        {lane.rows.map((row) => (
          <div key={row.label}>
            <p className="t-label">{row.label}</p>
            {row.emphasize ? (
              <p className="t-h3 mt-1.5">{row.value}</p>
            ) : (
              <p className="t-body mt-1.5">{row.value}</p>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

export default function Lanes() {
  return (
    <Section id="lanes" tone="800">
      <SectionLabel number="02" label="Two lanes" />

      <Heading
        as="h2"
        text="Two lanes. The same work."
        className="mt-6 max-w-[14ch]"
      />

      <MaskLines delay={0.12} className="t-body mt-5 max-w-[52ch]">
        {
          "The job is identical in both. Turn attention into something people buy. The only thing that changes is how I get paid."
        }
      </MaskLines>

      <Reveal delay={0.2}>
        <div className="mt-14 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-16">
          {lanes.map((lane) => (
            <LaneColumn key={lane.key} lane={lane} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.28}>
        <div className="mt-14">
          <p className="t-label">Both lanes include</p>
          <p className="mt-3 text-[15px] leading-[1.65] text-pc-text">
            Content angles that drive traffic, ongoing conversion iteration,
            tracking set up properly, and direct access to me rather than an
            account manager.
          </p>
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
