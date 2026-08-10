import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Section({
  children,
  className,
  id,
  tint = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tint?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-24 md:py-32 [scroll-margin-top:96px]",
        tint ? "bg-pc-surface" : "bg-pc-white",
        className
      )}
    >
      {children}
    </section>
  );
}
