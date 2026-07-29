import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programcreator.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ProgramCreator | I Build The Product Your Audience Already Wants",
    template: "%s | ProgramCreator",
  },
  description:
    "ProgramCreator is a done-with-you build partner for creators and brand owners. I personally scale your brand and build the product alongside you — clothing, info products, or paid communities.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ProgramCreator",
    title: "ProgramCreator | I Build The Product Your Audience Already Wants",
    description:
      "Done-with-you product builds for creators and brand owners. Not a course. Not coaching. The actual build.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProgramCreator | I Build The Product Your Audience Already Wants",
    description:
      "Done-with-you product builds for creators and brand owners. Not a course. Not coaching. The actual build.",
  },
};

export const viewport: Viewport = {
  themeColor: "#04060B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
