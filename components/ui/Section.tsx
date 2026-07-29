import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "dark" | "darker" | "light";
};

const variants = {
  dark: "bg-ink text-mist-300",
  darker: "bg-navy-950 text-mist-300",
  light: "bg-surface text-ink",
};

export default function Section({
  children,
  className,
  id,
  variant = "dark",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-28 lg:py-36", variants[variant], className)}
    >
      {children}
    </section>
  );
}
