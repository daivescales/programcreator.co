import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import WhatIBuild from "@/components/sections/WhatIBuild";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyMe from "@/components/sections/WhyMe";
import FAQPreview from "@/components/sections/FAQPreview";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "ProgramCreator | Product Builds for Creators & Brands",
  description:
    "I'm Daive. I build clothing lines, digital products, and paid communities with creators and brand owners — done-with-you, not a course.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIBuild />
      <HowItWorks />
      <WhyMe />
      <FAQPreview />
      <FinalCTA />
    </>
  );
}
