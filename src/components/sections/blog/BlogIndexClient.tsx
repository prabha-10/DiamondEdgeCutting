"use client";

import React, { useMemo, useState } from "react";
import type { PostCategoryContent, PostListItem } from "@/lib/blog";
import { PostCard } from "./PostCard";
import { FeaturedPostCard } from "./FeaturedPostCard";

// The /blog archive. Filter behaviour and pill styling are lifted from
// ProjectsPageClient so both listings on the site work the same way: server
// resolves the category list (Studio's Display Order is the source of truth),
// this component owns only the selection state.

type Props = {
  posts: PostListItem[];
  categories: PostCategoryContent[];
  featured: PostListItem | null;
};

export default function BlogIndexClient({ posts, categories, featured }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const visiblePosts = useMemo(() => {
    // The featured post already has the large card above the grid — repeating
    // it in the first grid slot would read as a duplicate.
    const withoutFeatured = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;
    if (activeCategory === "all") return withoutFeatured;
    // Filtering is a deliberate archive view, so the featured post comes back
    // into the grid when it belongs to the selected category.
    return posts.filter((p) => p.category.slug === activeCategory);
  }, [posts, featured, activeCategory]);

  const showFeatured = activeCategory === "all" && featured !== null;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-44 pb-16 bg-white overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden />
              <span className="font-['Inter_Display',sans-serif] text-[13px] uppercase tracking-[0.12em] text-brand-gray-500">
                Insights &amp; Guides
              </span>
            </div>
            <h1 className="font-display font-medium text-brand-gray-900 text-[56px] md:text-[88px] lg:text-[112px] leading-[0.95] tracking-tight">
              Insights.
            </h1>
            <p className="font-['Inter_Display',sans-serif] text-[16px] md:text-[18px] leading-[1.6] text-brand-gray-700 max-w-2xl">
              Contractor-grade guidance on demolition method, permits, equipment and cost —
              written from projects delivered across Dubai, Abu Dhabi and the wider GCC since
              2008.
            </p>
          </div>

          {/* Category filters — same pills as /projects */}
          {categories.length > 0 && (
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-5 py-2.5 font-sans font-medium text-[14px] transition-colors ${
                  activeCategory === "all"
                    ? "bg-brand-red text-white"
                    : "bg-brand-gray-900 text-white hover:bg-brand-gray-700"
                }`}
              >
                All
              </button>
              {categories.map((cat) => {
                const isActive = cat.slug === activeCategory;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`rounded-full px-5 py-2.5 font-sans font-medium text-[14px] transition-colors ${
                      isActive
                        ? "bg-brand-red text-white"
                        : "bg-brand-gray-900 text-white hover:bg-brand-gray-700"
                    }`}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Featured post */}
      {showFeatured && featured && (
        <section className="pb-12 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <FeaturedPostCard post={featured} />
          </div>
        </section>
      )}

      {/* Archive grid */}
      <section className="pb-20 md:pb-24 bg-white min-h-[400px]">
        <div className="container mx-auto px-4 md:px-8">
          {posts.length > 0 && (
            <div className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gray-500">
              <span>Archive — Latest Articles</span>
              <span className="h-px flex-1 bg-brand-gray-300" aria-hidden />
              <span>
                {visiblePosts.length} {visiblePosts.length === 1 ? "piece" : "pieces"}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visiblePosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-24 flex flex-col items-center gap-4">
              <p className="font-display font-extrabold uppercase text-brand-gray-900 text-[28px] md:text-[36px] tracking-tight">
                No articles published yet
              </p>
              <p className="font-['Inter_Display',sans-serif] text-[16px] leading-[1.6] text-brand-gray-700 max-w-md">
                Guides on demolition cost, permits and method are on the way. In the meantime,
                our team can answer any of it directly.
              </p>
            </div>
          )}

          {posts.length > 0 && visiblePosts.length === 0 && (
            <div className="text-center py-32 font-mono text-brand-gray-500 text-[14px] uppercase tracking-widest">
              No articles in this category yet.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
