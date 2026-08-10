import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import SmoothScroll from "@/components/system/SmoothScroll";
import Grain from "@/components/system/Grain";
import CustomCursor from "@/components/system/CustomCursor";
import ScrollProgress from "@/components/system/ScrollProgress";
import IntroLoader from "@/components/system/IntroLoader";
import { Toaster } from "@/components/ui/sonner";
import { faqItems } from "@/content/faq";
import { site } from "@/lib/site-config";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  preload: true,
  variable: "--font-serif",
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
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased bg-navy-800 text-pc-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Grain />
          <CustomCursor />
          <ScrollProgress />
          <IntroLoader />
          <SiteChrome>{children}</SiteChrome>
        </SmoothScroll>
        <Toaster theme="dark" position="top-center" richColors />
      </body>
    </html>
  );
}
