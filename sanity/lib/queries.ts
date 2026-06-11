import { sanityClient, sanityConfigured } from './client'

// ─── Rental equipment queries (per rental-equipment-prd.md) ─────────────────

// Landing: all categories that get a route. Excludes attachment categories
// (which surface as a tab on their parent carrier category instead). The
// defined(shortDescription) clause filters out earlier-seed orphan docs that
// share slugs but have none of the new schema's required fields.
const ALL_RENTAL_CATEGORIES_QUERY = `*[_type == "category" && defined(shortDescription) && isAttachmentCategory != true] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  hasAttachmentTab,
  "equipmentCount": count(*[_type == "equipment" && references(^._id)]),
  heroImage
}`

// Featured equipment for the landing strip.
const FEATURED_EQUIPMENT_QUERY = `*[_type == "equipment" && featured == true] | order(order asc) [0...6] {
  _id,
  title,
  subtitle,
  manufacturer,
  "slug": slug.current,
  "categorySlug": category->slug.current,
  heroImage
}`

// Single category by slug, with its own equipment AND any attachment-tab equipment.
const RENTAL_CATEGORY_BY_SLUG_QUERY = `*[_type == "category" && slug.current == $slug && defined(shortDescription) && isAttachmentCategory != true][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  heroImage,
  hasAttachmentTab,
  "attachmentCategoryTitles": attachmentCategories[]-> {
    _id,
    title,
    "slug": slug.current
  },
  "equipment": *[_type == "equipment" && references(^._id) && defined(subtitle)] | order(subCategoryOrder asc, order asc) {
    _id,
    title,
    subtitle,
    manufacturer,
    "slug": slug.current,
    subCategory,
    subCategoryOrder,
    order,
    unitsInStock,
    heroImage
  },
  "attachmentEquipment": *[_type == "equipment" && references(^.attachmentCategories[]._ref) && defined(subtitle)] | order(subCategoryOrder asc, order asc) {
    _id,
    title,
    subtitle,
    manufacturer,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    subCategory,
    subCategoryOrder,
    order,
    unitsInStock,
    heroImage
  }
}`

// Single equipment by slug, with related models in the same sub-category.
const EQUIPMENT_BY_SLUG_QUERY = `*[_type == "equipment" && slug.current == $slug && defined(subtitle)][0] {
  _id,
  title,
  subtitle,
  manufacturer,
  description,
  useCases,
  specs,
  unitsInStock,
  heroImage,
  gallery,
  specSheet,
  "categorySlug": category->slug.current,
  "categoryTitle": category->title,
  "categoryIsAttachment": category->isAttachmentCategory,
  "categoryParentSlug": category->parentCategory->slug.current,
  subCategory,
  "related": *[_type == "equipment" && category._ref == ^.category._ref && subCategory == ^.subCategory && _id != ^._id && defined(subtitle)] | order(order asc) [0...4] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    heroImage
  }
}`

// All routable category slugs (for generateStaticParams on /rental-equipment/[slug]).
const ALL_RENTAL_CATEGORY_SLUGS_QUERY = `*[_type == "category" && defined(shortDescription) && isAttachmentCategory != true] {
  "slug": slug.current
}`

// All equipment slug + routable-category-slug pairs (for generateStaticParams
// on /rental-equipment/[slug]/[model]). Attachment-category items use the
// parent carrier's slug as their URL category.
const ALL_EQUIPMENT_PARAMS_QUERY = `*[_type == "equipment" && defined(subtitle)] {
  "slug": slug.current,
  "categorySlug": coalesce(
    category->parentCategory->slug.current,
    category->slug.current
  )
}`

// All equipment with resolved category info, ordered by category then model.
// Used by the rental-equipment landing page to show all items grouped by category.
const ALL_EQUIPMENT_QUERY = `*[_type == "equipment" && defined(subtitle)]
  | order(
      coalesce(category->parentCategory->order, category->order) asc,
      subCategoryOrder asc,
      order asc
    ) {
  _id,
  title,
  subtitle,
  manufacturer,
  "slug": slug.current,
  "categorySlug": coalesce(
    category->parentCategory->slug.current,
    category->slug.current
  ),
  "categoryTitle": coalesce(
    category->parentCategory->title,
    category->title
  ),
  unitsInStock,
  heroImage
}`

// ─── Project queries (existing, unchanged) ──────────────────────────────────

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

// Featured projects for the homepage teaser. Editors control which projects
// appear (and in what order) via the "Featured on Homepage" toggle + "Display
// Order" field in Sanity Studio. Capped at 6 to fit the 3-column grid.
const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(order asc, year desc) [0...6] {
  _id,
  title,
  "slug": slug.current,
  "category": category->title,
  location,
  year,
  scopeSummary,
  heroImage
}`

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

const ALL_PROJECT_SLUGS_QUERY = `*[_type == "project"] { "slug": slug.current }`

// ─── Team member queries ────────────────────────────────────────────────────

const ALL_TEAM_MEMBERS_QUERY = `*[_type == "teamMember" && (featured == true || !defined(featured))] | order(order asc, name asc) {
  _id,
  name,
  role,
  bio,
  years,
  image
}`

// ─── Helpers (short-circuit when Sanity isn't configured) ───────────────────

export async function getAllRentalCategories() {
  if (!sanityConfigured) return []
  return sanityClient.fetch(ALL_RENTAL_CATEGORIES_QUERY)
}

export async function getFeaturedEquipment() {
  if (!sanityConfigured) return []
  return sanityClient.fetch(FEATURED_EQUIPMENT_QUERY)
}

export async function getRentalCategoryBySlug(slug: string) {
  if (!sanityConfigured) return null
  return sanityClient.fetch(RENTAL_CATEGORY_BY_SLUG_QUERY, { slug })
}

export async function getEquipmentBySlug(slug: string) {
  if (!sanityConfigured) return null
  return sanityClient.fetch(EQUIPMENT_BY_SLUG_QUERY, { slug })
}

export async function getAllRentalCategorySlugs() {
  if (!sanityConfigured) return []
  return sanityClient.fetch(ALL_RENTAL_CATEGORY_SLUGS_QUERY)
}

export async function getAllEquipmentParams() {
  if (!sanityConfigured) return []
  return sanityClient.fetch(ALL_EQUIPMENT_PARAMS_QUERY)
}

export async function getAllEquipment() {
  if (!sanityConfigured) return []
  return sanityClient.fetch(ALL_EQUIPMENT_QUERY)
}

// Back-compat aliases. The existing layout.tsx + a few other call sites use
// getAllCategories() to populate the header navigation dropdown. Keep the name
// but project the new schema fields. Returns shape: { title, slug }[].
export async function getAllCategories() {
  if (!sanityConfigured) return []
  return sanityClient.fetch(`*[_type == "category" && defined(shortDescription) && isAttachmentCategory != true] | order(order asc) {
    title,
    "slug": slug.current
  }`)
}

export async function getCategoryBySlug(slug: string) {
  return getRentalCategoryBySlug(slug)
}

export async function getAllCategorySlugs() {
  return getAllRentalCategorySlugs()
}

// Project helpers, unchanged.

export async function getAllProjects() {
  if (!sanityConfigured) return []
  return sanityClient.fetch(ALL_PROJECTS_QUERY)
}

export async function getFeaturedProjects() {
  if (!sanityConfigured) return []
  return sanityClient.fetch(FEATURED_PROJECTS_QUERY)
}

export async function getProjectBySlug(slug: string) {
  if (!sanityConfigured) return null
  return sanityClient.fetch(PROJECT_BY_SLUG_QUERY, { slug })
}

export async function getAllProjectSlugs() {
  if (!sanityConfigured) return []
  return sanityClient.fetch(ALL_PROJECT_SLUGS_QUERY)
}

export async function getAllTeamMembers() {
  if (!sanityConfigured) return []
  return sanityClient.fetch(ALL_TEAM_MEMBERS_QUERY)
}
