import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're In",
  description: "Thanks for applying to ProgramCreator. Book a call with Daive.",
  robots: { index: false, follow: false },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
