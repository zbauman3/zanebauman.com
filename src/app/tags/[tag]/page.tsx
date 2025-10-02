import { notFound } from "next/navigation";

import { articlesCache } from "@/lib/articles";
import { ArticlesSearch } from "@/components/ArticlesSearch";
import { PageWrapper } from "@/components/PageWrapper";

type Props = {
  params: Promise<{
    tag: string;
  }>;
};

export const dynamic = "force-static";

export const generateStaticParams = async (): Promise<
  Awaited<Props["params"]>[]
> => {
  const allTags = await articlesCache.getAllTags();
  return allTags.map((tag) => ({ tag }));
};

export const generateMetadata = async ({ params }: Props) => {
  try {
    const { tag } = await params;

    return {
      title: `Zane Bauman | Tag: ${tag}`,
    };
  } catch (e) {
    console.error(e);
    return {
      title: `Zane Bauman | Not Found`,
    };
  }
};

const Page = async ({ params }: Props) => {
  try {
    const { tag } = await params;
    const articles = await articlesCache.getAllForTag(tag);
    if (articles.length === 0) {
      return notFound();
    }
    return (
      <PageWrapper title={`Tag "${tag}"`}>
        <ArticlesSearch articles={articles} hideTags={[tag]} />
      </PageWrapper>
    );
  } catch (e) {
    console.error(e);
    return notFound();
  }
};

export default Page;
