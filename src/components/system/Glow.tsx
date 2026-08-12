import { cn } from "@/lib/utils";

export type GlowProps = {
  className?: string;
  /** Use cta-pulse instead of glow-drift (FinalCTA). */
  pulse?: boolean;
};

/** Soft glow bloom. Drift by default; FinalCTA can add animate-cta-pulse. */
export default function Glow({ className, pulse = false }: GlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "absolute left-1/2 top-1/2 h-[min(80vw,640px)] w-[min(80vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pc-glow opacity-90 blur-[140px]",
          pulse ? "animate-cta-pulse" : "animate-glow-drift"
        )}
      />
    </div>
  );
}
