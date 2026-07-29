"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "./ui/Button";

const STORAGE_KEY = "pc_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return;
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  function choose(value: "accepted" | "declined") {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
    // Analytics should only load when consent === "accepted"
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduceMotion ? false : { y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? undefined : { y: 40, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-navy-900/95 backdrop-blur-lg"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
            <p className="text-sm text-mist-300">
              We use cookies to run this site and understand how it&apos;s used.{" "}
              <Link href="/cookies" className="text-azure-400 underline underline-offset-2">
                Cookie Policy
              </Link>
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <Button size="sm" onClick={() => choose("accepted")}>
                Accept
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => choose("declined")}
              >
                Decline non-essential
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
