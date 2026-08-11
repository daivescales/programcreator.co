import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ["", "/legal", "/terms", "/privacy", "/cookies", "/disclaimer"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/legal" ? 0.5 : 0.4,
  }));
}
