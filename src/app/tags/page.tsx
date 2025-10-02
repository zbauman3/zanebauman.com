import { PageWrapper } from "@/components/PageWrapper";
import { articlesCache } from "@/lib/articles";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata = {
  title: "Zane Bauman | All Tags",
  description: "Browse all tags",
};

const Page = async () => {
  const tags = await articlesCache.getAllTags();
  return (
    <PageWrapper>
      <h2>All Tags</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/tags/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
};

export default Page;
