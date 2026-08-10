import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-pc-blue">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-semibold tracking-tight text-pc-ink",
          "text-[clamp(2rem,4vw,3rem)] leading-[1.1]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-[58ch] text-lg leading-relaxed text-pc-body",
            center && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
