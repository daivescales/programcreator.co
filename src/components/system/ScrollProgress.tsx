"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Only scroll-linked motion allowed sitewide: progress bar scaleX. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] h-[2px] w-full origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
