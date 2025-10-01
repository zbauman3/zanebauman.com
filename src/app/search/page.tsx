import {
  ArticlesSearch,
  type ArticlesSearchProps,
} from "@/components/ArticlesSearch";
import { getArticles } from "@/lib/articles";

export const dynamic = "force-static";

export const metadata = {
  title: "Search",
  description: "Search articles",
};

const Page = async () => {
  const articles = await getArticles();
  const minimalArticles = articles.map<ArticlesSearchProps["articles"][number]>(
    ({ title, slug, description, tags }) => ({
      title,
      slug,
      description,
      tags,
    })
  );
  return (
    <main>
      <ArticlesSearch articles={minimalArticles} />
    </main>
  );
};

export default Page;
