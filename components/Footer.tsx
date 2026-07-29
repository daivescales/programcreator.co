import Link from "next/link";
import Button from "./ui/Button";
import Container from "./ui/Container";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/process", label: "How It Works" },
  { href: "/results", label: "Results" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const buildLinks = [
  { href: "/services#clothing", label: "Clothing & Merch" },
  { href: "/services#info-products", label: "Info Products" },
  { href: "/services#communities", label: "Paid Communities" },
  { href: "/services#ecosystem", label: "Full Ecosystem" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/earnings-disclaimer", label: "Earnings Disclaimer" },
  { href: "/accessibility", label: "Accessibility" },
];

type IconProps = { size?: number };

function InstagramIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 4l11.5 16H20L8.5 4H4z" />
      <path d="M12.5 11.5L20 20M4 4l6.5 7.5" />
    </svg>
  );
}

const socials = [
  // TODO: replace with real social profile URLs before launch
  { href: "#", label: "Instagram", icon: InstagramIcon },
  { href: "#", label: "TikTok", icon: TikTokIcon },
  { href: "#", label: "YouTube", icon: YouTubeIcon },
  { href: "#", label: "X", icon: XIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-navy-950">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/8 pb-12 md:flex-row md:items-center">
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Let&apos;s build the thing your audience is already asking for.
          </h2>
          <Button href="/apply" size="lg" className="shrink-0">
            Apply Now
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-sm font-bold uppercase tracking-widest">
              <span className="text-white">PROGRAM</span>
              <span className="text-azure-400">CREATOR</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-mist-500">
              A done-with-you build partner for creators and brand owners who want
              a real product business — not another course.
            </p>
            <div className="mt-5 flex items-center gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-mist-500 hover:text-azure-400"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-500">
              Company
            </p>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-mist-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-500">
              What We Build
            </p>
            <ul className="mt-4 space-y-3">
              {buildLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-mist-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-500">
              Legal
            </p>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-mist-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-mist-500">
            © {year} ProgramCreator. All rights reserved.
          </p>
          <p className="text-xs text-mist-500">
            By using this site you agree to our{" "}
            <Link href="/terms" className="text-mist-300 underline underline-offset-2">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-mist-300 underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="text-xs text-mist-500">
            ProgramCreator is not affiliated with any social media platform.
          </p>
        </div>
      </Container>
    </footer>
  );
}
