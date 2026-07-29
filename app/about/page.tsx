import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "I'm Daive, founder of ProgramCreator. I build products for creators and brands — clothing, digital products, and paid communities — done-with-you.",
};

export default function AboutPage() {
  return <AboutContent />;
}
