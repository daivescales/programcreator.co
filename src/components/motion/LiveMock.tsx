"use client";

/**
 * LiveMock — ambient 7s CSS loop: chrome → skeletons → CTA → cursor → click → sold → fade reset.
 * Transform + opacity only.
 */

import { useId } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type LiveMockProps = {
  className?: string;
};

export default function LiveMock({ className }: LiveMockProps) {
  const reduced = usePrefersReducedMotion();
  const uid = useId().replace(/:/g, "");

  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden border border-pc-line bg-navy-900",
        className
      )}
    >
      <style>{`
        @keyframes pc-mock-bar-${uid} {
          0%, 8% { transform: scaleX(0); opacity: 0.4; }
          22%, 88% { transform: scaleX(1); opacity: 1; }
          94%, 100% { transform: scaleX(1); opacity: 0; }
        }
        @keyframes pc-mock-btn-${uid} {
          0%, 28% { opacity: 0; transform: scale(0.96); }
          36%, 88% { opacity: 1; transform: scale(1); }
          94%, 100% { opacity: 0; transform: scale(1); }
        }
        @keyframes pc-mock-cursor-${uid} {
          0%, 40% { opacity: 0; transform: translate(8%, 72%); }
          48% { opacity: 1; transform: translate(8%, 72%); }
          62% { opacity: 1; transform: translate(58%, 58%); }
          68% { opacity: 1; transform: translate(58%, 58%) scale(0.92); }
          72% { opacity: 1; transform: translate(58%, 58%) scale(1); }
          88% { opacity: 1; transform: translate(58%, 58%); }
          94%, 100% { opacity: 0; transform: translate(58%, 58%); }
        }
        @keyframes pc-mock-click-${uid} {
          0%, 66% { transform: scale(1); }
          68% { transform: scale(0.97); }
          72%, 100% { transform: scale(1); }
        }
        @keyframes pc-mock-sold-${uid} {
          0%, 70% { transform: scaleX(0); opacity: 0; }
          78%, 88% { transform: scaleX(1); opacity: 1; }
          94%, 100% { transform: scaleX(1); opacity: 0; }
        }
        @keyframes pc-mock-fade-${uid} {
          0%, 88% { opacity: 1; }
          94%, 100% { opacity: 0; }
        }
        .pc-mock-run-${uid} {
          animation-duration: 7s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-iteration-count: infinite;
        }
      `}</style>

      <div
        className={cn(
          "relative p-4",
          !reduced && `pc-mock-run-${uid} motion-idle`
        )}
        style={
          reduced
            ? undefined
            : { animationName: `pc-mock-fade-${uid}` }
        }
      >
        {/* Chrome */}
        <div className="mb-4 flex items-center gap-1.5">
          <span className="h-2 w-2 bg-pc-line-2" />
          <span className="h-2 w-2 bg-pc-line-2" />
          <span className="h-2 w-2 bg-pc-line-2" />
          <span className="ml-3 h-2 flex-1 bg-navy-700" />
        </div>

        {/* Skeleton bars */}
        {[0.92, 0.7, 0.55].map((w, i) => (
          <div
            key={i}
            className="mb-2 h-2 origin-left bg-navy-600"
            style={{
              width: `${w * 100}%`,
              ...(reduced
                ? {}
                : {
                    animationName: `pc-mock-bar-${uid}`,
                    animationDuration: "7s",
                    animationIterationCount: "infinite",
                    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    animationDelay: `${i * 0.12}s`,
                  }),
            }}
          />
        ))}

        <div className="mt-5 aspect-[16/9] w-full origin-left bg-navy-700"
          style={
            reduced
              ? undefined
              : {
                  animationName: `pc-mock-bar-${uid}`,
                  animationDuration: "7s",
                  animationIterationCount: "infinite",
                  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  animationDelay: "0.35s",
                }
          }
        />

        {/* Accent button + click scale */}
        <div
          className="relative mt-5 w-full"
          style={
            reduced
              ? undefined
              : {
                  animationName: `pc-mock-click-${uid}`,
                  animationDuration: "7s",
                  animationIterationCount: "infinite",
                  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }
          }
        >
          <div
            className="h-8 w-[42%] bg-accent"
            style={
              reduced
                ? { opacity: 1 }
                : {
                    animationName: `pc-mock-btn-${uid}`,
                    animationDuration: "7s",
                    animationIterationCount: "infinite",
                    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }
            }
          />
          {/* Sold sweep */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 origin-left bg-accent-2/50"
            style={{
              width: "42%",
              ...(reduced
                ? { opacity: 0 }
                : {
                    animationName: `pc-mock-sold-${uid}`,
                    animationDuration: "7s",
                    animationIterationCount: "infinite",
                    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }),
            }}
          />
        </div>

        {/* Cursor glyph */}
        {!reduced && (
          <div
            className="pointer-events-none absolute left-0 top-0 h-3 w-3"
            style={{
              animationName: `pc-mock-cursor-${uid}`,
              animationDuration: "7s",
              animationIterationCount: "infinite",
              animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <svg viewBox="0 0 12 12" className="h-full w-full text-pc-white">
              <path
                d="M1 1 L1 10 L4.2 7.2 L6.8 11 L8.2 10.2 L5.6 6.4 L10 6.4 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
