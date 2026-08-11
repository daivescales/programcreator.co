"use client";

import RuleDraw from "@/components/motion/RuleDraw";
import { cn } from "@/lib/utils";

export type RuleProps = {
  className?: string;
  delay?: number;
};

/** Full-bleed hairline via RuleDraw. */
export default function Rule({ className, delay }: RuleProps) {
  return (
    <div className={cn("w-full", className)}>
      <RuleDraw delay={delay} className="bg-pc-line" />
    </div>
  );
}
