import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://hasankhesro.com"),
  title: "Hasan Khesro | Full-Stack Engineer & AI Builder",
  description:
    "Hasan Khesro is a Bahrain-based software engineer building full-stack applications, AI solutions, and digital products from concept to production.",
  openGraph: {
    title: "Hasan Khesro | Full-Stack Engineer & AI Builder",
    description:
      "Building AI-driven products from idea to production. Full-stack engineer, AI builder, and project lead based in Bahrain.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasan Khesro | Full-Stack Engineer & AI Builder",
    description: "Building AI-driven products from idea to production.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
