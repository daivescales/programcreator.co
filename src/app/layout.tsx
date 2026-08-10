import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import { Toaster } from "sonner";
import { faqItems } from "@/content/faq";
import { site } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

const description =
  "I build digital products for creators and rebuild storefronts for physical brands, then scale them through the audience you already have. Creators pay a revenue split. Product brands pay a retainer.";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Creator Product Scaling by ${site.founder}`,
    template: `%s · ${site.name}`,
  },
  description,
  keywords: [
    "ProgramCreator",
    "Creator Product Scaling",
    "Daive",
    "digital products",
    "creator courses",
    "storefront conversion",
    "revenue split",
  ],
  authors: [{ name: site.founder }],
  creator: site.handle,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — Creator Product Scaling by ${site.founder}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Creator Product Scaling by ${site.founder}`,
    description,
    creator: site.handle,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description,
    url: siteUrl,
    founder: {
      "@type": "Person",
      name: site.founder,
      sameAs: [`https://x.com/${site.handle.replace("@", "")}`],
    },
    areaServed: "Worldwide",
    email: site.email,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-pc-white text-pc-body`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
        <Toaster theme="light" position="top-center" richColors />
      </body>
    </html>
  );
}
