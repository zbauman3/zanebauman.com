"use client";

import { ArticleEntry } from "@/lib/articles";
import { useState } from "react";

export const TagsList = ({
  tag,
  articles,
}: {
  tag: string;
  articles: ArticleEntry[];
}) => {
  const [query, setQuery] = useState("");

  return (
    <>
      <h2>Articles tagged with &quot;{tag}&quot;</h2>
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
