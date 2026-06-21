import { MetadataRoute } from "next";
import posts from "@/data/blog-posts.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://resumeai.vercel.app";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: baseUrl + "/resume", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: baseUrl + "/cover-letter", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: baseUrl + "/interview", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: baseUrl + "/blog", lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.7 },
  ];

  const blogPages = posts.map((post) => ({
    url: baseUrl + "/blog/" + post.slug,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}