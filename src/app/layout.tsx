import "../styles/global.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zane Bauman",
  description: "Zane Bauman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
