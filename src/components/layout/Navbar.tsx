"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HandUnderline } from "@/components/marks";
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
  { href: "/#model", label: "What I do" },
  { href: "/#lanes", label: "Two lanes" },
  { href: "/#process", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
] as const;

const socials = [
  { label: "Instagram", href: site.socials.instagram, icon: InstagramIcon },
  { label: "TikTok", href: site.socials.tiktok, icon: TikTokIcon },
  { label: "YouTube", href: site.socials.youtube, icon: YouTubeIcon },
  { label: "X", href: site.socials.x, icon: XIcon },
] as const;

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="text-[13px] text-pc-muted transition-colors duration-[160ms] hover:text-pc-white focus-visible:text-pc-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <HandUnderline
        trigger="hover"
        active={hovered}
        variant={1}
        thickness={2.5}
        delay={0}
      >
        {label}
      </HandUnderline>
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

  const activeSocials = socials.filter((s) => s.href);

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
          <nav className="flex h-[76px] items-center justify-between">
            <Link
              href="/"
              className="text-[16px] font-semibold tracking-[-0.02em] text-pc-white"
            >
              Program<span className="text-accent">Creator</span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </div>

            <div className="hidden md:block">
              <CTAButton
                href="/apply"
                size="sm"
                className="h-10 rounded-control px-5 text-[13px]"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_IN }}
          >
            <div className="flex h-[76px] items-center justify-between px-6">
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
                      delay={reduced ? 0 : 0.06 * index}
                      className="block text-[clamp(1.75rem,7vw,2.75rem)] font-semibold tracking-[-0.035em]"
                    >
                      {link.label}
                    </MaskText>
                  </Link>
                ))}
              </div>

              <div className="mt-auto space-y-6">
                {activeSocials.length > 0 && (
                  <div className="flex items-center gap-3">
                    {activeSocials.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="flex h-10 w-10 items-center justify-center rounded-control text-pc-muted transition-colors duration-[160ms] hover:text-accent"
                        >
                          <Icon size={18} />
                        </a>
                      );
                    })}
                  </div>
                )}
                <div onClick={() => setOpen(false)}>
                  <CTAButton
                    href="/apply"
                    className="w-full rounded-control"
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
