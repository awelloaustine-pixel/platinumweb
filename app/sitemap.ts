import type { MetadataRoute } from "next";
import { seo, site } from "@/lib/content";

// lastModified comes from content.ts (not `new Date()`, which Cache Components
// rejects during prerender and which would claim a change on every build).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(seo.lastUpdated);
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
