import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/apply", label: "Apply" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
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
  // TODO: replace with real social profile URLs
  { href: "#", label: "Instagram", icon: InstagramIcon },
  { href: "#", label: "TikTok", icon: TikTokIcon },
  { href: "#", label: "YouTube", icon: YouTubeIcon },
  { href: "#", label: "X", icon: XIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-5xl px-6 py-14 text-center">
        <p className="text-base font-semibold tracking-tight">
          <span className="text-white">Program</span>
          <span className="text-sky-500">Creator</span>
        </p>
        <p className="mt-3 text-sm text-text-muted">
          Turning audiences into income. Built by Daive.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-text-faint hover:text-white"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        <p className="mt-10 text-xs text-text-faint">
          © {year} ProgramCreator. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
