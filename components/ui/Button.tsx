import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants: Record<Variant, string> = {
  primary:
    "bg-sky-500 text-base font-medium hover:bg-sky-400",
  secondary:
    "bg-transparent text-white border border-line hover:border-sky-500",
};

export default function Button({
  children,
  variant = "primary",
  className,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-lg px-7 py-3.5 text-sm transition-colors duration-150",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
    "disabled:cursor-not-allowed disabled:opacity-50",
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
