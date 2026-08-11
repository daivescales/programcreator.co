"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type HoverRowProps = {
  children: ReactNode;
  className?: string;
  href?: string;
};

/**
 * Row hover: bg white/[0.02], content shifts 4px right, 200ms.
 * Optional href renders as a link.
 */
export default function HoverRow({ children, className, href }: HoverRowProps) {
  const classes = cn(
    "group block transition-[background-color,transform] duration-200",
    "hover:translate-x-1 hover:bg-white/[0.02]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
