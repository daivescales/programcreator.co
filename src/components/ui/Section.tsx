import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  bordered?: boolean;
};

export default function Section({
  children,
  className,
  id,
  bordered = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-section py-28 md:py-40",
        bordered && "border-t border-pc-line",
        className
      )}
    >
      {children}
    </section>
  );
}
