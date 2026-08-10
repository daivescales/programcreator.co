import Link from "next/link";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import {
  InstagramIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/ui/social-icons";
import { site } from "@/lib/site-config";

const navigate = [
  { href: "/#how", label: "How it works" },
  { href: "/#lanes", label: "Who it's for" },
  { href: "/#results", label: "Results" },
  { href: "/#faq", label: "FAQ" },
  { href: "/apply", label: "Apply" },
] as const;

const company = [
  { href: "/#about", label: "About Daive" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

const socials = [
  { label: "Instagram", href: site.socials.instagram, icon: InstagramIcon },
  { label: "TikTok", href: site.socials.tiktok, icon: TikTokIcon },
  { label: "X", href: site.socials.x, icon: XIcon },
  { label: "YouTube", href: site.socials.youtube, icon: YouTubeIcon },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-pc-line bg-pc-surface pt-20 pb-10">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="text-[18px] font-semibold tracking-tight text-pc-ink"
            >
              <span>Program</span>
              <span className="text-pc-blue">Creator</span>
            </Link>
            <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-pc-body">
              Creator Product Scaling for people who already have attention.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                const href = social.href || "#";
                return (
                  <a
                    key={social.label}
                    href={href}
                    aria-label={social.label}
                    {...(social.href
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-pc-muted transition-colors duration-150 hover:text-pc-blue"
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-pc-ink">Navigate</p>
            <ul className="mt-4 space-y-3">
              {navigate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-pc-body transition-colors duration-150 hover:text-pc-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-pc-ink">Company</p>
            <ul className="mt-4 space-y-3">
              {company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-pc-body transition-colors duration-150 hover:text-pc-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-pc-body transition-colors duration-150 hover:text-pc-ink"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-xl border border-pc-line bg-pc-white p-6">
              <p className="text-lg font-semibold tracking-tight text-pc-ink">
                Ready to build?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-pc-body">
                Apply in three minutes. If I can help, we get on a call.
              </p>
              <CTAButton href="/apply" className="mt-5 w-full">
                Apply to work with me
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-pc-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-pc-muted">
            © 2026 {site.name}. All rights reserved.
          </p>
          <p className="text-[13px] text-pc-muted">
            Built by {site.founder} · {site.handle}
          </p>
        </div>
      </Container>
    </footer>
  );
}
