import type { Metadata } from "next";
import About from "@/components/sections/About";
import Deliverables from "@/components/sections/Deliverables";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Hero from "@/components/sections/Hero";
import Lanes from "@/components/sections/Lanes";
import Model from "@/components/sections/Model";
import Process from "@/components/sections/Process";
import Results from "@/components/sections/Results";
import Ticker from "@/components/sections/Ticker";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${site.name} — Creator Product Scaling by ${site.founder}`,
  description:
    "I build digital products for creators and rebuild storefronts for physical brands, then scale them through the audience you already have. Creators pay a revenue split. Product brands pay a retainer.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <Model />
      <Lanes />
      <Process />
      <Deliverables />
      <Results />
      <About />
      <FAQ />
      <FinalCTA />
    </>
  );
}
