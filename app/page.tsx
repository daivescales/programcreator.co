import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Problem from "@/components/sections/Problem";
import Model from "@/components/sections/Model";
import WhatIBuild from "@/components/sections/WhatIBuild";
import Difference from "@/components/sections/Difference";
import Results from "@/components/sections/Results";
import Fit from "@/components/sections/Fit";
import FAQPreview from "@/components/sections/FAQPreview";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "ProgramCreator | I Build The Product Your Audience Already Wants",
  description:
    "ProgramCreator partners with creators and brand owners to turn an audience into a clothing line, digital product, or paid community — done-with-you, not a course.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Problem />
      <Model />
      <WhatIBuild />
      <Difference />
      {/* Hide Results until real proof exists — never publish fake numbers */}
      <Results hidden />
      <Fit />
      <FAQPreview />
      <FinalCTA />
    </>
  );
}
