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
  "Built to sell, not to look good",
  "You own everything we make",
  "Honest answers, including no",
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
      <p className="mt-3 text-sm text-text-faint">Founder, ProgramCreator</p>
    </div>
  );
}

export default function AboutPageClient() {
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
                I build products for creators and brands with real audiences.{" "}
                [YOUR BACKGROUND — one or two lines on what you&apos;ve built or
                done before.]
              </p>
              <p>
                Most creators have spent years building trust and have nothing of
                their own to sell. Brand deals pay once and nothing compounds. I
                started ProgramCreator to close that gap by actually building the
                thing, not explaining how.
              </p>
              <p>
                I take on a small number of partners at a time and lead the build
                myself, from the first decision to launch day. You stay involved
                throughout, so by the end you understand your own business rather
                than owning a black box.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
              {principles.map((item) => (
                <div key={item} className="flex flex-col items-center gap-3">
                  <Check className="text-sky-500" size={18} strokeWidth={2.5} />
                  <p className="text-sm font-semibold text-white">{item}</p>
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
