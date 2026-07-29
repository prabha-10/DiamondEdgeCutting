import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPostListContent } from "@/lib/blog";
import { CategoryBadge } from "@/components/sections/blog/CategoryBadge";

// The last section before the footer: the three newest articles.
//
// Section head mirrors ProjectsTeaser — the same 12-column split, the same
// display headline with the red italic <em>, the same dark pill CTA on the
// right — so the homepage keeps one rhythm all the way down. Cards are a
// lighter build than /blog's PostCard because they sit on the grey band and
// carry less text.
export async function BlogTeaser() {
  // getPostListContent already swallows and logs Sanity failures. The extra
  // guard is for anything it cannot catch — an unguarded throw here aborts
  // prerendering of the whole homepage.
  let posts = [] as Awaited<ReturnType<typeof getPostListContent>>;
  try {
    posts = await getPostListContent();
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Sanity] blog teaser fetch failed (${msg.slice(0, 120)}); hiding the section.`);
  }

  // Nothing published yet — say nothing rather than showing an empty band.
  if (posts.length === 0) return null;

  const latest = posts.slice(0, 3);

  // White, not gray-100: ProjectsTeaser and ClientLogos already run together as
  // one continuous grey band (ClientLogos carries pt-0 for exactly that), so a
  // third grey section would read as one very long stretch before the dark
  // footer. White breaks it and keeps the site's alternating rhythm.
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h2 className="font-display font-extrabold uppercase text-brand-gray-900 text-[44px] md:text-[72px] lg:text-[88px] leading-[0.92] tracking-tight [&_em]:font-light [&_em]:italic [&_em]:text-brand-red [&_em]:normal-case">
              What we know,<br /><em>written down.</em>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6 items-end text-right">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 h-14 rounded-full bg-brand-gray-900 text-white font-sans font-bold text-base hover:bg-brand-red transition-colors duration-200"
            >
              Read All Articles
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mt-14 md:mt-20">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-brand-white border border-brand-gray-300 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-red/30 transition-all duration-300"
            >
              <div className="relative w-full aspect-[16/10] bg-brand-gray-900 overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
                <CategoryBadge label={post.category.title} color={post.category.color} />

                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display font-bold text-brand-gray-900 text-[18px] md:text-[20px] tracking-tight leading-[1.15] group-hover:text-brand-red transition-colors">
                    {post.title}
                  </h3>
                  <ArrowUpRight
                    className="w-5 h-5 shrink-0 mt-0.5 text-brand-gray-500 group-hover:text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    strokeWidth={2}
                  />
                </div>

                <span className="mt-auto pt-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-brand-gray-500">
                  {post.publishedLabel} · {post.readingMinutes} min read
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
