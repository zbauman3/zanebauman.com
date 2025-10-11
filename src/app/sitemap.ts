import { articlesCache } from "@/lib/articles";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await articlesCache.getAll();

  const articleUrls = articles.map<MetadataRoute.Sitemap[number]>(
    (article) => ({
      url: `https://www.zanebauman.com/articles/${article.slug}`,
      lastModified: article.date,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  articleUrls.push({
    url: `https://www.zanebauman.com/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  });

  return articleUrls;
}
