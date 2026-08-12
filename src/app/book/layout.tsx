import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book your call",
  description:
    "Application received. Book your call with Daive at ProgramCreator.",
  robots: { index: false, follow: false },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-dvh bg-navy-800">{children}</div>;
}
