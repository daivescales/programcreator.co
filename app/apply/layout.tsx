import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to work with Daive at ProgramCreator. Ten questions, about five minutes.",
  robots: { index: false, follow: false },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
