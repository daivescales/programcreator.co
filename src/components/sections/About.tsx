import Link from "next/link";
import { Reveal } from "@/components/motion";
import Container from "@/components/ui/Container";
import {
  InstagramIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/ui/social-icons";
import { site } from "@/lib/site-config";

const socials = [
  { label: "Instagram", href: site.socials.instagram, icon: InstagramIcon },
  { label: "TikTok", href: site.socials.tiktok, icon: TikTokIcon },
  { label: "YouTube", href: site.socials.youtube, icon: YouTubeIcon },
  { label: "X", href: site.socials.x, icon: XIcon },
] as const;

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-section border-y border-pc-line bg-navy-900 py-20 md:py-24"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center">
            {/* TODO: swap for photo of Daive */}
            {/*
            <Image
              src="/daive.jpg"
              alt="Daive"
              width={72}
              height={72}
              className="h-[72px] w-[72px] object-cover"
            />
            */}
            <div
              aria-hidden
              className="flex h-[72px] w-[72px] shrink-0 items-center justify-center border border-pc-line bg-navy-700"
            >
              <span className="font-serif-italic text-[34px] leading-none text-accent">
                D
              </span>
            </div>

            <div className="max-w-[54ch] flex-1 text-center md:text-left">
              <p className="text-[12px] uppercase tracking-[0.18em] text-pc-muted">
                Who you&apos;re working with
              </p>
              <p className="mt-3 text-[17px] leading-[1.65] text-pc-text">
                I&apos;m Daive. I build products and pages for creators and
                brands, and I share the process publicly as {site.handle}. You
                work with me directly — no account manager, no outsourced team,
                a small number of clients at a time.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                const href = social.href || "#";
                return (
                  <Link
                    key={social.label}
                    href={href}
                    aria-label={social.label}
                    {...(social.href
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex h-10 w-10 items-center justify-center border border-pc-line text-pc-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
