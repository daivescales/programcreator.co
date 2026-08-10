import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book your call",
  description: "Pick a time for your ProgramCreator brand audit call.",
  robots: { index: false, follow: false },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-dvh bg-pc-white">{children}</div>;
}
