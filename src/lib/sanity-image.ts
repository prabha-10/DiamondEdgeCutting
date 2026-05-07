import { urlFor } from "../../sanity/lib/image";

export type SanityImage = { asset?: { _ref?: string } } | null | undefined;

/**
 * Build an image URL from a Sanity image reference. Returns null when the input
 * isn't a valid Sanity asset (placeholder data, missing field, etc.) so callers
 * can fall back to a static image without throwing.
 */
export function safeUrlFor(image: SanityImage, width = 1200): string | null {
  try {
    if (image && (image as { asset?: unknown }).asset) {
      return urlFor(image).width(width).auto("format").url();
    }
  } catch {
    // ignore — return null so caller can fall back
  }
  return null;
}
