"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";

const navLinks = [
  { href: "/#how", label: "How it works" },
  { href: "/#lanes", label: "Who it's for" },
  { href: "/#results", label: "Results" },
  { href: "/#faq", label: "FAQ" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-[250ms]",
        scrolled
          ? "border-b border-pc-line bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container>
        <nav className="flex h-[72px] items-center justify-between">
          <Link
            href="/"
            className="text-[18px] font-semibold tracking-tight text-pc-ink"
          >
            <span>Program</span>
            <span className="text-pc-blue">Creator</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-pc-body transition-colors duration-150 hover:text-pc-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <CTAButton href="/apply" size="sm">
              Apply to work with me
            </CTAButton>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] text-pc-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-pc-white md:hidden"
            initial={reduceMotion ? false : { y: "-100%" }}
            animate={{ y: 0 }}
            exit={reduceMotion ? undefined : { y: "-100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-[72px] items-center justify-between px-6">
              <Link
                href="/"
                className="text-[18px] font-semibold tracking-tight text-pc-ink"
                onClick={() => setOpen(false)}
              >
                <span>Program</span>
                <span className="text-pc-blue">Creator</span>
              </Link>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] text-pc-ink"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-1 flex-col px-6 pt-8 pb-10">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[20px] font-medium text-pc-ink"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto" onClick={() => setOpen(false)}>
                <CTAButton href="/apply" className="w-full">
                  Apply to work with me
                </CTAButton>
                <p className="mt-4 text-center text-sm text-pc-muted">
                  {site.name} · {site.handle}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
