import type { Metadata } from "next";
import { Caveat, Inter_Tight } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import ScrollProgress from "@/components/system/ScrollProgress";
import { Toaster } from "@/components/ui/sonner";
import { faqItems } from "@/content/faq";
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
  weight: ["400"],
  display: "swap",
  preload: true,
  variable: "--font-hand",
});

const description =
  "I build digital products for creators and rebuild storefronts for physical brands, then scale them through the audience you already have. Creators pay a revenue split. Product brands pay a retainer.";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;
const email = contactEmail();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name}, Creator Product Scaling by ${site.founder}`,
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
    title: `${site.name}, Creator Product Scaling by ${site.founder}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, Creator Product Scaling by ${site.founder}`,
    description,
    creator: site.handle,
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
    description,
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
