import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Background tone. Defaults to navy-800. */
  tone?: "800" | "750";
  /** When false, children are not wrapped in Container. Default true. */
  contain?: boolean;
};

const tones = {
  "800": "bg-navy-800",
  "750": "bg-navy-750",
} as const;

export default function Section({
  children,
  className,
  id,
  tone = "800",
  contain = true,
}: SectionProps) {
  const inner = contain ? <Container>{children}</Container> : children;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-section py-32 md:py-44",
        tones[tone],
        className
      )}
    >
      {inner}
    </section>
  );
}
