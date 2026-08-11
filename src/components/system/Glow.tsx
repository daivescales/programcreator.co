import { cn } from "@/lib/utils";

export type GlowProps = {
  className?: string;
};

/** Large blurred pc-glow bloom. Ambient CSS drift only (hero + Final CTA). */
export default function Glow({ className }: GlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        className="motion-idle absolute left-1/2 top-1/2 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pc-glow blur-[100px] animate-glow-drift"
      />
    </div>
  );
}
