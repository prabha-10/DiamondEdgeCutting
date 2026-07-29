import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PostListItem } from "@/lib/blog";
import { CategoryBadge } from "./CategoryBadge";

// The archive card. Shell is the site's canonical card, lifted verbatim from
// ServiceDetails so /blog sits in the same visual family as /demolition-services:
// same radius, same shadow pair, same lift on hover, same 16:10 image frame.
// Only the body contents differ — badge, headline, excerpt, then the meta line
// (date + read time) that usfdemolition puts under every entry.
export function PostCard({ post }: { post: PostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-[20px] overflow-hidden flex flex-col shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.13)] hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-brand-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.imageUrl}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="p-7 md:p-8 flex flex-col gap-3.5 flex-1">
        <CategoryBadge label={post.category.title} color={post.category.color} />

        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display font-extrabold uppercase text-brand-gray-900 text-[22px] md:text-[24px] tracking-[0.04em] leading-[1.1] group-hover:text-brand-red transition-colors">
            {post.title}
          </h2>
          <ArrowUpRight
            className="w-5 h-5 shrink-0 mt-1 text-brand-gray-500 group-hover:text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            strokeWidth={2}
          />
        </div>

        <p className="font-['Inter_Display',sans-serif] text-[14px] md:text-[15px] leading-[1.6] text-brand-gray-700">
          {post.excerpt}
        </p>

        {/* Meta line, pinned to the bottom so cards of unequal excerpt length
            still line their dates up across a row. */}
        <div className="mt-auto pt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-brand-gray-500">
          <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
}
