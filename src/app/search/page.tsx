import { ArticlesSearch } from "@/components/ArticlesSearch";
import { getArticles } from "@/lib/articles";

export const dynamic = "force-static";

export const metadata = {
  title: "Search",
  description: "Search articles",
};

const Page = async () => {
  const articles = await getArticles();
  const minimalArticles = articles.map(({ title, slug, description }) => ({
    title,
    slug,
    description,
  }));
  return (
    <main>
      <ArticlesSearch articles={minimalArticles} />
    </main>
  );
};

export default Page;
