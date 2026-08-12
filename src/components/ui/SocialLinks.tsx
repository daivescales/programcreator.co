import { ArrowUpRight, Music2, type LucideIcon } from "lucide-react";
import type { SVGProps } from "react";
import { site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Youtube({ size = 18, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Instagram({ size = 18, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Twitter({ size = 18, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M4 4l11.5 16H20L8.5 4H4z" />
      <path d="M12.5 11.5L20 20M4 4l6.5 7.5" />
    </svg>
  );
}

type SocialIcon = LucideIcon | ((props: IconProps) => React.ReactNode);

const links: {
  label: string;
  href: string;
  Icon: SocialIcon;
}[] = [
  { label: "YouTube", href: site.socials.youtube, Icon: Youtube },
  { label: "Instagram", href: site.socials.instagram, Icon: Instagram },
  { label: "X", href: site.socials.x, Icon: Twitter },
  { label: "TikTok", href: site.socials.tiktok, Icon: Music2 },
];

export type SocialLinksProps = {
  variant?: "icon" | "text";
  className?: string;
  /** Stack text links vertically (AboutStrip). Default horizontal for text. */
  stacked?: boolean;
};

export default function SocialLinks({
  variant = "icon",
  className,
  stacked = false,
}: SocialLinksProps) {
  if (variant === "text") {
    return (
      <ul
        className={cn(
          stacked
            ? "flex flex-col gap-3"
            : "flex flex-wrap items-center gap-x-5 gap-y-2",
          className
        )}
      >
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[15px] text-pc-text transition-colors duration-200 hover:text-pc-white"
            >
              {link.label}
              <ArrowUpRight
                size={14}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {links.map((link) => {
        const Icon = link.Icon;
        return (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex h-10 w-10 items-center justify-center rounded-control text-pc-text transition-colors duration-200 hover:text-accent"
            >
              <Icon size={18} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
