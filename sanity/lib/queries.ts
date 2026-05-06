import { sanityClient, sanityConfigured } from './client'

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

// All projects ordered by display order (for projects index)
const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(order asc, year desc) {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  location,
  year,
  scopeSummary,
  description,
  keyHighlights,
  heroImage,
  gallery,
  relatedServices,
  order,
  featured
}`

// Single project by slug (for detail page)
const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  location,
  year,
  scopeSummary,
  description,
  keyHighlights,
  heroImage,
  gallery,
  relatedServices,
  order,
  featured
}`

// All project slugs (for generateStaticParams)
const ALL_PROJECT_SLUGS_QUERY = `*[_type == "project"] { "slug": slug.current }`

// All helpers short-circuit when Sanity isn't configured (placeholder env),
// so callers' fallback paths take over without spamming the console with 404s.

export async function getAllCategories() {
  if (!sanityConfigured) return []
  return sanityClient.fetch(ALL_CATEGORIES_QUERY)
}

export async function getCategoryBySlug(slug: string) {
  if (!sanityConfigured) return null
  return sanityClient.fetch(CATEGORY_BY_SLUG_QUERY, { slug })
}

export async function getAllCategorySlugs() {
  if (!sanityConfigured) return []
  return sanityClient.fetch(ALL_CATEGORY_SLUGS_QUERY)
}

export async function getAllProjects() {
  if (!sanityConfigured) return []
  return sanityClient.fetch(ALL_PROJECTS_QUERY)
}

export async function getProjectBySlug(slug: string) {
  if (!sanityConfigured) return null
  return sanityClient.fetch(PROJECT_BY_SLUG_QUERY, { slug })
}

export async function getAllProjectSlugs() {
  if (!sanityConfigured) return []
  return sanityClient.fetch(ALL_PROJECT_SLUGS_QUERY)
}
