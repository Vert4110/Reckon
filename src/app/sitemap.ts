import type { MetadataRoute } from "next";
import { getAllTools } from "@/lib/engine/registry";

const SITE_URL = "https://example.com"; // replace with your real domain
const LOCALES = ["en", "fr"];

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllTools();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({ url: `${SITE_URL}/${locale}`, changeFrequency: "weekly", priority: 1 });
    for (const tool of tools) {
      entries.push({
        url: `${SITE_URL}/${locale}/${tool.category}/${tool.id}`,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
