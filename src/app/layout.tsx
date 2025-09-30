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
      <head>
        <style>{"html,body{margin:0;padding:0;font-family:sans-serif;}"}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
