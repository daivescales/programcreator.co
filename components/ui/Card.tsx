import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/8 bg-navy-900 p-6 md:p-8 transition-all duration-200",
        hover &&
          "hover:border-azure-500/40 hover:shadow-azure-soft hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}
