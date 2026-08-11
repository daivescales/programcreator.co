"use client";

import RuleDraw from "@/components/motion/RuleDraw";
import { cn } from "@/lib/utils";

type RuleProps = {
  className?: string;
  delay?: number;
};

/** Full-bleed 1px hairline using RuleDraw. */
export default function Rule({ className, delay }: RuleProps) {
  return (
    <RuleDraw
      delay={delay}
      className={cn("h-px w-full bg-pc-line origin-left", className)}
    />
  );
}
