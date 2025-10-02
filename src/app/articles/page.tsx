import { ArticleItem } from "@/components/ArticleItem";
import { PageWrapper } from "@/components/PageWrapper";
import { articlesCache } from "@/lib/articles";

export const dynamic = "force-static";

export const metadata = {
  title: "Zane Bauman | All Articles",
  description: "Browse all articles",
};

const Page = async () => {
  const articles = await articlesCache.getAll();
  return (
    <PageWrapper>
      <h2>All Articles</h2>
      {articles.map((article) => (
        <ArticleItem key={article.slug} article={article} />
      ))}
    </PageWrapper>
  );
};

export default Page;
