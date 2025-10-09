import "../styles/global.css";

import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId="G-11V7VVMBB3" />
      )}
    </html>
  );
}
