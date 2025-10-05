import { ArticlesSearch } from "@/components/ArticlesSearch";
import { PageWrapper } from "@/components/PageWrapper";
import { articlesCache } from "@/lib/articles";

export const dynamic = "force-static";

export const metadata = {
  title: "Zane Bauman | All Articles",
  description: "All Articles",
};

const Page = async () => {
  const articles = await articlesCache.getAll();
  return (
    <PageWrapper title="All Articles">
      <ArticlesSearch articles={articles} />
    </PageWrapper>
  );
};

export default Page;
