import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PostListItem } from "@/lib/blog";
import { PostCard } from "./PostCard";

// Foot-of-article row. Section shell matches RelatedEquipment so both "more
// like this" surfaces on the site sit on the same grey band with the same
// top border.
export function RelatedPosts({
  posts,
  title = "Related articles",
}: {
  posts: PostListItem[];
  title?: string;
}) {
  if (!posts || posts.length === 0) return null;
  return (
    <section className="py-20 md:py-24 bg-brand-gray-50 border-t border-brand-gray-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <h2 className="font-display font-medium text-brand-gray-900 text-[32px] md:text-[40px] tracking-tight leading-[1.1]">
            {title}
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-brand-gray-500 hover:text-brand-red transition-colors"
          >
            All articles
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
