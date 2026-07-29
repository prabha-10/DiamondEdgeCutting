import React from "react";
import type { PostDetail, PostListItem } from "@/lib/blog";

// JSON-LD for the two blog surfaces.
//
// Deliberately a plain <script> tag rather than the next/script
// strategy="beforeInteractive" used by the other six schema components in this
// folder. That strategy does not emit a tag into the HTML at all — it pushes
// the payload into a `self.__next_s` array for the client to inject, which is
// what the `no-before-interactive-script-outside-document` eslint warning is
// about. Google executes JS and usually still picks it up; crawlers that do not
// (Bing, LinkedIn, most social scrapers) see nothing. A plain tag is also what
// the Next 16 docs recommend for JSON-LD — see
// node_modules/next/dist/docs/01-app/02-guides/json-ld.md.
//
// The existing components should move to this shape too, but that is a change
// to five other pages and is left alone here.
//
// URLs are hardcoded to the production origin, matching Schema.tsx and
// ProjectSchema.tsx. NEXT_PUBLIC_SITE_URL is not used deliberately — it is
// unset in production today and resolves to the Vercel staging domain
// (HANDOFF.md §5), which would publish staging URLs into structured data. The
// staging copy is Disallow'ed in robots.ts, so it is never crawled anyway.
const SITE = "https://diamondedgecutting.com";
const ORGANIZATION_ID = `${SITE}/#organization`;

// Titles, excerpts and author bios are editor-supplied, so a stray "<" in
// Studio could otherwise close the script tag early. Escaping it to its unicode
// form keeps the JSON valid and the tag intact, per the Next docs above.
function serialize(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export function BlogIndexSchema({ posts }: { posts: PostListItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Diamond Edge Cutting — Insights",
    "description":
      "Contractor-grade guidance on demolition method, permits, equipment and cost across Dubai, Abu Dhabi and the wider GCC.",
    "url": `${SITE}/blog`,
    "publisher": { "@id": ORGANIZATION_ID },
    "blogPost": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `${SITE}/blog/${post.slug}`,
      "image": post.imageUrl,
      "datePublished": post.publishedAt,
      "articleSection": post.category.title,
      ...(post.authorName ? { author: { "@type": "Person", name: post.authorName } } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(schema) }}
    />
  );
}

export function BlogPostingSchema({ post }: { post: PostDetail }) {
  const url = `${SITE}/blog/${post.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        "headline": post.title,
        "description": post.excerpt,
        "url": url,
        "mainEntityOfPage": { "@type": "WebPage", "@id": url },
        "image": post.imageUrl,
        "datePublished": post.publishedAt,
        "dateModified": post.publishedAt,
        "articleSection": post.category.title,
        "wordCount": post.wordCount,
        "inLanguage": "en",
        "author": {
          "@type": "Person",
          "name": post.author.name,
          "jobTitle": post.author.role,
          ...(post.author.linkedin ? { sameAs: [post.author.linkedin] } : {}),
        },
        "publisher": { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE}/` },
          { "@type": "ListItem", "position": 2, "name": "Insights", "item": `${SITE}/blog` },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(schema) }}
    />
  );
}
