"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function Hero() {
  const [failed, setFailed] = useState(false);

  return (
    <section className="bg-base py-28 text-center md:py-40">
      <Container>
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-500">
            Audience Monetisation & Product Builds
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl">
            Your audience is worth more than the platform pays you.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
            I&apos;m Daive. I work with creators and businesses to find what their
            audience will actually buy — then I build it. Software, digital
            products, communities, physical goods, or offers for a real-world
            business. Whatever fits your audience.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/apply">Apply to Work With Me</Button>
            <Button href="#how" variant="secondary">
              How it works
            </Button>
          </div>
          <p className="mt-5 text-sm text-text-muted">
            Applications reviewed personally by Daive. Limited spots.
          </p>

          <div className="mt-10 flex flex-col items-center">
            <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-sky-500/40 bg-surface">
              {!failed ? (
                <Image
                  src="/daive.jpg"
                  alt="Daive, founder of ProgramCreator"
                  fill
                  className="object-cover"
                  sizes="96px"
                  priority
                  onError={() => setFailed(true)}
                />
              ) : (
                <span className="text-2xl font-semibold text-sky-500">D</span>
              )}
            </div>
            <p className="mt-3 text-sm text-text-muted">
              Daive · Founder, ProgramCreator
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
