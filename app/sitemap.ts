import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programcreator.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    "",
    "/about",
    "/services",
    "/process",
    "/results",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/disclaimer",
    "/earnings-disclaimer",
    "/accessibility",
  ];

  const legal = new Set([
    "/privacy",
    "/terms",
    "/cookies",
    "/disclaimer",
    "/earnings-disclaimer",
    "/accessibility",
  ]);

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : legal.has(route) ? 0.3 : 0.7,
  }));
}
