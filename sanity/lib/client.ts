import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// True when env vars look like real Sanity credentials (not the placeholder).
// Query helpers use this to skip the network call entirely when running
// without a real CMS so the dev console isn't flooded with 404s.
const PLACEHOLDER_PROJECT_ID = 'demo-fallback'
export const sanityConfigured = Boolean(
  projectId && projectId !== PLACEHOLDER_PROJECT_ID && dataset
)

// The dataset is currently private. We pass a token so server-side fetches
// authenticate. The token is server-only (never NEXT_PUBLIC_) and only this
// file reads it; never import sanityClient from a "use client" component
// without auditing the import graph (it would bundle the token).
//
// useCdn is false: the Sanity CDN does not honour tokens, so private datasets
// must use the API endpoint. The cost is slightly slower fetches; we accept
// that for correctness. ISR (revalidate = 60) keeps load off Sanity anyway.
const token =
  process.env.SANITY_API_TOKEN ?? process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_TOKEN

export const sanityClient = createClient({
  projectId: projectId || PLACEHOLDER_PROJECT_ID,
  dataset: dataset || 'production',
  apiVersion,
  useCdn: false,
  token,
})
