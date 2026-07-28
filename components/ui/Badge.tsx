import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-gray-800 ${className}`}
    >
      {children}
    </span>
  );
}
