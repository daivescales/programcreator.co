import type { Metadata } from "next";
import { Caveat, Inter_Tight } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import ScrollProgress from "@/components/system/ScrollProgress";
import { Toaster } from "@/components/ui/sonner";
import { copy, faqItems } from "@/lib/copy";
import { contactEmail, site } from "@/lib/site-config";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
  variable: "--font-sans",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  preload: true,
  variable: "--font-hand",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;
const email = contactEmail();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: copy.meta.titleDefault,
    template: copy.meta.titleTemplate,
  },
  description: copy.meta.description,
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
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.name,
    title: copy.meta.ogTitle,
    description: copy.meta.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ProgramCreator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.ogTitle,
    description: copy.meta.description,
    creator: site.handle,
    images: ["/og.png"],
  },
};

const sameAs = [
  site.socials.youtube,
  site.socials.instagram,
  site.socials.x,
  site.socials.tiktok,
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: copy.meta.description,
    url: siteUrl,
    founder: {
      "@type": "Person",
      name: site.founder,
      sameAs,
    },
    sameAs,
    areaServed: "Worldwide",
    ...(email ? { email } : {}),
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
    <html
      lang="en"
      className={`${interTight.variable} ${caveat.variable}`}
    >
      <body className="bg-navy-800 font-sans font-normal text-pc-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        <SiteChrome>{children}</SiteChrome>
        <Toaster theme="dark" position="top-center" richColors />
      </body>
    </html>
  );
}
