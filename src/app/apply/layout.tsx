import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to work with Daive at ProgramCreator. Eleven questions. About three minutes.",
  robots: { index: false, follow: false },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-dvh bg-navy-800">{children}</div>;
}
