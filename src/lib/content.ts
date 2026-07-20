// Server-only content resolvers. Each returns fully-normalised, plain-JSON view
// models so page components never touch Sanity types (or the Sanity client's
// token) — pages call these, then pass the result down as props.
//
// Policy throughout: use Sanity when it returns documents, otherwise fall back
// to the checked-in data files. Same shape either way, so a half-configured
// environment renders the same layout as production.

import { getAllServices, getAllRentalCategoryCards } from "../../sanity/lib/queries";
import { servicesDetails } from "@/data/services";
import { rentalCategoriesData, RENTAL_CARD_DEFAULT_LINK } from "@/data/rental-categories";
import {
  safeUrlFor,
  CARD_IMAGE_WIDTH,
  CARD_IMAGE_HEIGHT,
  type SanityImage,
} from "@/lib/sanity-image";

export type ServiceContent = {
  /** Slug — also the on-page anchor id on /demolition-services. */
  id: string;
  title: string;
  imageUrl: string;
  imagePosition?: string;
  shortDescription: string;
  description: string;
  keyPoints: string[];
  equipment?: string;
  ctaText: string;
  ctaLink: string;
  crossSell?: { text: string; link: string };
};

export type RentalCategoryContent = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  href: string;
};

type SanityService = {
  _id: string;
  title?: string;
  slug?: string;
  image?: SanityImage;
  shortDescription?: string;
  description?: string;
  keyPoints?: string[];
  equipment?: string;
  ctaText?: string;
  ctaLink?: string;
  crossSellText?: string;
  crossSellLink?: string;
};

type SanityRentalCategory = {
  _id: string;
  title?: string;
  slug?: string;
  image?: SanityImage;
  description?: string;
  ctaLink?: string;
};

const servicesFallback = (): ServiceContent[] =>
  servicesDetails.map((s) => ({
    id: s.id,
    title: s.title,
    imageUrl: s.image,
    imagePosition: s.imagePosition,
    shortDescription: s.shortDescription,
    description: s.lead,
    keyPoints: s.shines ?? [],
    equipment: s.equipment,
    ctaText: s.cta,
    ctaLink: s.ctaLink,
    crossSell: s.crossSell,
  }));

const rentalFallback = (): RentalCategoryContent[] =>
  rentalCategoriesData.map((c) => ({
    id: c.id,
    title: c.title,
    imageUrl: c.image,
    description: c.description,
    href: RENTAL_CARD_DEFAULT_LINK,
  }));

/**
 * Demolition services for the services page, the homepage grid, and the SEO
 * graph. A Sanity doc missing its title, slug or image can't render a card, so
 * it is dropped rather than shown broken — but only after the fetch succeeds,
 * so a Sanity outage still yields the full local list.
 */
export async function getServiceContent(): Promise<ServiceContent[]> {
  let docs: SanityService[] = [];
  try {
    docs = ((await getAllServices()) ?? []) as SanityService[];
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Sanity] services fetch failed (${msg.slice(0, 120)}); using local fallback.`);
    return servicesFallback();
  }

  const resolved = docs.flatMap<ServiceContent>((doc) => {
    const imageUrl = safeUrlFor(doc.image, CARD_IMAGE_WIDTH, CARD_IMAGE_HEIGHT);
    if (!doc.title || !doc.slug || !imageUrl) return [];
    return [
      {
        id: doc.slug,
        title: doc.title,
        imageUrl,
        // No CSS override from the CMS by design — editors frame the shot with
        // the image hotspot, which safeUrlFor bakes into the crop above.
        shortDescription: doc.shortDescription ?? doc.description ?? "",
        description: doc.description ?? "",
        keyPoints: doc.keyPoints ?? [],
        equipment: doc.equipment,
        ctaText: doc.ctaText || `Discuss Your ${doc.title} Project`,
        ctaLink: doc.ctaLink || "/contact",
        crossSell:
          doc.crossSellText && doc.crossSellLink
            ? { text: doc.crossSellText, link: doc.crossSellLink }
            : undefined,
      },
    ];
  });

  return resolved.length > 0 ? resolved : servicesFallback();
}

/** Category cards for /rental-equipment. */
export async function getRentalCategoryContent(): Promise<RentalCategoryContent[]> {
  let docs: SanityRentalCategory[] = [];
  try {
    docs = ((await getAllRentalCategoryCards()) ?? []) as SanityRentalCategory[];
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(
      `[Sanity] rental categories fetch failed (${msg.slice(0, 120)}); using local fallback.`,
    );
    return rentalFallback();
  }

  const resolved = docs.flatMap<RentalCategoryContent>((doc) => {
    const imageUrl = safeUrlFor(doc.image, CARD_IMAGE_WIDTH, CARD_IMAGE_HEIGHT);
    if (!doc.title || !doc.slug || !imageUrl) return [];
    return [
      {
        id: doc.slug,
        title: doc.title,
        imageUrl,
        description: doc.description ?? "",
        href: doc.ctaLink || RENTAL_CARD_DEFAULT_LINK,
      },
    ];
  });

  return resolved.length > 0 ? resolved : rentalFallback();
}
