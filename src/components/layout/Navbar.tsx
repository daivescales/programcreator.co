"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaskText } from "@/components/motion";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import {
  InstagramIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/ui/social-icons";
import { EASE_IN, usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";

const navLinks = [
  { href: "/#model", label: "Model" },
  { href: "/#lanes", label: "Lanes" },
  { href: "/#process", label: "Process" },
  { href: "/#faq", label: "FAQ" },
] as const;

const socials = [
  { label: "Instagram", href: site.socials.instagram, icon: InstagramIcon },
  { label: "TikTok", href: site.socials.tiktok, icon: TikTokIcon },
  { label: "YouTube", href: site.socials.youtube, icon: YouTubeIcon },
  { label: "X", href: site.socials.x, icon: XIcon },
] as const;

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
            ? "border-b border-pc-line bg-navy-800/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <Container>
          <nav className="flex h-[72px] items-center justify-between">
            <Link
              href="/"
              className="text-[16px] font-semibold tracking-[-0.02em] text-pc-white"
            >
              Program<span className="text-accent">Creator</span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-[12px] uppercase tracking-[0.16em] text-pc-muted transition-colors duration-[160ms] hover:text-pc-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <CTAButton
                href="/apply"
                size="sm"
                className="h-10 rounded-none px-6 text-[12px] uppercase tracking-[0.14em]"
              >
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
            initial={
              reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }
            }
            animate={
              reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }
            }
            exit={
              reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }
            }
            transition={{ duration: 0.5, ease: EASE_IN }}
          >
            <div className="flex h-[72px] items-center justify-between px-6">
              <Link
                href="/"
                className="text-[16px] font-semibold tracking-[-0.02em] text-pc-white"
                onClick={() => setOpen(false)}
              >
                Program<span className="text-accent">Creator</span>
              </Link>
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
                      delay={0.06 * index}
                      className="block text-[clamp(1.75rem,8vw,3rem)] font-semibold tracking-[-0.035em]"
                    >
                      {link.label}
                    </MaskText>
                  </Link>
                ))}
              </div>

              <div className="mt-auto space-y-6">
                <div className="flex items-center gap-3">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href || "#"}
                        aria-label={social.label}
                        className="flex h-10 w-10 items-center justify-center border border-pc-line text-pc-muted transition-colors duration-[160ms] hover:border-accent hover:text-accent"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
                <div onClick={() => setOpen(false)}>
                  <CTAButton
                    href="/apply"
                    className="w-full rounded-none"
                  >
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
