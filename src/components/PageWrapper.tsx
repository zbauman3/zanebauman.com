"use client";

import { Navigation } from "./Navigation";

export const PageWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <>
      <Navigation />
      <main className="block max-w-3xl w-full mx-auto p-4">
        {title && <h1 className="mb-10">{title}</h1>}
        {children}
      </main>
    </>
  );
};
