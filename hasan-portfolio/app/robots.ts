import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://my-portfolio-six-wheat-43.vercel.app/sitemap.xml",
  };
}
