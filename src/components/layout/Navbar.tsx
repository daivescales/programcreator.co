"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HandUnderline from "@/components/marks/HandUnderline";
import { MaskText } from "@/components/motion";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import SocialLinks from "@/components/ui/SocialLinks";
import { EASE_IN, usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#model", label: "What I do" },
  { href: "/#lanes", label: "Two lanes" },
  { href: "/#process", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
] as const;

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="t-small text-pc-muted transition-colors duration-[180ms] hover:text-pc-white focus-visible:text-pc-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <HandUnderline trigger="hover" active={hovered} variant={1} delay={0}>
        {label}
      </HandUnderline>
    </Link>
  );
}

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="font-wordmark text-[15px] tracking-[-0.02em] text-pc-white"
    >
      Program<span className="text-accent">Creator</span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

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
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color] duration-[250ms]",
          scrolled
            ? "border-b border-pc-line bg-navy-800/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <Container>
          <nav className="flex h-[68px] items-center justify-between">
            <Wordmark />

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </div>

            <div className="hidden md:block">
              <CTAButton href="/apply" size="sm">
                Apply
              </CTAButton>
            </div>

            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">Menu</span>
              <span
                className={cn(
                  "absolute h-px w-5 bg-pc-white transition-transform duration-[300ms]",
                  open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-pc-white transition-transform duration-[300ms]",
                  open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
                )}
              />
            </button>
          </nav>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-navy-900 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_IN }}
          >
            <div className="flex h-[68px] items-center justify-between px-6">
              <Wordmark onClick={() => setOpen(false)} />
              <button
                type="button"
                className="relative inline-flex h-10 w-10 items-center justify-center"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <span className="absolute h-px w-5 rotate-45 bg-pc-white" />
                <span className="absolute h-px w-5 -rotate-45 bg-pc-white" />
              </button>
            </div>

            <div className="flex flex-1 flex-col px-6 pt-8 pb-10">
              <div className="flex flex-col gap-5">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-pc-white"
                  >
                    <MaskText
                      as="span"
                      delay={reduced ? 0 : 0.06 * index}
                      className="t-h2 block"
                    >
                      {link.label}
                    </MaskText>
                  </Link>
                ))}
              </div>

              <div className="mt-auto space-y-6">
                <SocialLinks variant="icon" />
                <div onClick={() => setOpen(false)}>
                  <CTAButton href="/apply" className="w-full">
                    Apply to work with me
                  </CTAButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
