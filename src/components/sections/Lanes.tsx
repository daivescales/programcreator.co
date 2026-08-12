"use client";

import Link from "next/link";
import { MaskLines, Reveal } from "@/components/motion";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

function LaneColumn({
  lane,
  barClass,
}: {
  lane: typeof copy.lanes.laneA | typeof copy.lanes.laneB;
  barClass: string;
}) {
  return (
    <article>
      <div aria-hidden className={cn("mb-5 h-0.5 w-11 animate-bar-breathe", barClass)} />
      <p className="t-label">{lane.label}</p>
      <h3 className="t-h3 mt-2">{lane.title}</h3>

      <div className="mt-8 space-y-7">
        {lane.rows.map((row) => (
          <div key={row.label}>
            <p className="t-label">{row.label}</p>
            {"emphasize" in row && row.emphasize ? (
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
      <SectionLabel number={copy.lanes.number} label={copy.lanes.label} />

      <Heading
        as="h2"
        text={copy.lanes.heading}
        className="mt-6 max-w-[14ch]"
      />

      <MaskLines delay={0.12} className="t-body mt-5 max-w-[52ch]">
        {copy.lanes.body}
      </MaskLines>

      <Reveal delay={0.2}>
        <div className="mt-14 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-16">
          <LaneColumn lane={copy.lanes.laneA} barClass="bg-accent" />
          <LaneColumn
            lane={copy.lanes.laneB}
            barClass="bg-accent/45 [animation-delay:2s]"
          />
        </div>
      </Reveal>

      <Reveal delay={0.28}>
        <div className="mt-14">
          <p className="t-label">{copy.lanes.sharedLabel}</p>
          <p className="t-body mt-3">{copy.lanes.sharedBody}</p>
        </div>
      </Reveal>

      <p className="mt-10 text-[15px] text-pc-text">
        {copy.lanes.closingLine}{" "}
        <Link
          href="/apply"
          className="group relative inline-block text-accent"
        >
          {copy.lanes.closingLink}
          <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
        </Link>
      </p>
    </Section>
  );
}
