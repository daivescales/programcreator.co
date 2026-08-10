import { cn } from "@/lib/utils";
import MaskText from "@/components/motion/MaskText";

type HeadingProps = {
  as?: "display" | "h2" | "h3";
  text: string;
  className?: string;
  delay?: number;
};

const sizeClasses = {
  display:
    "text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-white",
  h2: "text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white",
  h3: "text-[clamp(1.25rem,2vw,1.65rem)] font-semibold leading-[1.2] tracking-[-0.035em] text-white",
} as const;

const tagMap = {
  display: "h1",
  h2: "h2",
  h3: "h3",
} as const;

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
