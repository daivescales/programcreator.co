import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Intro Call",
  description:
    "Thanks for applying to ProgramCreator. Book a short intro call to go over your answers and see what makes sense to build.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
