"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type PulseDotProps = {
  className?: string;
};

export default function PulseDot({ className }: PulseDotProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex h-[6px] w-[6px] shrink-0 items-center justify-center",
        className
      )}
    >
      <span className="relative z-[1] h-[6px] w-[6px] rounded-full bg-accent" />
      {!reduced && (
        <span className="motion-idle absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
      )}
    </span>
  );
}
