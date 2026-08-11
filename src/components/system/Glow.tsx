import { cn } from "@/lib/utils";

export type GlowProps = {
  className?: string;
};

/** Static soft glow bloom (hero + Final CTA only). Not animated. */
export default function Glow({ className }: GlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute left-1/2 top-1/2 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pc-glow blur-[110px] opacity-90" />
    </div>
  );
}
