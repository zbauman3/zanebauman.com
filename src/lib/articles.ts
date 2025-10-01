import path from "node:path";
import { readFile, readdir, stat } from "node:fs/promises";
import { z } from "zod";

const appRoot = process.cwd();
const articlesDir = path.join(appRoot, "src", "articles");

export const articleEntrySchema = z.object({
  title: z.string(),
  path: z.string(),
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
});
export type ArticleEntry = z.infer<typeof articleEntrySchema>;

const readArticleDirectory = async (directory: string): Promise<string[]> => {
  const files = await readdir(directory);

  const filePaths: string[] = [];
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const fileStat = await stat(fullPath);
    if (fileStat.isDirectory()) {
      const nestedFiles = await readArticleDirectory(fullPath);
      filePaths.push(...nestedFiles);
    } else if (fileStat.isFile() && path.extname(fullPath) === ".md") {
      filePaths.push(fullPath);
    }
  }

  return filePaths.sort();
};

const articleContentToDetails = ({
  content,
  path,
}: {
  content: string;
  path: string;
}): ArticleEntry => {
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
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0) ?? [];
  const date = metadataLines
    .find((line) => line.startsWith("date:"))
    ?.replace("date:", "")
    .trim();

  return articleEntrySchema.parse({
    path,
    title,
    active: active?.toLowerCase() === "true",
    slug,
    description,
    tags,
    date,
  });
};

export const getArticleContent = async (
  article: ArticleEntry
): Promise<string> => {
  const content = await readFile(article.path, "utf-8");
  return content.replace(/<!--[\s\S]*?-->/g, "").trim();
};

export const getArticles = async (): Promise<ArticleEntry[]> => {
  const filePaths = await readArticleDirectory(articlesDir);

  const articles: ArticleEntry[] = [];
  for (const filePath of filePaths) {
    try {
      const content = await readFile(filePath, "utf-8");
      const metadata = articleContentToDetails({ content, path: filePath });
      if (!metadata.active) {
        continue;
      }
      articles.push(metadata);
    } catch (e) {
      console.error(`Error processing file ${filePath}:`, e);
      continue;
    }
  }

  return articles;
};

export const getAllArticleSlugs = async (): Promise<{ slug: string }[]> => {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
};

export const getArticleFromSlug = async (
  slug: string
): Promise<ArticleEntry> => {
  const articles = await getArticles();

  const article = articles.find((article) => article.slug === slug);
  if (!article) {
    throw new Error(`Article with slug ${slug} not found`);
  }

  return article;
};

export const formatTag = (tag: string): string => {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export const getAllTags = async (): Promise<{ tag: string }[]> => {
  const articles = await getArticles();
  const tagSet = new Set<string>();

  for (const article of articles) {
    for (const tag of article.tags) {
      tagSet.add(formatTag(tag));
    }
  }

  return Array.from(tagSet)
    .sort()
    .map((tag) => ({ tag }));
};

export const getAllArticlesForTag = async (
  tag: string
): Promise<ArticleEntry[]> => {
  const articles = await getArticles();
  return articles.filter((article) => article.tags.includes(tag));
};
