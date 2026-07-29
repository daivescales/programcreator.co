import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Call",
  description:
    "Thanks for applying to ProgramCreator. Book a call with Daive to go through your answers.",
  robots: { index: false, follow: false },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
