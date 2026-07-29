import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Section({
  children,
  className,
  id,
  variant = "base",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "base" | "surface";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 text-center md:py-28",
        variant === "base" ? "bg-base" : "bg-surface",
        className
      )}
    >
      {children}
    </section>
  );
}
