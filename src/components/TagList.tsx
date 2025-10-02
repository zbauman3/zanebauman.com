"use client";

import { ArticleMetadata } from "@/lib/articles";
import { ArticlesSearch } from "./ArticlesSearch";

export const TagList = ({
  tag,
  articles,
}: {
  tag: string;
  articles: ArticleMetadata[];
}) => {
  return (
    <>
      <h2>Tag &quot;{tag}&quot;</h2>
      <ArticlesSearch articles={articles} hideTags={[tag]} />
    </>
  );
};
