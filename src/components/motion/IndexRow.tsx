"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type IndexRowProps = {
  children?: ReactNode;
  href?: string;
  index?: string;
  label?: string;
  meta?: string;
  className?: string;
  onClick?: () => void;
};

export default function IndexRow({
  children,
  href,
  index,
  label,
  meta,
  className,
  onClick,
}: IndexRowProps) {
  const content = children ?? (
    <>
      {index != null && (
        <span className="shrink-0 text-[12px] tabular-nums text-pc-muted">
          {index}
        </span>
      )}
      {label != null && (
        <span
          data-index-label
          className="min-w-0 flex-1 text-[15px] text-pc-text transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
        >
          {label}
        </span>
      )}
      {meta != null && (
        <span className="hidden shrink-0 text-[13px] text-pc-muted sm:inline">
          {meta}
        </span>
      )}
      <ArrowUpRight
        data-index-arrow
        size={16}
        aria-hidden
        className="shrink-0 text-pc-muted transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      />
    </>
  );

  const classes = cn(
    "group flex w-full items-center gap-4 border-b border-pc-line py-5 transition-[background-color,border-color] duration-200",
    "hover:border-pc-line-2 hover:bg-white/[0.02]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={cn(classes, "text-left")} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div className={classes}>{content}</div>;
}
