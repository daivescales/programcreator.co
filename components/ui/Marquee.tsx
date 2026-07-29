"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
};

export default function Marquee({ children, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div className="flex w-max animate-marquee gap-0 group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
