import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AuthorCard } from "@/components/sections/blog/AuthorCard";
import { BlogCTA } from "@/components/sections/blog/BlogCTA";
import { CategoryBadge } from "@/components/sections/blog/CategoryBadge";
import { PostBody } from "@/components/sections/blog/PostBody";
import { RelatedPosts } from "@/components/sections/blog/RelatedPosts";
import { ShareButtons } from "@/components/sections/blog/ShareButtons";
import { TableOfContents } from "@/components/sections/blog/TableOfContents";
import { BlogPostingSchema } from "@/components/seo/BlogSchema";
import { getPostDetail, getRelatedPostContent } from "@/lib/blog";
import { getAllPostSlugs } from "../../../../sanity/lib/queries";

// Re-fetch from Sanity at most once a minute so Studio edits show up quickly
// without hammering the API. Same policy as /projects/[slug].
export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    if (Array.isArray(slugs) && slugs.length > 0) {
      return slugs
        .map((s: { slug?: string }) => s?.slug)
        .filter((slug): slug is string => Boolean(slug))
        .map((slug) => ({ slug }));
    }
  } catch {
    // ignore — nothing to prerender. Unlike /projects there is no checked-in
    // catalogue to fall back to, so posts published later are rendered on
    // demand instead.
  }
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostDetail(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Diamond Edge Cutting`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: [{ url: post.imageUrl }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostDetail(slug);
  if (!post) notFound();

  const related = await getRelatedPostContent(post.slug, post.category.slug);

  return (
    <>
      <BlogPostingSchema post={post} />

      {/* Header — back link, badge, headline, lede, byline row */}
      <section className="relative pt-44 pb-10 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-6 max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex w-fit items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-brand-gray-500 hover:text-brand-red transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
              All Articles
            </Link>

            <CategoryBadge label={post.category.title} color={post.category.color} />

            {/* Left-aligned, unlike the right-aligned project detail headline —
                an article title reads as the start of the text below it. */}
            <h1 className="font-display font-medium text-brand-gray-900 text-[40px] md:text-[60px] lg:text-[72px] leading-[1.0] tracking-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="font-['Inter_Display',sans-serif] text-[18px] md:text-[20px] leading-[1.6] text-brand-gray-700">
                {post.excerpt}
              </p>
            )}

            <div className="mt-2 pt-6 border-t border-brand-gray-300 flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <AuthorCard author={post.author} variant="byline" />
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-brand-gray-500">
                  <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
                  <span aria-hidden>·</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
              </div>
              <ShareButtons title={post.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[20px] bg-brand-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Body — sticky contents rail on the left, article on the right */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <TableOfContents headings={post.headings} />
            </div>

            <div className="lg:col-span-8 lg:col-start-5 flex flex-col gap-12">
              <PostBody body={post.body} />
              <AuthorCard author={post.author} variant="bio" />
            </div>
          </div>
        </div>
      </section>

      <RelatedPosts posts={related} />

      <BlogCTA heading="Planning a demolition project?" ctaLabel="Get a Quote" />
    </>
  );
}
