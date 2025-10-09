import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export const PageWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <div className="min-h-screen flex flex-col flex-nowrap justify-stretch">
      <Navigation />
      <main className="block max-w-3xl w-full mx-auto p-4 shrink-0 grow">
        {title && <h1 className="mb-10">{title}</h1>}
        {children}
      </main>
      <Footer />
    </div>
  );
};
