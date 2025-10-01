import { notFound } from "next/navigation";

import { getAllTags, getAllArticlesForTag } from "@/lib/articles";
import { TagsList } from "@/components/TagsList";

type Props = {
  params: Promise<Awaited<ReturnType<typeof getAllTags>>[number]>;
};

export const dynamic = "force-static";

export const generateStaticParams = getAllTags;

export const generateMetadata = async ({ params }: Props) => {
  try {
    const { tag } = await params;

    return {
      title: `Zane Bauman | Tag | ${tag}`,
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
    const articles = await getAllArticlesForTag(tag);
    if (articles.length === 0) {
      return notFound();
    }

    return <TagsList tag={tag} articles={articles} />;
  } catch (e) {
    console.error(e);
    notFound();
  }
};

export default Page;
