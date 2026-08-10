import { cn } from "@/lib/utils";

type AuroraProps = {
  className?: string;
};

export default function Aurora({ className }: AuroraProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        className="animate-aurora-drift absolute -left-[10%] top-[-20%] h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,var(--pc-glow),transparent_70%)] blur-3xl"
      />
      <div
        className="animate-aurora-drift absolute -right-[5%] bottom-[-25%] h-[50%] w-[50%] rounded-full bg-[radial-gradient(circle,var(--pc-glow),transparent_70%)] blur-3xl [animation-delay:-12s]"
      />
    </div>
  );
}
