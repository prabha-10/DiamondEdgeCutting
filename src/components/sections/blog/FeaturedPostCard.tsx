import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PostListItem } from "@/lib/blog";
import { CategoryBadge } from "./CategoryBadge";

// The lead slot at the top of /blog — usfdemolition's "Featured" treatment,
// rebuilt on this site's card shell. Same radius, shadow and hover lift as
// PostCard; it just runs two-up on desktop and gets the larger headline.
export function FeaturedPostCard({ post }: { post: PostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-[20px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.13)] hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-brand-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.imageUrl}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-5 left-5 inline-flex items-center rounded-full bg-brand-red px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white">
          Featured
        </span>
      </div>

      {/* Body */}
      <div className="p-7 md:p-10 lg:p-12 flex flex-col gap-4 justify-center">
        <CategoryBadge label={post.category.title} color={post.category.color} />

        <h2 className="font-display font-extrabold uppercase text-brand-gray-900 text-[28px] md:text-[36px] lg:text-[40px] tracking-[0.02em] leading-[1.05] group-hover:text-brand-red transition-colors">
          {post.title}
        </h2>

        <p className="font-['Inter_Display',sans-serif] text-[16px] md:text-[18px] leading-[1.6] text-brand-gray-700">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-brand-gray-500">
          <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
          {post.authorName && (
            <>
              <span aria-hidden>·</span>
              <span>{post.authorName}</span>
            </>
          )}
        </div>

        <span className="mt-2 inline-flex items-center gap-2 font-sans font-medium text-[15px] text-brand-red">
          Read the article
          <ArrowUpRight
            className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            strokeWidth={2}
          />
        </span>
      </div>
    </Link>
  );
}
