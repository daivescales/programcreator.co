import { cn } from "@/lib/utils";
import MaskText from "@/components/motion/MaskText";

export type HeadingProps = {
  as?: "display" | "h2" | "h3";
  text: string;
  className?: string;
  delay?: number;
  underlineVariant?: 1 | 2;
};

const sizeClasses = {
  display: "t-display",
  h2: "t-h2",
  h3: "t-h3",
} as const;

const tagMap = {
  display: "h1",
  h2: "h2",
  h3: "h3",
} as const;

/** *word* → Caveat (.hand) · _word_ → HandUnderline via MaskText (pb 0.4em). */
export default function Heading({
  as = "h2",
  text,
  className,
  delay,
  underlineVariant = 1,
}: HeadingProps) {
  return (
    <MaskText
      as={tagMap[as]}
      className={cn(sizeClasses[as], className)}
      delay={delay}
      underlineVariant={underlineVariant}
    >
      {text}
    </MaskText>
  );
}
