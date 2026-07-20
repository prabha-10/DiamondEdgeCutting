import { urlFor } from "../../sanity/lib/image";

export type SanityImage = { asset?: { _ref?: string } } | null | undefined;

/**
 * Build an image URL from a Sanity image reference. Returns null when the input
 * isn't a valid Sanity asset (placeholder data, missing field, etc.) so callers
 * can fall back to a static image without throwing.
 */
export function safeUrlFor(
  image: SanityImage,
  width = 1200,
  height?: number,
): string | null {
  try {
    if (image && (image as { asset?: unknown }).asset) {
      const builder = urlFor(image).width(width).auto("format");
      // Passing a height switches to a fixed-ratio crop, which is what makes the
      // editor's hotspot meaningful — without it Sanity returns the full frame
      // and CSS object-cover decides the crop instead.
      return height
        ? builder.height(height).fit("crop").url()
        : builder.url();
    }
  } catch {
    // ignore — return null so caller can fall back
  }
  return null;
}

/** Cards across the site render images at 16:10. */
export const CARD_IMAGE_WIDTH = 900;
export const CARD_IMAGE_HEIGHT = 563;
