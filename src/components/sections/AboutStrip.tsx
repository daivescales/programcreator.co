import { Reveal } from "@/components/motion";
import Container from "@/components/ui/Container";
import Signature from "@/components/ui/Signature";
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

export default function AboutStrip() {
  return (
    <section className="border-y border-pc-line bg-navy-900 py-16 md:py-20">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-10 md:flex-row md:items-center">
            {/* TODO: swap for photo of Daive */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-pc-line bg-navy-700">
              <span className="font-serif-italic text-[30px] text-accent">
                D
              </span>
              {/* <Image src="/daive.jpg" alt="Daive" width={64} height={64} className="h-16 w-16 object-cover" /> */}
            </div>

            <div className="max-w-[56ch] flex-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-pc-muted">
                Who you&apos;re working with
              </p>
              <p className="mt-3 text-[16px] leading-[1.65] text-pc-text">
                I&apos;m Daive. I build products and pages for creators and
                brands, and I share the process publicly as {site.handle}. You
                work with me directly. No account manager, no outsourced team,
                and only a handful of clients at a time.
              </p>
              <div className="mt-5">
                <Signature height={28} />
              </div>
            </div>

            <div className="flex items-center gap-3 md:ml-auto">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href || "#"}
                    aria-label={social.label}
                    className="flex h-[38px] w-[38px] items-center justify-center border border-pc-line text-pc-muted transition-colors duration-[160ms] hover:border-accent hover:text-accent"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
