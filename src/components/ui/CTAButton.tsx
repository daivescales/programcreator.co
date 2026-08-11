"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import MagneticButton from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

export type CTAButtonProps = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  magneticStrength?: number;
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[13px]",
  md: "h-12 px-7 text-[15px]",
  lg: "h-[3.25rem] px-8 text-[16px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-navy-900 hover:-translate-y-px hover:bg-accent-2",
  ghost:
    "border border-pc-line bg-transparent text-pc-white hover:-translate-y-px hover:border-pc-line-2 hover:bg-white/[0.03]",
};

export default function CTAButton({
  children,
  href,
  variant = "primary",
  size = "lg",
  className,
  magneticStrength = 5,
}: CTAButtonProps) {
  return (
    <MagneticButton strength={magneticStrength}>
      <Link
        href={href}
        className={cn(
          "inline-flex items-center justify-center rounded-control font-medium transition-[background-color,border-color,color,transform] duration-[160ms]",
          sizes[size],
          variants[variant],
          className
        )}
      >
        {children}
      </Link>
    </MagneticButton>
  );
}
