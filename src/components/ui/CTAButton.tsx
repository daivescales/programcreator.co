"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import MagneticButton from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

type CTAButtonProps = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  magneticStrength?: number;
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-6 text-sm",
  md: "h-12 px-8 text-[15px]",
  lg: "h-14 px-9 text-[17px]",
};

const variants: Record<Variant, string> = {
  primary:
    "group/cta relative overflow-hidden bg-accent text-navy-900 hover:text-navy-900",
  ghost:
    "border border-pc-line bg-transparent text-white hover:border-pc-line-2 hover:bg-white/[0.03]",
};

export default function CTAButton({
  children,
  href,
  variant = "primary",
  size = "lg",
  className,
  magneticStrength = 8,
}: CTAButtonProps) {
  return (
    <MagneticButton strength={magneticStrength}>
      <Link
        href={href}
        data-cursor
        className={cn(
          "inline-flex items-center justify-center rounded-[4px] font-medium transition-colors duration-[180ms]",
          sizes[size],
          variants[variant],
          className
        )}
      >
        {variant === "primary" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-accent-2/40 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:scale-x-100"
          />
        )}
        <span className="relative z-[1]">{children}</span>
      </Link>
    </MagneticButton>
  );
}
