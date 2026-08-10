import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ["", "/privacy", "/terms"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.4,
  }));
}
