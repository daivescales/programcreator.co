"use client";

import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
};

export default function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        pauseOnHover && "hover:[&_[data-marquee-track]]:[animation-play-state:paused]",
        className
      )}
    >
      <div
        data-marquee-track
        className={cn(
          "flex w-max",
          !reduced && "animate-marquee",
          reverse && "direction-reverse [animation-direction:reverse]"
        )}
        style={reduced ? undefined : { animationDuration: "40s" }}
      >
        <div className="flex shrink-0 items-center gap-8 px-4">{children}</div>
        <div className="flex shrink-0 items-center gap-8 px-4" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

export type { MarqueeProps };
