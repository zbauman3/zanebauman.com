"use client";

import Link from "next/link";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div>
        <Link href="/" className="text-2xl font-bold">
          Home
        </Link>
        <Link href="/search" className="ml-4 text-2xl font-bold">
          Search
        </Link>
        <Link href="/articles" className="ml-4 text-2xl font-bold">
          All Articles
        </Link>
        <Link href="/tags" className="ml-4 text-2xl font-bold">
          All Tags
        </Link>
      </div>
      <main>{children}</main>
    </div>
  );
};
