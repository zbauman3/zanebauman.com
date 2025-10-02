import { ArticleMetadata } from "./articles";

export const searchArticles = ({
  articles,
  query,
}: {
  articles: ArticleMetadata[];
  query: string;
}): ArticleMetadata[] => {
  const cleanedQuery = query.trim().toLowerCase();
  const minDifference = 3;

  if (cleanedQuery.length === 0) {
    return [...articles];
  }

  return articles
    .reduce<{ score: number; article: ArticleMetadata }[]>((acc, article) => {
      if (
        article.title.toLowerCase().includes(cleanedQuery) ||
        article.description.toLowerCase().includes(cleanedQuery) ||
        article.tags.join(" ").toLowerCase().includes(cleanedQuery)
      ) {
        return [...acc, { score: 0, article }];
      }

      // Fuzzy search with Levenshtein distance
      const titleDistance = levenshtein(article.title, cleanedQuery);
      if (titleDistance <= minDifference) {
        return [...acc, { score: titleDistance, article }];
      }

      // if the query is shorter, allow for some difference in length
      if (cleanedQuery.length < article.title.length) {
        const diffDistance =
          titleDistance - (article.title.length - cleanedQuery.length);
        if (diffDistance <= minDifference) {
          return [...acc, { score: diffDistance, article }];
        }
      }

      // Fuzzy search with Levenshtein distance
      const descDistance = levenshtein(article.description, cleanedQuery);
      if (descDistance <= minDifference) {
        return [...acc, { score: descDistance, article }];
      }

      // if the query is shorter, allow for some difference in length
      if (cleanedQuery.length < article.description.length) {
        const diffDistance =
          descDistance - (article.description.length - cleanedQuery.length);
        if (diffDistance <= minDifference) {
          return [...acc, { score: diffDistance, article }];
        }
      }

      return acc;
    }, [])
    .sort((a, b) => {
      // sort by score then date
      const scoreSort = a.score - b.score;
      if (scoreSort !== 0) {
        return scoreSort;
      }
      return b.article.date.getTime() - a.article.date.getTime();
    })
    .map(({ article }) => article);
};

// https://en.wikipedia.org/wiki/Levenshtein_distance
const levenshtein = (s1: string, s2: string): number => {
  const m = s1.length;
  const n = s2.length;
  const dp = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // Deletion
        dp[i][j - 1] + 1, // Insertion
        dp[i - 1][j - 1] + cost // Substitution
      );
    }
  }
  return dp[m][n];
};
