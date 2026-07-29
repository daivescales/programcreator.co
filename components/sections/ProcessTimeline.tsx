"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const stages = [
  {
    number: "01",
    title: "Apply",
    duration: "5 minutes",
    description:
      "You answer a set of questions about your brand, audience, and goals. 5 minutes.",
  },
  {
    number: "02",
    title: "The Call",
    duration: "45 minutes",
    description:
      "We go through your answers together and I tell you honestly what I'd build and whether it's worth building. 45 minutes.",
  },
  {
    number: "03",
    title: "The Audit",
    duration: "Week 1",
    description:
      "I go deep on your audience, content performance, and competitors, then come back with the product and the plan. Week 1.",
  },
  {
    number: "04",
    title: "The Build",
    duration: "Weeks 2–8+",
    description:
      "I build it: product, storefront or platform, checkout, fulfillment or delivery, and every asset around it. You're in every decision. Weeks 2–8+.",
  },
  {
    number: "05",
    title: "The Launch",
    duration: "Launch week",
    description:
      "We launch to your audience with a content plan built around the drop. Launch week.",
  },
  {
    number: "06",
    title: "The Scale",
    duration: "Ongoing",
    description:
      "We read the real numbers, fix what didn't convert, and expand what did. Ongoing.",
  },
];

function TimelineStage({
  stage,
  isLast,
}: {
  stage: (typeof stages)[0];
  isLast: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <li ref={ref} className="relative flex gap-6 md:gap-10">
      <div className="relative flex w-6 shrink-0 flex-col items-center md:w-8">
        <span
          className={cn(
            "relative z-10 mt-1.5 h-3 w-3 rounded-full border-2 transition-all duration-500 md:mt-2 md:h-3.5 md:w-3.5",
            inView
              ? "border-azure-400 bg-azure-400 shadow-azure"
              : "border-mist-700 bg-ink"
          )}
          aria-hidden
        />
        {!isLast ? (
          <span
            className={cn(
              "mt-2 w-px flex-1 transition-colors duration-700",
              inView ? "bg-azure-500/40" : "bg-white/10"
            )}
            aria-hidden
          />
        ) : null}
      </div>

      <div className={cn("pb-14 md:pb-16", isLast && "pb-0 md:pb-0")}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-display text-sm font-bold tracking-wider text-white/25">
            {stage.number}
          </span>
          <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
            {stage.title}
          </h3>
          <span className="text-sm font-medium text-azure-400">
            {stage.duration}
          </span>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist-300">
          {stage.description}
        </p>
      </div>
    </li>
  );
}

export default function ProcessTimeline() {
  return (
    <ol className="relative">
      {stages.map((stage, index) => (
        <TimelineStage
          key={stage.number}
          stage={stage}
          isLast={index === stages.length - 1}
        />
      ))}
    </ol>
  );
}
