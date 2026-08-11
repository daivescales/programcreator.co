import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export type SpineProps = {
  number: string;
  label: string;
  children: ReactNode;
  id?: string;
  className?: string;
};

/**
 * THE SPINE — lg+ 12-col: sticky rail cols 1–2, content cols 3–12.
 * Mobile: horizontal number | hairline | label above content.
 */
export default function Spine({
  number,
  label,
  children,
  id,
  className,
}: SpineProps) {
  const displayNumber = number.startsWith("(") ? number : `(${number})`;

  return (
    <section id={id} className={cn("scroll-mt-section", className)}>
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Mobile rail */}
          <div className="flex items-center gap-4 lg:hidden">
            <span className="shrink-0 text-[13px] font-medium uppercase tracking-[0.2em] text-accent">
              {displayNumber}
            </span>
            <span aria-hidden className="h-px flex-1 bg-pc-line" />
            <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-pc-muted">
              {label}
            </span>
          </div>

          {/* Desktop sticky rail — cols 1–2 */}
          <div className="relative hidden lg:col-span-2 lg:block">
            <div className="sticky top-32 flex flex-col items-start gap-6">
              <span className="text-[13px] font-medium uppercase tracking-[0.2em] text-accent">
                {displayNumber}
              </span>
              <span
                className="origin-left text-[11px] font-medium uppercase tracking-[0.2em] text-pc-muted"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {label}
              </span>
            </div>
          </div>

          {/* Content — cols 3–12 */}
          <div className="min-w-0 lg:col-span-10">{children}</div>
        </div>
      </Container>
    </section>
  );
}
