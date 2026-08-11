"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

/** Entrance ease , cubic-bezier(0.16, 1, 0.3, 1) */
export const EASE_IN = [0.16, 1, 0.3, 1] as const;

/** Exit ease , cubic-bezier(0.65, 0, 0.35, 1) */
export const EASE_OUT = [0.65, 0, 0.35, 1] as const;

/** Scroll reveals: one-shot whileInView only */
export const VIEWPORT_ONCE = { once: true, margin: "-12%" } as const;
