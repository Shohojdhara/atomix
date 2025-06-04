import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atomix Design System",
  description:
    "Modern, accessible, and beautiful React components built with design tokens",
  keywords: ["design system", "react", "components", "ui", "accessibility"],
  authors: [{ name: "Atomix Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://liimonx.github.io/atomix/css/docs.min.css"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
