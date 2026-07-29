import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-surface p-8 text-center transition-colors duration-150",
        "hover:border-sky-500/40",
        className
      )}
    >
      {children}
    </div>
  );
}
