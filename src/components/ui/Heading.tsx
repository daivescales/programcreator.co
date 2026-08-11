import { cn } from "@/lib/utils";
import MaskText from "@/components/motion/MaskText";

export type HeadingProps = {
  as?: "display" | "h2" | "h3";
  text: string;
  className?: string;
  delay?: number;
  underlineVariant?: 1 | 2 | 3;
};

const sizeClasses = {
  display:
    "text-[clamp(2.75rem,7.5vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-pc-white",
  h2: "text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-pc-white",
  h3: "text-[clamp(1.1rem,1.8vw,1.4rem)] font-semibold leading-tight tracking-[-0.035em] text-pc-white",
} as const;

const tagMap = {
  display: "h1",
  h2: "h2",
  h3: "h3",
} as const;

/** *word* → Caveat (.hand) · _word_ → HandUnderline */
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
