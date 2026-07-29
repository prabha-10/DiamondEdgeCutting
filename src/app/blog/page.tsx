import type { Metadata } from "next";
import BlogIndexClient from "@/components/sections/blog/BlogIndexClient";
import { BlogCTA } from "@/components/sections/blog/BlogCTA";
import { BlogIndexSchema } from "@/components/seo/BlogSchema";
import { getPostCategoryContent, getPostListContent } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Demolition Insights & Guides | Diamond Edge Cutting",
  description:
    "Contractor-grade guides on demolition cost, permits, method and equipment across Dubai, Abu Dhabi and the GCC — written by the team delivering the work since 2008.",
};

// Re-fetch from Sanity at most once a minute so Studio edits show up quickly
// without hammering the API. Same policy as every other CMS-backed page.
export const revalidate = 60;

export default async function BlogPage() {
  // Both resolvers already swallow and log Sanity failures, returning empty
  // arrays — /blog degrades to its empty state rather than 500ing.
  const [posts, categories] = await Promise.all([
    getPostListContent(),
    getPostCategoryContent(),
  ]);

  // Posts arrive newest-first, so the first flagged one is the newest flagged
  // one. Falling back to the newest post overall means the lead slot is never
  // empty just because nobody remembered to tick the box.
  const featured = posts.find((post) => post.featured) ?? posts[0] ?? null;

  // Only offer filters that actually have posts behind them, so no pill comes
  // up empty — same rule as the /projects category pills.
  const presentSlugs = new Set(posts.map((post) => post.category.slug));
  const activeCategories = categories.filter((category) => presentSlugs.has(category.slug));

  return (
    <>
      <BlogIndexSchema posts={posts} />
      <BlogIndexClient posts={posts} categories={activeCategories} featured={featured} />
      <BlogCTA heading="Have a project to discuss?" ctaLabel="Discuss Your Project" />
    </>
  );
}
