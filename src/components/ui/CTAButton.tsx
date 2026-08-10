import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

type CTAButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-[15px]",
  lg: "h-14 px-9 text-[17px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-pc-blue text-white hover:bg-pc-blue-600 shadow-[0_8px_30px_rgba(62,142,247,0.10)] hover:-translate-y-px",
  ghost:
    "border border-pc-line bg-pc-white text-pc-ink hover:bg-pc-surface",
};

export default function CTAButton({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: CTAButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-[10px] font-medium transition-all duration-150",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pc-blue",
    "disabled:pointer-events-none disabled:opacity-50",
    sizes[size],
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
