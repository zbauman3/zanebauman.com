import { PageWrapper } from "@/components/PageWrapper";
import { articlesCache } from "@/lib/articles";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata = {
  title: "Zane Bauman | All Tags",
  description: "Browse all tags",
};

const TagItem = ({ tag }: { tag: string }) => (
  <li>
    <Link
      href={`/tags/${tag}`}
      className="block p-3 rounded-4xl bg-neutral-200 dark:bg-neutral-800 text-xl"
    >
      {tag}
    </Link>
  </li>
);

const Page = async () => {
  const tags = await articlesCache.getAllTags();
  return (
    <PageWrapper title="All Tags">
      <ul className="flex flex-wrap flex-row justify-stretch items-stretch gap-2">
        {tags.map((tag) => (
          <TagItem key={tag} tag={tag} />
        ))}
      </ul>
    </PageWrapper>
  );
};

export default Page;
