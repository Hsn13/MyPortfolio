import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hasankhesro.com";
  const latestPostDate = posts.reduce(
    (latest, post) => (post.date > latest ? post.date : latest),
    posts[0]?.date ?? "2023-01-01"
  );

  return [
    { url: baseUrl, lastModified: latestPostDate, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: latestPostDate, changeFrequency: "monthly", priority: 0.8 },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
