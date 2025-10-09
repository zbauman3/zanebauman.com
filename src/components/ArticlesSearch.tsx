"use client";

import { useState } from "react";
import { ArticlesList, type ArticlesListProps } from "./ArticlesList";
import { searchArticles } from "@/lib/search";

export type ArticlesSearchProps = ArticlesListProps;

export const ArticlesSearch = ({
  articles,
  hideTags = [],
}: ArticlesSearchProps) => {
  const [query, setQuery] = useState("");
  const filteredArticles = searchArticles({ articles, query });

  return (
    <>
      <search className="w-full mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full py-4 px-2 border border-gray-300 dark:border-gray-600 rounded"
        />
        <p className="text-sm text-neutral-600 dark:text-neutral-500 pt-2">
          {filteredArticles.length} article
          {filteredArticles.length !== 1 && "s"}{" "}
          {query.trim().length > 0 && "found"}
        </p>
      </search>
      <ArticlesList articles={filteredArticles} hideTags={hideTags} />
    </>
  );
};
