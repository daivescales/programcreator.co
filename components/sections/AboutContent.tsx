"use client";

import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FinalCTA from "@/components/sections/FinalCTA";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

const principles = [
  {
    title: "Built to sell, not to look good",
    body: "Every decision is measured against whether your audience will pay.",
  },
  {
    title: "You own everything we make",
    body: "The brand, the audience, and the assets stay 100% yours.",
  },
  {
    title: "Honest answers, including no",
    body: "If it isn't worth building, I'll say so on the call.",
  },
];

function Portrait() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="mx-auto mt-10 flex flex-col items-center">
      <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border border-sky-500/40 bg-surface">
        {!failed ? (
          <Image
            src="/daive.jpg"
            alt="Daive, founder of ProgramCreator"
            fill
            className="object-cover"
            sizes="160px"
            priority
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="text-4xl font-semibold text-sky-500">D</span>
        )}
      </div>
      <p className="mt-3 text-sm text-text-muted">Founder, ProgramCreator</p>
    </div>
  );
}

export default function AboutContent() {
  return (
    <>
      <Section variant="base" className="!pt-28 md:!pt-36">
        <Container>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-500">
              About
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
              I&apos;m Daive.
            </h1>
            <Portrait />
            <div className="mx-auto mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-text-muted md:text-lg">
              <p>
                I built a platform called Clipora off the back of my own YouTube
                channel — an AI tool with my own process and judgement built into
                it, designed to help YouTubers grow faster and get more out of the
                content they were already making. I grew my personal brand first,
                then built a product for the exact audience I understood better
                than anyone else could.
              </p>
              <p>
                That&apos;s when it clicked. The hard part was never the audience
                — it was that most people with an audience have nothing of their
                own to sell. YouTube and Instagram will pay you through platform
                payouts and sponsorships, and that&apos;s roughly where it ends.
                Both are capped and neither one is yours.
              </p>
              <p>
                ProgramCreator is me doing for other people what I did for
                myself. I work with creators and businesses to find the thing
                their specific audience will pay for, and then I build it —
                software, a digital product, a community, a physical line, or an
                offer that fills a real-world business. I&apos;m not teaching the
                model. I&apos;m running it with you, to prove it works for
                anybody, not just me.
              </p>
              <p>
                [YOUR ADDITIONAL BACKGROUND — one or two specific, verifiable
                lines: numbers, results, years, anything concrete.]
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
              {principles.map((item) => (
                <div key={item.title} className="flex flex-col items-center gap-3">
                  <Check className="text-sky-500" size={18} strokeWidth={2.5} />
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-text-muted">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Button href="/apply">Apply to Work With Me</Button>
            </div>
          </Reveal>
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
