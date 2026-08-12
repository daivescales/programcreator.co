import { Reveal } from "@/components/motion";
import Section from "@/components/ui/Section";
import SocialLinks from "@/components/ui/SocialLinks";
import { site } from "@/lib/site-config";

export default function AboutStrip() {
  return (
    <Section tone="800" className="!py-16">
      {/* TODO: Daive, a small photo could sit here later */}
      <Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="t-label">Who you&apos;re working with</p>
            <p className="t-body mt-4 max-w-[54ch]">
              I&apos;m Daive. I build products and pages for creators and brands,
              and I share the process publicly as {site.handle}. You work with
              me directly. No account manager, no outsourced team, and only a
              handful of clients at a time.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <SocialLinks variant="text" stacked />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
