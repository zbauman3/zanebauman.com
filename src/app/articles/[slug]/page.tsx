import markdownit from "markdown-it";

import { getAllArticleSlugs, getArticleFromSlug } from "@/lib/articles";

type Props = {
  params: Promise<Awaited<ReturnType<typeof getAllArticleSlugs>>[number]>;
};

export const dynamic = "force-static";

export const generateStaticParams = getAllArticleSlugs;
export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const post = await getArticleFromSlug(slug);

  return {
    title: post.title,
    description: post.description,
  };
};

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const { content } = await getArticleFromSlug(slug);
  const __html = markdownit().render(content);
  return <main dangerouslySetInnerHTML={{ __html }} />;
};

export default Page;
