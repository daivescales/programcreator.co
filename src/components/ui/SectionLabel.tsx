import { cn } from "@/lib/utils";

export type SectionLabelProps = {
  number: string;
  label: string;
  className?: string;
};

/** Horizontal eyebrow: accent number + hairline + accent label. */
export default function SectionLabel({
  number,
  label,
  className,
}: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="t-label">{number}</span>
      <span aria-hidden className="h-px w-6 shrink-0 bg-accent" />
      <span className="t-label">{label}</span>
    </div>
  );
}
