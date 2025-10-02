import Link from "next/link";

export type TagListProps = {
  tags: string[];
  hideTags?: string[];
};

const TagListItem = ({ tag }: { tag: string }) => (
  <li>
    <Link
      className="rounded-4xl bg-neutral-200 dark:bg-neutral-800 px-2 py-1 text-sm"
      href={`/tags/${tag}`}
    >
      {tag}
    </Link>
  </li>
);

export const TagList = ({ tags, hideTags = [] }: TagListProps) => {
  return (
    <ul className="inline-flex flex-wrap flex-row gap-2">
      {tags
        .filter((tag) => !hideTags.includes(tag))
        .map((tag) => (
          <TagListItem key={tag} tag={tag} />
        ))}
    </ul>
  );
};
