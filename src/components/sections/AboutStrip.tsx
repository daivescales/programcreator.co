import { Reveal } from "@/components/motion";
import Section from "@/components/ui/Section";
import SocialLinks from "@/components/ui/SocialLinks";
import { copy } from "@/lib/copy";

export default function AboutStrip() {
  return (
    <Section tone="750" className="!py-16">
      {/* TODO: Daive, a small photo could sit here later */}
      <Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="t-label">{copy.about.label}</p>
            <p className="t-body mt-4 max-w-[54ch]">{copy.about.body}</p>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <SocialLinks variant="text" stacked />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
