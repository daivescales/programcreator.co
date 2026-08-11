import { cn } from "@/lib/utils";
import MaskText from "@/components/motion/MaskText";

export type HeadingProps = {
  as?: "display" | "h2" | "h3";
  text: string;
  className?: string;
  delay?: number;
};

const sizeClasses = {
  display:
    "text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-pc-white",
  h2: "text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-pc-white",
  h3: "text-[clamp(1.15rem,1.9vw,1.5rem)] font-semibold leading-[1.2] tracking-[-0.035em] text-pc-white",
} as const;

const tagMap = {
  display: "h1",
  h2: "h2",
  h3: "h3",
} as const;

/** MaskText heading with *emphasis* → serif-em. */
export default function Heading({
  as = "h2",
  text,
  className,
  delay,
}: HeadingProps) {
  return (
    <MaskText
      as={tagMap[as]}
      className={cn(sizeClasses[as], className)}
      delay={delay}
    >
      {text}
    </MaskText>
  );
}
