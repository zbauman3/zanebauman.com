import { notFound } from "next/navigation";
import markdownit from "markdown-it";

import { articlesCache } from "@/lib/articles";
import { Metadata } from "next";
import { formatDate } from "@/lib/dates";
import { PageWrapper } from "@/components/PageWrapper";

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

const Page = async ({ params }: Props) => {
  try {
    const { slug } = await params;
    const article = await articlesCache.getBySlug(slug);
    if (!article) {
      return notFound();
    }
    const __html = markdownit().render(article.content);
    return (
      <PageWrapper>
        <div dangerouslySetInnerHTML={{ __html }} />
      </PageWrapper>
    );
  } catch (e) {
    console.error(e);
    return notFound();
  }
};

export default Page;
