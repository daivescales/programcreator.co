"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MaskText, ScrambleText } from "@/components/motion";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import { useLenis } from "@/components/system/SmoothScroll";
import { site } from "@/lib/site-config";

const navigate = [
  { href: "/#model", label: "Model" },
  { href: "/#lanes", label: "Lanes" },
  { href: "/#process", label: "Process" },
  { href: "/#work", label: "Work" },
  { href: "/#faq", label: "FAQ" },
  { href: "/apply", label: "Apply" },
] as const;

const elsewhere = [
  { label: "Instagram", href: site.socials.instagram },
  { label: "TikTok", href: site.socials.tiktok },
  { label: "YouTube", href: site.socials.youtube },
  { label: "X", href: site.socials.x },
] as const;

export default function Footer() {
  const { lenis } = useLenis();

  const backToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-pc-line bg-navy-900 pt-32 pb-10">
      <Container>
        <div className="overflow-hidden text-center">
          <MaskText
            as="p"
            className="text-stroke-wordmark text-[clamp(3rem,13vw,11rem)] font-bold leading-none tracking-[-0.05em]"
          >
            PROGRAMCREATOR
          </MaskText>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <p className="text-[17px] font-semibold tracking-[-0.02em] text-pc-white">
              Program<span className="text-accent">Creator</span>
            </p>
            <p className="mt-4 max-w-[28ch] text-[15px] leading-[1.65] text-pc-text">
              Creator Product Scaling for people who already have attention.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-[15px] text-accent transition-opacity hover:opacity-80"
            >
              {site.email}
            </a>
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-[0.18em] text-pc-muted">
              Navigate
            </p>
            <ul className="mt-4 space-y-3">
              {navigate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-pc-text transition-colors hover:text-pc-white"
                  >
                    <ScrambleText text={link.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-[0.18em] text-pc-muted">
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
                    className="group inline-flex items-center gap-1.5 text-[15px] text-pc-text transition-colors hover:text-pc-white"
                  >
                    <ScrambleText text={link.label} />
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 border border-pc-line bg-navy-800 p-6 lg:col-span-1">
            <p className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold tracking-[-0.03em] text-pc-white">
              Have a brand?
            </p>
            <p className="mt-2 text-[15px] leading-[1.65] text-pc-text">
              Apply in three minutes. If I can help, we get on a call.
            </p>
            <CTAButton href="/apply" className="mt-5 w-full">
              Apply to work with me
            </CTAButton>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-pc-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] uppercase tracking-[0.14em] text-pc-muted">
            © 2026 {site.name}
          </p>
          <p className="text-[12px] uppercase tracking-[0.14em] text-pc-muted">
            Built by {site.founder} · {site.handle}
          </p>
          <button
            type="button"
            onClick={backToTop}
            className="text-[12px] uppercase tracking-[0.14em] text-pc-muted transition-colors hover:text-pc-white"
          >
            Back to top
          </button>
        </div>
      </Container>
    </footer>
  );
}
