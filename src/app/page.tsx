import Image from "next/image";

import { ArticleDetails } from "@/components/ArticleDetails";
import { PageWrapper } from "@/components/PageWrapper";
import { articlesCache } from "@/lib/articles";

export const dynamic = "force-static";

const mainImage = "/assets/shared/zane.jpeg";

export const metadata = {
  title: "Zane Bauman | Home",
  openGraph: {
    images: mainImage,
  },
};

export default async function Home() {
  const highlightArticles = await articlesCache.getAllForTag("highlight");
  const hasHighlights = highlightArticles.length > 0;

  return (
    <PageWrapper>
      <section className="flex flex-row flex-wrap md:flex-nowrap items-start justify-start gap-6 mb-6">
        <Image
          src={mainImage}
          width="150"
          height="150"
          alt="Zane Bauman"
          className="rounded-full"
        />
        <div>
          <h1 className="text-3xl mb-3">Hi, I&apos;m Zane</h1>
          <p className="mb-3">
            My passions are building solid foundations and solving unique
            problems.
          </p>
          <p className="mb-3">
            For work, I&apos;m a frontend-platform engineer - building system
            foundations in Vercel/Next.js, TypeScript, Cloudflare Workers,
            Microfrontends, Monorepos, and Mobile applications.
          </p>
          <p>
            For fun, I obsess over embedded systems - researching, tinkering,
            and building personal projects that double as both experiments and
            education.
          </p>
        </div>
      </section>
      {hasHighlights && (
        <section>
          <h2 className="text-3xl mb-6">Highlights</h2>
          <ul className="flex flex-col gap-8">
            {highlightArticles.map((article) => (
              <li key={article.slug}>
                <ArticleDetails
                  TitleComponent="h3"
                  article={article}
                  hideTags={["highlight"]}
                  titleClassName="text-2xl"
                  image={article.image}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageWrapper>
  );
}
