import type { Metadata } from "next";
import { Space_Grotesk, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "coolstuff — all trends, one place",
  description:
    "Trending products, movies, series and music. Curated, not computed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${serif.variable} ${mono.variable} h-full`}
      style={{ backgroundColor: "#111110", colorScheme: "dark" }}
    >
      <body
        className="min-h-full flex flex-col"
        style={{
          fontFamily: "var(--font-grotesk), system-ui, sans-serif",
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text)",
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
