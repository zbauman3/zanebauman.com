import { ArticleMetadata } from "@/lib/articles";
import { ArticleDetails, type ArticleDetailsProps } from "./ArticleDetails";

export type ArticlesListProps = Partial<
  Pick<ArticleDetailsProps, "TitleComponent" | "titleClassName">
> & {
  articles: ArticleMetadata[];
  hideTags?: string[];
};

export const ArticlesList = ({
  articles,
  hideTags = [],
  TitleComponent = "h2",
  titleClassName = "text-3xl",
}: ArticlesListProps) => (
  <ul className="flex flex-col gap-8">
    {articles.map((article) => (
      <li key={article.slug}>
        <ArticleDetails
          TitleComponent={TitleComponent}
          article={article}
          hideTags={hideTags}
          titleClassName={titleClassName}
        />
      </li>
    ))}
  </ul>
);
