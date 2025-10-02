"use client";

import { ArticleMetadata } from "@/lib/articles";
import { formatDate } from "@/lib/dates";
import Link from "next/link";

export type ArticleItemProps = {
  article: ArticleMetadata;
  hideTags?: string[];
};

export const ArticleItem = ({ article, hideTags = [] }: ArticleItemProps) => {
  return (
    <section>
      <h3>
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h3>
      <p>
        <Link href={`/articles/${article.slug}`}>
          Description: {article.description}
        </Link>
      </p>
      <p>
        <Link href={`/articles/${article.slug}`}>
          Date: {formatDate(article.date)}
        </Link>
      </p>
      <p>
        Tags:{" "}
        {article.tags
          .filter((tag) => !hideTags.includes(tag))
          .map((tag) => (
            <Link key={tag} href={`/tags/${tag}`} className="mr-1">
              {tag}
            </Link>
          ))}
      </p>
    </section>
  );
};
