import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TheProblem from "@/components/sections/TheProblem";
import WhatIBuild from "@/components/sections/WhatIBuild";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyMe from "@/components/sections/WhyMe";
import FAQPreview from "@/components/sections/FAQPreview";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "ProgramCreator | Turn Your Audience Into Income",
  description:
    "I'm Daive. I help creators and businesses monetise the audience they already have — then build the product that fits.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TheProblem />
      <WhatIBuild />
      <HowItWorks />
      <WhyMe />
      <FAQPreview />
      <FinalCTA />
    </>
  );
}
