"use client";

import { type ArticleDetailsProps, ArticleDetails } from "./ArticleDetails";

export type ArticleHighlightProps = ArticleDetailsProps;

export const ArticleHighlight = ({
  article,
  ...restProps
}: ArticleHighlightProps) => (
  <div
    className="w-full bg-center bg-cover rounded-xl overflow-hidden flex flex-col flex-nowrap justify-end items-stretch pt-[50%] cursor-pointer"
    style={{ backgroundImage: `url(${article.image})` }}
    onClick={() => {
      window.location.href = `/articles/${article.slug}`;
    }}
  >
    <div className="p-3 backdrop-blur-md bg-neutral-300/70 dark:bg-neutral-900/70 break-words">
      {<ArticleDetails article={article} {...restProps} />}
    </div>
  </div>
);
