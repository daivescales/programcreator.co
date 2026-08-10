import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import {
  InstagramIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/ui/social-icons";
import { site } from "@/lib/site-config";

const socialLinks = [
  { label: "Instagram", href: site.socials.instagram, icon: InstagramIcon },
  { label: "TikTok", href: site.socials.tiktok, icon: TikTokIcon },
  { label: "X", href: site.socials.x, icon: XIcon },
  { label: "YouTube", href: site.socials.youtube, icon: YouTubeIcon },
] as const;

export default function About() {
  return (
    <Section id="about">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            {/* TODO: replace with photo of Daive */}
            <div className="flex aspect-square items-center justify-center rounded-2xl border border-pc-line bg-pc-surface">
              <span className="text-[120px] font-semibold leading-none tracking-tight text-pc-blue-100 select-none md:text-[160px]">
                D
              </span>
            </div>
            {/*
            <Image
              src="/daive.jpg"
              alt="Daive, founder of ProgramCreator"
              width={560}
              height={560}
              className="aspect-square w-full rounded-2xl border border-pc-line object-cover"
            />
            */}
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-7">
            <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-pc-blue">
              Who you&apos;re working with
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-pc-ink">
              I&apos;m Daive.
            </h2>
            <div className="mt-5 max-w-[58ch] space-y-4 text-base leading-relaxed text-pc-body md:text-lg">
              <p>
                I build products and pages for creators and brands, and share the
                process publicly as {site.handle}. {site.name} is where that work
                happens.
              </p>
              <p>
                Creators pay a revenue split because I&apos;d rather be paid on
                the outcome than the invoice. It also filters out brands I
                can&apos;t actually help.
              </p>
              <p>
                You work with me directly. No account manager, no offshore team.
                A small number of clients at a time.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                const href = social.href || "#";
                return (
                  <Link
                    key={social.label}
                    href={href}
                    {...(social.href
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-2 rounded-full border border-pc-line bg-pc-white px-4 py-2 text-sm font-medium text-pc-ink transition-colors duration-150 hover:border-pc-blue-300"
                  >
                    <Icon size={16} strokeWidth={1.75} aria-hidden />
                    {social.label}
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
