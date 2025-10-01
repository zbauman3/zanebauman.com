import { ArticlesSearch } from "@/components/ArticlesSearch";
import { getArticles } from "@/lib/articles";

export const dynamic = "force-static";

export const metadata = {
  title: "Zane Bauman | Search",
  description: "Search articles",
};

const Page = async () => {
  const articles = await getArticles();
  return (
    <main>
      <ArticlesSearch articles={articles} />
    </main>
  );
};

export default Page;
