"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type ScrollScaleProps = {
  children: ReactNode;
  className?: string;
  fromScale?: number;
  toScale?: number;
  fromRadius?: number;
  toRadius?: number;
};

export default function ScrollScale({
  children,
  className,
  fromScale = 1.08,
  toScale = 1,
  fromRadius,
  toRadius,
}: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [fromScale, toScale]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    [fromRadius ?? 24, toRadius ?? 4]
  );

  const style: MotionStyle = reduced
    ? {}
    : {
        scale,
        ...(fromRadius !== undefined || toRadius !== undefined
          ? { borderRadius }
          : {}),
      };

  return (
    <motion.div ref={ref} className={cn("will-change-transform", className)} style={style}>
      {children}
    </motion.div>
  );
}

export type { ScrollScaleProps };
