import React from "react";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import type { PostAuthorContent } from "@/lib/blog";

// Two renders of the same author document:
//   variant="byline" — compact, sits in the article header meta row
//   variant="bio"    — panel at the foot of the article
//
// The photo is optional in the schema, so both fall back to initials on a red
// disc rather than leaving a hole where the avatar should be.

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function Avatar({ author, size }: { author: PostAuthorContent; size: "sm" | "lg" }) {
  const dimensions = size === "sm" ? "w-9 h-9 text-[12px]" : "w-16 h-16 text-[18px]";
  if (author.photoUrl) {
    return (
      <div className={`relative shrink-0 overflow-hidden rounded-full bg-brand-gray-100 ${dimensions}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={author.photoUrl}
          alt={author.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className={`shrink-0 rounded-full bg-brand-red text-white font-display font-bold flex items-center justify-center tracking-[0.04em] ${dimensions}`}
    >
      {initialsOf(author.name)}
    </div>
  );
}

export function AuthorCard({
  author,
  variant,
}: {
  author: PostAuthorContent;
  variant: "byline" | "bio";
}) {
  if (variant === "byline") {
    return (
      <div className="flex items-center gap-3">
        <Avatar author={author} size="sm" />
        <div className="flex flex-col">
          <span className="font-['Inter_Display',sans-serif] text-[14px] font-semibold text-brand-gray-900">
            {author.name}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-brand-gray-500">
            {author.role}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-gray-100 rounded-[20px] p-7 md:p-8 flex flex-col sm:flex-row gap-6">
      <Avatar author={author} size="lg" />
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-red">
          Written by
        </span>
        <h2 className="font-display font-bold uppercase text-brand-gray-900 text-[20px] md:text-[22px] tracking-[0.04em] leading-[1.1]">
          {author.name}
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-brand-gray-500">
          {author.role}
        </span>
        {author.bio && (
          <p className="mt-1 font-['Inter_Display',sans-serif] text-[15px] md:text-[16px] leading-[1.6] text-brand-gray-700">
            {author.bio}
          </p>
        )}
        {author.linkedin && (
          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-brand-gray-500 hover:text-brand-red transition-colors"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
