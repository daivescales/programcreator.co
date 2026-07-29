"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/services", label: "What We Build" },
  { href: "/process", label: "How It Works" },
  { href: "/results", label: "Results" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/8 bg-ink/80 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12 lg:h-20">
        <Link
          href="/"
          className="font-display text-sm font-bold uppercase tracking-widest sm:text-base"
        >
          <span className="text-white">PROGRAM</span>
          <span className="text-azure-400">CREATOR</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm text-mist-300 transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-azure-400 after:transition-all after:duration-200",
                pathname === link.href
                  ? "text-white after:w-full"
                  : "after:w-0 hover:after:w-full"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href="/apply" size="sm">
            Apply Now
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center p-2 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink lg:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
          >
            <div className="flex h-16 items-center justify-between border-b border-white/8 px-5">
              <Link
                href="/"
                className="font-display text-sm font-bold uppercase tracking-widest"
                onClick={() => setOpen(false)}
              >
                <span className="text-white">PROGRAM</span>
                <span className="text-azure-400">CREATOR</span>
              </Link>
              <button
                type="button"
                className="p-2 text-white"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex h-[calc(100%-4rem)] flex-col justify-between px-5 py-10">
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={link.href}
                      className="font-display text-3xl font-bold tracking-tight text-white"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <Button href="/apply" size="lg" className="w-full">
                Apply Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
