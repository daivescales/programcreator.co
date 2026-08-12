import type { Metadata } from "next";
import AboutStrip from "@/components/sections/AboutStrip";
import Expect from "@/components/sections/Expect";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Hero from "@/components/sections/Hero";
import Lanes from "@/components/sections/Lanes";
import Model from "@/components/sections/Model";
import Process from "@/components/sections/Process";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: copy.meta.titleDefault,
  description: copy.meta.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Model />
      <Lanes />
      <Process />
      <Expect />
      <AboutStrip />
      <FAQ />
      <FinalCTA />
    </>
  );
}
