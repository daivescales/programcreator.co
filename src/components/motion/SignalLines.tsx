"use client";

/**
 * SignalLines — ambient SVG accent paths for hero only.
 * Stroke-dashoffset CSS loop (8s), staggered. Frozen under reduced motion.
 */

import { useId } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type SignalLinesProps = {
  className?: string;
};

const PATHS = [
  "M -40 180 C 80 40, 220 320, 380 120 S 620 40, 780 200",
  "M -20 260 C 120 100, 280 380, 460 160 S 700 80, 900 240",
  "M 40 80 C 180 200, 300 20, 480 140 S 720 260, 920 100",
  "M -60 320 C 100 220, 240 400, 420 280 S 680 160, 860 300",
  "M 20 140 C 160 60, 320 240, 500 80 S 760 200, 940 60",
  "M -10 220 C 140 300, 260 100, 440 220 S 700 340, 880 180",
];

export default function SignalLines({ className }: SignalLinesProps) {
  const reduced = usePrefersReducedMotion();
  const uid = useId().replace(/:/g, "");

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <style>{`
        @keyframes pc-signal-dash-${uid} {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -240; }
        }
        .pc-signal-${uid} {
          fill: none;
          stroke: var(--pc-accent);
          stroke-width: 1;
          stroke-linecap: round;
          opacity: 0.35;
          stroke-dasharray: 6 14;
        }
        .pc-signal-run-${uid} {
          animation: pc-signal-dash-${uid} 8s linear infinite;
        }
      `}</style>
      <svg
        className="h-full w-full"
        viewBox="0 0 900 400"
        preserveAspectRatio="xMidYMid slice"
      >
        {PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            className={cn(
              `pc-signal-${uid}`,
              !reduced && `pc-signal-run-${uid} motion-idle`
            )}
            style={
              reduced
                ? undefined
                : { animationDelay: `${i * -1.1}s` }
            }
          />
        ))}
      </svg>
    </div>
  );
}
