import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import Section from "@/components/ui/Section";
import { site } from "@/lib/site-config";

const socials = [
  { label: "Instagram", href: site.socials.instagram },
  { label: "TikTok", href: site.socials.tiktok },
  { label: "YouTube", href: site.socials.youtube },
  { label: "X", href: site.socials.x },
] as const;

export default function AboutStrip() {
  const activeSocials = socials.filter((s) => s.href);

  return (
    <Section tone="800" className="!py-20">
      <Reveal>
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-center">
          {/* TODO: swap for photo of Daive */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-panel border border-pc-line bg-navy-700">
            <span className="hand !text-[32px] !text-accent">D</span>
            {/* <Image src="/daive.jpg" alt="Daive" width={64} height={64} className="h-16 w-16 rounded-panel object-cover" /> */}
          </div>

          <div className="max-w-[56ch] flex-1">
            <p className="text-[11px] uppercase tracking-[0.18em] text-pc-muted">
              Who you&apos;re working with
            </p>
            <p className="mt-3 text-[16px] leading-[1.65] text-pc-text">
              I&apos;m Daive. I build products and pages for creators and
              brands, and I share the process publicly as {site.handle}. You
              work with me directly. No account manager, no outsourced team,
              and only a handful of clients at a time.
            </p>
          </div>

          {activeSocials.length > 0 && (
            <div className="flex flex-col gap-3 md:ml-auto">
              {activeSocials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[15px] text-pc-muted transition-colors duration-[160ms] hover:text-pc-white"
                >
                  {social.label}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-[160ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
