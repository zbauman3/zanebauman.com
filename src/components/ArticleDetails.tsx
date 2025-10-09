import { ReactNode } from "react";

import Link from "next/link";

import { ArticleMetadata } from "@/lib/articles";
import { formatDate } from "@/lib/dates";
import { TagList } from "./TagList";

export type ArticleDetailsProps = {
  article: ArticleMetadata;
  hideTags?: string[];
  TitleComponent: React.ElementType;
  titleClassName?: string;
  disableLink?: boolean;
};

const ArticleLink = ({
  slug,
  children,
  disableLink,
}: {
  children: ReactNode;
  slug: string;
  disableLink: boolean;
}) => {
  if (disableLink) {
    return <div className="block mb-3">{children}</div>;
  }

  return (
    <Link className="block mb-3" href={`/articles/${slug}`}>
      {children}
    </Link>
  );
};

export const ArticleDetails = ({
  TitleComponent,
  article,
  disableLink = false,
  hideTags,
  titleClassName,
}: ArticleDetailsProps) => (
  <article>
    <ArticleLink slug={article.slug} disableLink={disableLink}>
      <TitleComponent className={titleClassName}>
        {article.title}
      </TitleComponent>
      <p className="text-sm text-neutral-700 dark:text-neutral-400 pt-0.5">
        {formatDate(article.date)}
      </p>
      <p>{article.description}</p>
    </ArticleLink>
    <TagList tags={article.tags} hideTags={hideTags} />
  </article>
);
