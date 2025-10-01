"use client";

import { ArticleEntry } from "@/lib/articles";
import { useState } from "react";

export type ArticlesSearchProps = {
  articles: Pick<ArticleEntry, "title" | "slug" | "description" | "tags">[];
};

export const ArticlesSearch = ({ articles }: ArticlesSearchProps) => {
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
              <a href={`/articles/${article.slug}`}>
                <h3>{article.title}</h3>
                <p>Description: {article.description}</p>
                <p>Tags: {article.tags.join(", ")}</p>
              </a>
            </li>
          ))}
      </ul>
    </>
  );
};
