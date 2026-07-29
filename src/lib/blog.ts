// Server-only blog resolvers. Same contract as src/lib/content.ts: return
// fully-normalised, plain-JSON view models so page components never touch
// Sanity types (or the Sanity client's token).
//
// One deliberate difference from every other resolver in this codebase: there
// is NO checked-in fallback file. Services, projects and rental categories fall
// back to src/data/*.ts because that data is real company information. Blog
// fallbacks would have to be invented articles — placeholder claims about
// permits, pricing and method on a licensed contractor's live site. So instead
// these return [] / null on failure and /blog renders a designed empty state.
// The try/catch and the [Sanity] warning still match the house style, because
// the reason for them is unchanged: an unguarded throw aborts prerendering of
// the whole route.

import { toPlainText, type PortableTextBlock } from "@portabletext/react";
import {
  getAllPosts,
  getPostBySlug,
  getAllPostCategories,
  getRelatedPosts,
} from "../../sanity/lib/queries";
import {
  safeUrlFor,
  CARD_IMAGE_WIDTH,
  CARD_IMAGE_HEIGHT,
  HERO_IMAGE_WIDTH,
  HERO_IMAGE_HEIGHT,
  type SanityImage,
} from "@/lib/sanity-image";

/** Badge colour keys offered by the `postCategory` schema. */
export type CategoryColor = "red" | "blue" | "orange" | "teal" | "charcoal";

export type PostCategoryContent = {
  title: string;
  slug: string;
  color: CategoryColor;
};

export type PostListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  publishedAt: string;
  /** Pre-formatted for display, e.g. "22 Jan 2026". */
  publishedLabel: string;
  readingMinutes: number;
  featured: boolean;
  category: PostCategoryContent;
  authorName?: string;
};

export type PostAuthorContent = {
  name: string;
  role: string;
  photoUrl: string | null;
  bio?: string;
  linkedin?: string;
};

export type PostDetail = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  publishedAt: string;
  publishedLabel: string;
  readingMinutes: number;
  /** Exact, for the BlogPosting JSON-LD — not derived from the rounded read time. */
  wordCount: number;
  category: PostCategoryContent;
  author: PostAuthorContent;
  body: PortableTextBlock[];
  /** h2 headings, in document order, for the table of contents. */
  headings: { id: string; text: string }[];
};

type SanityCategoryRef = {
  title?: string;
  slug?: string;
  color?: string;
};

type SanityPost = {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  heroImage?: SanityImage;
  publishedAt?: string;
  featured?: boolean;
  body?: PortableTextBlock[];
  category?: SanityCategoryRef;
  author?: {
    name?: string;
    role?: string;
    photo?: SanityImage;
    bio?: string;
    linkedin?: string;
  };
};

const VALID_COLORS: CategoryColor[] = ["red", "blue", "orange", "teal", "charcoal"];

/** Unknown or missing colours fall back to brand red rather than rendering unstyled. */
function normaliseColor(color: string | undefined): CategoryColor {
  return VALID_COLORS.includes(color as CategoryColor) ? (color as CategoryColor) : "red";
}

function normaliseCategory(category: SanityCategoryRef | undefined): PostCategoryContent | null {
  if (!category?.title || !category.slug) return null;
  return { title: category.title, slug: category.slug, color: normaliseColor(category.color) };
}

/**
 * "22 Jan 2026" — the compact form the blog cards and article meta row use.
 * Pinned to en-GB and UTC so the server-rendered string can't disagree with the
 * client's locale or timezone and trip a hydration mismatch.
 */
export function formatPostDate(iso: string | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/**
 * `toPlainText` is the library's own flattener — it walks spans and skips
 * non-text blocks (images) for us.
 */
export function wordCount(body: PortableTextBlock[] | undefined): number {
  if (!Array.isArray(body)) return 0;
  return toPlainText(body).trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Word count over 200 wpm, the figure most publishing tools use. Rounded up and
 * floored at 1 so a short post reads "1 min read" rather than "0 min read".
 */
export function readingMinutes(body: PortableTextBlock[] | undefined): number {
  return Math.max(1, Math.ceil(wordCount(body) / 200));
}

/**
 * The h2s that become the table of contents. Uses each block's `_key` as the
 * anchor id — PostBody stamps the same key onto the rendered heading, so links
 * resolve without slugifying titles (and without having to dedupe two sections
 * that happen to share a name).
 */
export function extractHeadings(body: PortableTextBlock[] | undefined): { id: string; text: string }[] {
  if (!Array.isArray(body)) return [];
  return body
    .filter((block) => block?._type === "block" && block?.style === "h2")
    .flatMap((block) => {
      const key = block._key;
      const text = toPlainText(block).trim();
      if (!key || !text) return [];
      return [{ id: key, text }];
    });
}

/** Shared card normalisation — drops any document that can't be rendered. */
function toListItem(doc: SanityPost): PostListItem[] {
  const category = normaliseCategory(doc.category);
  const imageUrl = safeUrlFor(doc.heroImage, CARD_IMAGE_WIDTH, CARD_IMAGE_HEIGHT);
  if (!doc.title || !doc.slug || !doc.excerpt || !imageUrl || !category || !doc.publishedAt) {
    return [];
  }
  return [
    {
      id: doc._id,
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt,
      imageUrl,
      publishedAt: doc.publishedAt,
      publishedLabel: formatPostDate(doc.publishedAt),
      readingMinutes: readingMinutes(doc.body),
      featured: doc.featured === true,
      category,
      authorName: doc.author?.name,
    },
  ];
}

export async function getPostListContent(): Promise<PostListItem[]> {
  let docs: SanityPost[] = [];
  try {
    docs = ((await getAllPosts()) ?? []) as SanityPost[];
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Sanity] posts fetch failed (${msg.slice(0, 120)}); showing empty archive.`);
    return [];
  }
  return docs.flatMap(toListItem);
}

export async function getPostCategoryContent(): Promise<PostCategoryContent[]> {
  let docs: SanityCategoryRef[] = [];
  try {
    docs = ((await getAllPostCategories()) ?? []) as SanityCategoryRef[];
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Sanity] blog categories fetch failed (${msg.slice(0, 120)}); showing no filters.`);
    return [];
  }
  // Deduped by slug in case two documents share one — a duplicate would render
  // two identical filter pills that both select the same posts.
  const seen = new Set<string>();
  return docs.flatMap((doc) => {
    const category = normaliseCategory(doc);
    if (!category || seen.has(category.slug)) return [];
    seen.add(category.slug);
    return [category];
  });
}

export async function getPostDetail(slug: string): Promise<PostDetail | null> {
  let doc: SanityPost | null = null;
  try {
    doc = (await getPostBySlug(slug)) as SanityPost | null;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Sanity] post fetch failed (${msg.slice(0, 120)}); rendering 404.`);
    return null;
  }
  if (!doc?.title || !doc.slug || !doc.publishedAt || !Array.isArray(doc.body)) return null;

  const category = normaliseCategory(doc.category);
  const imageUrl = safeUrlFor(doc.heroImage, HERO_IMAGE_WIDTH, HERO_IMAGE_HEIGHT);
  if (!category || !imageUrl) return null;

  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt ?? "",
    imageUrl,
    publishedAt: doc.publishedAt,
    publishedLabel: formatPostDate(doc.publishedAt),
    readingMinutes: readingMinutes(doc.body),
    wordCount: wordCount(doc.body),
    category,
    author: {
      name: doc.author?.name ?? "Diamond Edge Cutting",
      role: doc.author?.role ?? "Editorial Team",
      photoUrl: safeUrlFor(doc.author?.photo, 200, 200),
      bio: doc.author?.bio,
      linkedin: doc.author?.linkedin,
    },
    body: doc.body,
    headings: extractHeadings(doc.body),
  };
}

/**
 * Three cards for the foot of an article: same-category posts first, newest
 * first, then topped up with recent posts from anywhere so the row never
 * renders half-empty just because a category only has one piece in it.
 */
export async function getRelatedPostContent(
  slug: string,
  categorySlug: string,
): Promise<PostListItem[]> {
  let docs: SanityPost[] = [];
  try {
    docs = ((await getRelatedPosts(slug)) ?? []) as SanityPost[];
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Sanity] related posts fetch failed (${msg.slice(0, 120)}); hiding the row.`);
    return [];
  }
  const posts = docs.flatMap(toListItem);
  const sameCategory = posts.filter((p) => p.category.slug === categorySlug);
  const others = posts.filter((p) => p.category.slug !== categorySlug);
  return [...sameCategory, ...others].slice(0, 3);
}
