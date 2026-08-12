"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

export type CTAButtonProps = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-5 text-[14px]",
  md: "h-12 px-7 text-[15px]",
  lg: "h-[3.25rem] px-8 text-[16px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-navy-900 hover:-translate-y-px hover:bg-accent-2 hover:shadow-[0_0_28px_var(--pc-glow)]",
  ghost:
    "border border-pc-line bg-transparent text-pc-white hover:-translate-y-px hover:border-pc-line-2 hover:bg-pc-surface",
};

export default function CTAButton({
  children,
  href,
  variant = "primary",
  size = "lg",
  className,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-control font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-200",
        sizes[size],
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
