"use client";

import { ArticleEntry } from "@/lib/articles";
import { useState } from "react";

export const ArticlesSearch = ({
  articles,
}: {
  articles: Pick<ArticleEntry, "title" | "slug" | "description">[];
}) => {
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
                <p>{article.description}</p>
              </a>
            </li>
          ))}
      </ul>
    </>
  );
};
