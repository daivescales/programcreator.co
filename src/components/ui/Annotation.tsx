import { HandArrow } from "@/components/marks";
import { cn } from "@/lib/utils";

export type AnnotationProps = {
  children: string;
  className?: string;
  /** Optional HandArrow direction toward the annotated target. */
  arrow?: 1 | 2 | "ltr" | "rtl";
  /** Place the arrow before or after the note. Default "before". */
  arrowPosition?: "before" | "after";
};

/** Caveat margin note with optional HandArrow. */
export default function Annotation({
  children,
  className,
  arrow,
  arrowPosition = "before",
}: AnnotationProps) {
  const mark = arrow ? (
    <HandArrow
      variant={arrow}
      className="shrink-0 self-center text-accent"
      delay={0.15}
    />
  ) : null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[clamp(0.95rem,1.4vw,1.15rem)] leading-none text-accent-2",
        className
      )}
      style={{
        fontFamily: "var(--font-hand), cursive",
        fontWeight: 400,
        transform: "rotate(-1.2deg) translateY(0.04em)",
      }}
    >
      {arrowPosition === "before" && mark}
      <span>{children}</span>
      {arrowPosition === "after" && mark}
    </span>
  );
}
