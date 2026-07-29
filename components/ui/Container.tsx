import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-6", className)}>
      {children}
    </div>
  );
}
