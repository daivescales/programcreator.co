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
    default: "ProgramCreator | Product Builds for Creators & Brands",
    template: "%s | ProgramCreator",
  },
  description:
    "ProgramCreator is led by Daive — done-with-you product builds for creators and brand owners. Clothing, digital products, and paid communities.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ProgramCreator",
    title: "ProgramCreator | Product Builds for Creators & Brands",
    description:
      "Product builds for creators and brands, led by Daive. Not a course — the actual build.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProgramCreator | Product Builds for Creators & Brands",
    description:
      "Product builds for creators and brands, led by Daive. Not a course — the actual build.",
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
