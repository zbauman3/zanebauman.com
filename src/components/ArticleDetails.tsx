"use client";

import { ArticleMetadata } from "@/lib/articles";
import { formatDate } from "@/lib/dates";
import Link from "next/link";
import { TagList } from "./TagList";

export type ArticleItemProps = {
  article: ArticleMetadata;
  hideTags?: string[];
  TitleComponent: React.ElementType;
  titleClassName?: string;
  disableLink?: boolean;
};

export const ArticleDetails = ({
  article,
  hideTags = [],
  TitleComponent,
  titleClassName,
  disableLink = false,
}: ArticleItemProps) => {
  const innerContent = (
    <>
      <TitleComponent className={titleClassName}>
        {article.title}
      </TitleComponent>
      <p className="text-sm text-neutral-600 dark:text-neutral-500 pt-0.5">
        {formatDate(article.date)}
      </p>
      <p>{article.description}</p>
    </>
  );

  return (
    <article>
      {disableLink && <div className="block mb-3">{innerContent}</div>}
      {!disableLink && (
        <Link href={`/articles/${article.slug}`} className="block mb-3">
          {innerContent}
        </Link>
      )}
      <TagList tags={article.tags} hideTags={hideTags} />
    </article>
  );
};
