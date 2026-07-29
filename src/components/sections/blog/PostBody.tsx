import React from "react";
import Link from "next/link";
import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";
import { safeUrlFor, type SanityImage } from "@/lib/sanity-image";

// Renders a post's Portable Text body. Every style, list and mark offered by
// sanity/schemas/blockContent.ts has an entry here, so nothing an editor can
// pick in Studio comes out unstyled.
//
// Type scale matches the project detail page's article body (18/20px Inter
// Display at 1.6) rather than inventing a second reading rhythm for the site.

type ImageValue = SanityImage & { alt?: string; caption?: string };

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-['Inter_Display',sans-serif] font-normal text-[18px] md:text-[20px] leading-[1.6] text-brand-gray-900">
        {children}
      </p>
    ),
    // `id` is the block's own _key, which is exactly what extractHeadings()
    // hands the table of contents — so anchors resolve without slugifying
    // titles or deduping two sections that share a name. scroll-mt clears the
    // fixed header, which reserves no space in the document flow.
    h2: ({ children, value }) => (
      <h2
        id={(value as PortableTextBlock)._key}
        className="font-display font-extrabold uppercase text-brand-gray-900 text-[28px] md:text-[34px] tracking-tight leading-[1.1] scroll-mt-32 pt-6"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={(value as PortableTextBlock)._key}
        className="font-display font-semibold text-brand-gray-900 text-[22px] md:text-[24px] tracking-tight leading-[1.2] scroll-mt-32 pt-2"
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-brand-red pl-6 py-1 font-['Inter_Display',sans-serif] text-[18px] md:text-[20px] italic leading-[1.6] text-brand-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 flex flex-col gap-2 font-['Inter_Display',sans-serif] text-[17px] md:text-[19px] leading-[1.6] text-brand-gray-900 marker:text-brand-red">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 flex flex-col gap-2 font-['Inter_Display',sans-serif] text-[17px] md:text-[19px] leading-[1.6] text-brand-gray-900 marker:text-brand-red marker:font-medium">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = String((value as { href?: string })?.href ?? "");
      const isInternal = href.startsWith("/");
      const className =
        "text-brand-red underline underline-offset-4 decoration-brand-red/40 hover:decoration-brand-red transition-colors";
      if (isInternal) {
        return (
          <Link href={href} className={className}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as ImageValue;
      const url = safeUrlFor(image, 1200);
      if (!url) return null;
      return (
        <figure className="flex flex-col gap-3 py-2">
          <div className="relative w-full overflow-hidden rounded-[16px] bg-brand-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={image.alt ?? ""} loading="lazy" className="w-full h-auto" />
          </div>
          {image.caption && (
            <figcaption className="font-mono text-[11px] uppercase tracking-[0.08em] text-brand-gray-500">
              {image.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PostBody({ body }: { body: PortableTextBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      <PortableText value={body} components={components} />
    </div>
  );
}
