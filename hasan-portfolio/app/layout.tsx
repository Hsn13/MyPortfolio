import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import MotionProvider from "@/components/MotionProvider";
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
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hasan Khesro - Full-Stack Engineer and AI Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasan Khesro | Full-Stack Engineer & AI Builder",
    description: "Building AI-driven products from idea to production.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="antialiased">
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
