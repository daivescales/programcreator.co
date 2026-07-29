import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programcreator.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ProgramCreator | Turn Your Audience Into Income",
    template: "%s | ProgramCreator",
  },
  description:
    "ProgramCreator is led by Daive. We find how creators and businesses can monetise the audience they already have — then build that product for them.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ProgramCreator",
    title: "ProgramCreator | Turn Your Audience Into Income",
    description:
      "Turn your audience into income. Built by Daive — for creators and businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProgramCreator | Turn Your Audience Into Income",
    description:
      "Turn your audience into income. Built by Daive — for creators and businesses.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
