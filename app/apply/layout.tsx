import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to work with ProgramCreator. Answer a few questions about your brand and audience, then book a call.",
  robots: { index: false, follow: false },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
