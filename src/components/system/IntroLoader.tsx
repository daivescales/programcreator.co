"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  EASE_IN,
  EASE_OUT,
  usePrefersReducedMotion,
} from "@/hooks/usePrefersReducedMotion";
import { site } from "@/lib/site-config";

const STORAGE_KEY = "pc_intro_v2";

export default function IntroLoader() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }

    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setDone(true);
        return;
      }
    } catch {
      // ignore
    }

    setVisible(true);

    const end = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }
      window.setTimeout(() => setDone(true), 500);
    }, 1200);

    return () => window.clearTimeout(end);
  }, [reduced]);

  if (done) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.55, ease: EASE_OUT } }}
          style={{ pointerEvents: visible ? "auto" : "none" }}
        >
          <div className="relative flex flex-col items-center gap-8">
            <motion.p
              className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold tracking-[-0.035em] text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, ease: EASE_IN }}
            >
              {site.name}
            </motion.p>
            <motion.div
              className="h-px w-40 origin-left bg-pc-line-2"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, delay: 0.25, ease: EASE_IN }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
