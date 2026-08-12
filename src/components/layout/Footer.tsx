import Link from "next/link";
import Container from "@/components/ui/Container";
import SocialLinks from "@/components/ui/SocialLinks";
import { contactEmail, site } from "@/lib/site-config";

const indexLinks = [
  { href: "/#model", label: "What I do" },
  { href: "/#lanes", label: "Two lanes" },
  { href: "/#process", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
  { href: "/apply", label: "Apply" },
] as const;

const legal = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/disclaimer", label: "Disclaimer" },
] as const;

export default function Footer() {
  const email = contactEmail();

  return (
    <footer className="bg-navy-900 pt-20 pb-8">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-wordmark text-[17px] tracking-[-0.02em] text-pc-white">
              Program<span className="text-accent">Creator</span>
            </p>
            <p className="mt-4 max-w-[32ch] text-[15px] leading-[1.65] text-pc-muted">
              Creator Product Scaling for people who already have attention.
            </p>
            {email ? (
              <a
                href={`mailto:${email}`}
                className="group relative mt-4 inline-block text-[15px] text-accent"
              >
                {email}
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </a>
            ) : (
              <p className="mt-4 text-[15px] text-pc-muted">Email coming soon</p>
            )}
            <SocialLinks variant="text" className="mt-7" />
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="t-label">Index</p>
            <ul className="mt-4 space-y-3">
              {indexLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-[15px] text-pc-text transition-[color,transform] duration-[180ms] hover:translate-x-[3px] hover:text-pc-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <p className="t-label">Legal</p>
            <ul className="mt-4 space-y-3">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-[15px] text-pc-text transition-[color,transform] duration-[180ms] hover:translate-x-[3px] hover:text-pc-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-pc-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-pc-muted">
            © 2026 {site.name}. Built and run by {site.founder}.
          </p>
          <p className="text-[13px] text-pc-muted">{site.handle}</p>
        </div>
      </Container>
    </footer>
  );
}
