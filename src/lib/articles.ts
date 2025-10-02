import path from "node:path";
import { readFile, readdir, stat } from "node:fs/promises";
import { z } from "zod";

export type ArticleEntry = z.infer<typeof ArticlesCache.articleEntrySchema>;
export type ArticleMetadata = Omit<ArticleEntry, "content">;

class ArticlesCache {
  public isHydrated = false;
  /** Keys are article `slug`s */
  private cache = new Map<string, ArticleEntry>();
  /** A mapping of tags to their corresponding article slugs */
  private tagsToSlugs = new Map<string, Set<string>>();
  private articlesRoot: string;

  constructor({ articlesRoot }: { articlesRoot: string }) {
    this.articlesRoot = articlesRoot;
  }

  private async hydrate(): Promise<void> {
    const filePaths = await ArticlesCache.readArticleDirectory(
      this.articlesRoot
    );

    for (const filePath of filePaths) {
      try {
        const content = await readFile(filePath, "utf-8");
        const article = ArticlesCache.stringToArticleEntry(content);

        if (!article.active) {
          continue;
        }

        this.cache.set(article.slug, article);
        article.tags.forEach((tag) => {
          let slugSet = this.tagsToSlugs.get(tag);
          if (!slugSet) {
            slugSet = new Set<string>();
            this.tagsToSlugs.set(tag, slugSet);
          }
          slugSet.add(article.slug);
        });
      } catch (e) {
        console.error(`Error processing file ${filePath}:`, e);
        continue;
      }
    }

    if (process.env.NODE_ENV === "development") {
      return;
    }
    this.isHydrated = true;
  }

  public async getAll(): Promise<ArticleMetadata[]> {
    if (!this.isHydrated) {
      await this.hydrate();
    }

    return ArticlesCache.sortArticles(Array.from(this.cache.values())).map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ content, ...metadata }) => metadata
    );
  }

  public async getBySlug(slug: string): Promise<ArticleEntry | null> {
    if (!this.isHydrated) {
      await this.hydrate();
    }

    const article = this.cache.get(slug);
    if (!article) {
      console.error(`Article with slug ${slug} not found in cache`);
      return null;
    }

    return article;
  }

  public async getMetadataBySlug(
    slug: string
  ): Promise<ArticleMetadata | null> {
    const article = await this.getBySlug(slug);
    if (!article) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...metadata } = article;
    return metadata;
  }

  public async getAllForTag(tag: string): Promise<ArticleMetadata[]> {
    if (!this.isHydrated) {
      await this.hydrate();
    }

    const slugSet = this.tagsToSlugs.get(tag);
    if (!slugSet) {
      return [];
    }

    const articles: ArticleEntry[] = [];
    for (const slug of slugSet) {
      const article = await this.getBySlug(slug);
      if (article) {
        articles.push(article);
      }
    }

    return ArticlesCache.sortArticles(articles).map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ content, ...metadata }) => metadata
    );
  }

  public async getAllTags(): Promise<string[]> {
    if (!this.isHydrated) {
      await this.hydrate();
    }

    return Array.from(this.tagsToSlugs.keys()).sort();
  }

  public async getAllSlugs(): Promise<string[]> {
    if (!this.isHydrated) {
      await this.hydrate();
    }

    return Array.from(this.cache.keys()).sort();
  }

  static sortArticles(articles: ArticleEntry[]): ArticleEntry[] {
    return articles.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  static stringToArticleEntry(content: string): ArticleEntry {
    const commentStart = content.indexOf("<!--");
    const commentEnd = content.indexOf("-->");
    if (commentStart === -1 || commentEnd === -1 || commentEnd < commentStart) {
      throw new Error("Invalid or missing metadata comment block");
    }

    const metadataContent = content.slice(commentStart + 4, commentEnd).trim();
    const metadataLines = metadataContent.split("\n");
    const title = metadataLines
      .find((line) => line.startsWith("title:"))
      ?.replace("title:", "")
      .trim();
    const active = metadataLines
      .find((line) => line.startsWith("active:"))
      ?.replace("active:", "")
      .trim();
    const slug = metadataLines
      .find((line) => line.startsWith("slug:"))
      ?.replace("slug:", "")
      .trim();
    const description = metadataLines
      .find((line) => line.startsWith("description:"))
      ?.replace("description:", "")
      .trim();
    const tags =
      metadataLines
        .find((line) => line.startsWith("tags:"))
        ?.replace("tags:", "")
        .trim()
        .split(",")
        .map((tag) => ArticlesCache.formatTag(tag))
        .filter((tag) => tag.length > 0)
        .sort() ?? [];
    const date = metadataLines
      .find((line) => line.startsWith("date:"))
      ?.replace("date:", "")
      .trim();

    return ArticlesCache.articleEntrySchema.parse({
      title,
      active: active?.toLowerCase() === "true",
      slug,
      description,
      tags,
      date,
      content: content.replace(/<!--[\s\S]*?-->/g, "").trim(),
    });
  }

  static formatTag(tag: string): string {
    return tag
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .trim();
  }

  static async readArticleDirectory(directory: string): Promise<string[]> {
    const files = await readdir(directory);

    const filePaths: string[] = [];
    for (const file of files) {
      const fullPath = path.join(directory, file);
      const fileStat = await stat(fullPath);
      if (fileStat.isDirectory()) {
        const nestedFiles = await this.readArticleDirectory(fullPath);
        filePaths.push(...nestedFiles);
      } else if (fileStat.isFile() && path.extname(fullPath) === ".md") {
        filePaths.push(fullPath);
      }
    }

    return filePaths.sort();
  }

  static articleEntrySchema = z.object({
    title: z.string(),
    active: z.boolean(),
    slug: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z
      .string()
      .refine((date) => !Number.isNaN(Date.parse(date)), {
        message: "Invalid date format",
      })
      .transform((date) => new Date(date)),
    content: z.string(),
  });
}

// TODO: use env variable created in next.config.js
const appRoot = process.cwd();
export const articlesCache = new ArticlesCache({
  articlesRoot: path.join(appRoot, "src", "articles"),
});
