"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useInView } from "framer-motion";
import {
  EASE_IN,
  VIEWPORT_ONCE,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type StaggerListProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
};

export default function StaggerList({
  children,
  className,
  delay = 0,
  stagger = 0.06,
}: StaggerListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const inView = useInView(ref, VIEWPORT_ONCE);

  useEffect(() => {
    setReady(true);
  }, []);

  const show = !ready || inView;
  const items = Children.toArray(children);

  return (
    <div ref={ref} className={cn(className)}>
      {items.map((child, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={
            reduced
              ? { opacity: show ? 1 : 0, y: 0 }
              : { opacity: show ? 1 : 0, y: show ? 0 : 14 }
          }
          transition={
            reduced
              ? { duration: 0.15, delay: delay + i * stagger, ease: "linear" }
              : {
                  duration: 0.5,
                  delay: delay + i * stagger,
                  ease: EASE_IN,
                }
          }
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
