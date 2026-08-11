import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api", "/apply", "/book"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
