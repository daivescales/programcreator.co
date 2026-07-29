import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programcreator.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/apply", "/thank-you"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
