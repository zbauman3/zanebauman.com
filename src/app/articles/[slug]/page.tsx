import { notFound } from "next/navigation";
import markdownit from "markdown-it";

import {
  getAllArticleSlugs,
  getArticleContent,
  getArticleFromSlug,
} from "@/lib/articles";
import { Metadata } from "next";
import { formatDate } from "@/lib/dates";

type Props = {
  params: Promise<Awaited<ReturnType<typeof getAllArticleSlugs>>[number]>;
};

export const dynamic = "force-static";

export const generateStaticParams = getAllArticleSlugs;

export const generateMetadata = async ({ params }: Props) => {
  try {
    const { slug } = await params;
    const post = await getArticleFromSlug(slug);
    const date = formatDate(post.date);

    const metadata: Metadata = {
      title: `Zane Bauman | ${post.title} | ${date}`,
      description: post.description,
    };

    return metadata;
  } catch (e) {
    console.error(e);
    return {
      title: `Zane Bauman | Not Found`,
    };
  }
};

const Page = async ({ params }: Props) => {
  try {
    const { slug } = await params;
    const article = await getArticleFromSlug(slug);
    const content = await getArticleContent(article);
    const __html = markdownit().render(content);
    return <main dangerouslySetInnerHTML={{ __html }} />;
  } catch (e) {
    console.error(e);
    notFound();
  }
};

export default Page;
