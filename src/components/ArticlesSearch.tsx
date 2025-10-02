"use client";

import { ArticleMetadata } from "@/lib/articles";
import { useState } from "react";
import { ArticleItem } from "./ArticleItem";

export type ArticlesSearchProps = {
  articles: ArticleMetadata[];
  hideTags?: string[];
};

export const ArticlesSearch = ({
  articles,
  hideTags = [],
}: ArticlesSearchProps) => {
  const [query, setQuery] = useState("");

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
      />
      <ul>
        {articles
          .filter((article) =>
            article.title.toLowerCase().includes(query.toLowerCase())
          )
          .map((article) => (
            <li key={article.slug}>
              <ArticleItem article={article} hideTags={hideTags} />
            </li>
          ))}
      </ul>
    </>
  );
};
