import { sanityClient } from './client'

// All categories ordered by display order (for listing page)
const ALL_CATEGORIES_QUERY = `*[_type == "category"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  overview,
  description,
  shortLabel,
  trustTags,
  imageUrl,
  heroImage,
  order
}`

// Single category with its equipment items and cross-sells (for detail page)
const CATEGORY_BY_SLUG_QUERY = `*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  h1,
  overview,
  description,
  heroImage,
  useCases,
  terms,
  faqs,
  crossSells[]-> { _id, title, "slug": slug.current },
  order,
  metaTitle,
  metaDescription,
  "equipment": *[_type == "equipment" && references(^._id) && available == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    keySpec,
    image,
    order
  }
}`

// All category slugs (for generateStaticParams)
const ALL_CATEGORY_SLUGS_QUERY = `*[_type == "category"] { "slug": slug.current }`

export async function getAllCategories() {
  return sanityClient.fetch(ALL_CATEGORIES_QUERY)
}

export async function getCategoryBySlug(slug: string) {
  return sanityClient.fetch(CATEGORY_BY_SLUG_QUERY, { slug })
}

export async function getAllCategorySlugs() {
  return sanityClient.fetch(ALL_CATEGORY_SLUGS_QUERY)
}
