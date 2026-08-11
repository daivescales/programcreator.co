"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MaskText } from "@/components/motion";
import Container from "@/components/ui/Container";
import Signature from "@/components/ui/Signature";
import { site } from "@/lib/site-config";

const indexLinks = [
  { href: "/#model", label: "What I do" },
  { href: "/#lanes", label: "Two lanes" },
  { href: "/#process", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
  { href: "/apply", label: "Apply" },
] as const;

const elsewhere = [
  { label: "Instagram", href: site.socials.instagram },
  { label: "TikTok", href: site.socials.tiktok },
  { label: "YouTube", href: site.socials.youtube },
  { label: "X", href: site.socials.x },
] as const;

const legal = [
  { href: "/legal", label: "Legal" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-pc-line bg-navy-900 pt-28 pb-8">
      <Container>
        <div className="overflow-hidden text-center">
          <MaskText
            as="p"
            className="text-stroke-wordmark text-[clamp(2.5rem,12vw,9rem)] font-bold leading-none tracking-[-0.05em]"
          >
            PROGRAMCREATOR
          </MaskText>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 lg:col-span-4">
            <Signature height={28} />
            <p className="mt-5 max-w-[32ch] text-[15px] leading-[1.65] text-pc-text">
              Creator Product Scaling for people who already have attention.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group relative mt-4 inline-block text-[15px] text-accent"
            >
              {site.email}
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </a>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-pc-muted">
              Index
            </p>
            <ul className="mt-4 space-y-3">
              {indexLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-[15px] text-pc-text transition-[color,transform] duration-[160ms] hover:translate-x-1 hover:text-pc-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-pc-muted">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-3">
              {elsewhere.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href || "#"}
                    {...(link.href
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex items-center gap-1.5 text-[15px] text-pc-text transition-colors duration-[160ms] hover:text-pc-white"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-[160ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-pc-muted">
              Legal
            </p>
            <ul className="mt-4 space-y-3">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-[15px] text-pc-text transition-[color,transform] duration-[160ms] hover:translate-x-1 hover:text-pc-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-pc-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] uppercase tracking-[0.16em] text-pc-muted">
            © 2026 {site.name}. Built and run by {site.founder}.
          </p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-pc-muted">
            {site.handle}
          </p>
        </div>
      </Container>
    </footer>
  );
}
