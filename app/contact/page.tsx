import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ProgramCreator. The fastest path to working together is the application — email is for everything else.",
};

const socials = [
  // TODO: replace with real URLs
  { href: "#", label: "Instagram" },
  { href: "#", label: "TikTok" },
  { href: "#", label: "YouTube" },
  { href: "#", label: "X" },
];

export default function ContactPage() {
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@programcreator.com";

  return (
    <>
      <Section className="!pt-24 md:!pt-32">
        <Container>
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.04em] text-white md:text-6xl lg:text-7xl">
              Get in touch.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-300 md:text-lg">
              If you want to work together, the application is the fastest route
              — not email. It takes a few minutes and goes straight into review.
              Use email for press, partnerships, or anything that is not a build
              inquiry.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal delay={0.05}>
              <Card className="flex h-full flex-col">
                <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                  Want to work together?
                </h2>
                <p className="mt-4 flex-1 text-base leading-relaxed text-mist-300">
                  Tell me about your audience and what you want to build. If it
                  looks like a fit, you&apos;ll book a call directly.
                </p>
                <div className="mt-8">
                  <Button href="/apply">Apply to Work With Me</Button>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.1}>
              <Card className="flex h-full flex-col">
                <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                  Anything else?
                </h2>
                <p className="mt-4 flex-1 text-base leading-relaxed text-mist-300">
                  Press, partnerships, or general questions that are not a build
                  application — send a short note.
                </p>
                <div className="mt-8">
                  <Button href={`mailto:${contactEmail}`} variant="secondary">
                    Email {contactEmail}
                  </Button>
                </div>
              </Card>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-16 border-t border-white/8 pt-10">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-500">
                Social
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="text-sm text-mist-300 transition-colors hover:text-azure-400"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="darker" className="!py-16 md:!py-20">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <h2 className="max-w-xl font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Ready when you are.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-mist-300 md:text-base">
                  Applications are reviewed personally. No payment required to
                  apply.
                </p>
              </div>
              <Button href="/apply" className="shrink-0">
                Apply Now
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
