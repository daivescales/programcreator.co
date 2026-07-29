import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  light?: boolean;
};

export default function Eyebrow({ children, className, light }: EyebrowProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "block h-px w-6",
          light ? "bg-azure-600" : "bg-azure-400"
        )}
        aria-hidden
      />
      <span
        className={cn(
          "text-xs font-medium uppercase tracking-[0.2em]",
          light ? "text-azure-600" : "text-azure-400"
        )}
      >
        {children}
      </span>
    </div>
  );
}
