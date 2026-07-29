import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-500 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-azure-500 text-white shadow-azure hover:bg-azure-400 hover:shadow-azure-soft",
  secondary:
    "bg-transparent text-white border border-mist-700 hover:border-azure-400",
  ghost:
    "bg-transparent text-mist-100 relative after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-azure-400 after:transition-all after:duration-200 hover:after:w-full hover:text-white rounded-none px-0",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    variant !== "ghost" && sizes[size],
    variant === "ghost" && size === "sm" && "text-xs",
    variant === "ghost" && size === "md" && "text-sm py-1",
    variant === "ghost" && size === "lg" && "text-base py-1",
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
