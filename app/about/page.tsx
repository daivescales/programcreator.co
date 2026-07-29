import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "I'm Daive, founder of ProgramCreator. I built Clipora from my YouTube audience — now I build products that monetise yours.",
};

export default function AboutPage() {
  return <AboutContent />;
}
