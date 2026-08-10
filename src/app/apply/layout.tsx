import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to work with Daive at ProgramCreator. Thirteen questions, about five minutes.",
  robots: { index: false, follow: false },
};

/**
 * Minimal apply layout — no site Navbar/Footer.
 * Parent root layout should not wrap this route in marketing chrome,
 * or apply stays isolated via this pass-through shell.
 */
export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-dvh bg-pc-white">{children}</div>;
}
