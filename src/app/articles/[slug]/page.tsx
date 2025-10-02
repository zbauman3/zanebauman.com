import "../../../styles/markdown.css";

import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeToc from "@jsdevtools/rehype-toc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

import { articlesCache } from "@/lib/articles";
import { Metadata } from "next";
import { formatDate } from "@/lib/dates";
import { PageWrapper } from "@/components/PageWrapper";
import { ArticleDetails } from "@/components/ArticleDetails";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";

export const generateStaticParams = async (): Promise<
  Awaited<Props["params"]>[]
> => {
  const allSlugs = await articlesCache.getAllSlugs();
  return allSlugs.map((slug) => ({
    slug,
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  try {
    const { slug } = await params;
    const article = await articlesCache.getMetadataBySlug(slug);
    if (!article) {
      throw new Error("Article not found");
    }

    const metadata: Metadata = {
      title: `Zane Bauman | ${article.title} | ${formatDate(article.date)}`,
      description: article.description,
    };

    return metadata;
  } catch (e) {
    console.error(e);
    return {
      title: `Zane Bauman | Not Found`,
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customizeTOC = (toc: any) => {
  // console.log(JSON.stringify(toc, null, 2));
  // Customize the TOC as needed
  return {
    type: "element",
    tagName: "div",
    properties: { className: "toc-wrapper" },
    children: [
      {
        type: "element",
        tagName: "div",
        properties: { className: "toc-title" },
        children: [
          {
            type: "text",
            value: "Table of Contents",
          },
        ],
      },
      toc,
    ],
  };
};

const Page = async ({ params }: Props) => {
  try {
    const { slug } = await params;
    const article = await articlesCache.getBySlug(slug);
    if (!article) {
      return notFound();
    }
    return (
      <PageWrapper>
        <ArticleDetails TitleComponent="h1" article={article} disableLink />
        <div className="h-7" />
        <div className="markdown">
          <Markdown
            rehypePlugins={[
              rehypeRaw,
              rehypeSlug,
              [rehypeToc, { nav: false, customizeTOC }],
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ]}
            remarkPlugins={[remarkGfm]}
          >
            {article.content}
          </Markdown>
        </div>
      </PageWrapper>
    );
  } catch (e) {
    console.error(e);
    return notFound();
  }
};

export default Page;
