import { cn } from "@/lib/utils";

export type SectionLabelProps = {
  number: string;
  label: string;
  className?: string;
};

/** Horizontal eyebrow: accent number + 24px hairline + muted label. */
export default function SectionLabel({
  number,
  label,
  className,
}: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="t-label !tracking-[0.16em] text-accent">{number}</span>
      <span
        aria-hidden
        className="h-px w-6 shrink-0 bg-pc-line-2"
      />
      <span className="t-label">{label}</span>
    </div>
  );
}
