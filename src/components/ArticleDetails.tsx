"use client";
import { ReactNode } from "react";

import Link from "next/link";

import { ArticleMetadata } from "@/lib/articles";
import { formatDate } from "@/lib/dates";
import { TagList } from "./TagList";

export type ArticleItemProps = {
  article: ArticleMetadata;
  hideTags?: string[];
  TitleComponent: React.ElementType;
  titleClassName?: string;
  disableLink?: boolean;
  image?: string;
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
  image,
  TitleComponent,
  article,
  disableLink = false,
  hideTags,
  titleClassName,
}: ArticleItemProps) => {
  const innerContent = (
    <>
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
    </>
  );

  if (!image) {
    return <article>{innerContent}</article>;
  }

  return (
    <article
      className="w-full bg-center bg-cover rounded-xl overflow-hidden flex flex-col flex-nowrap justify-end items-stretch pt-[50%]"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="p-3 backdrop-blur-md bg-neutral-300/70 dark:bg-neutral-900/70 break-words">
        {innerContent}
      </div>
    </article>
  );
};
