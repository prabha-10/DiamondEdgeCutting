import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// True when env vars look like real Sanity credentials (not the local placeholder).
// Query helpers use this to skip the network call entirely when running without
// a real CMS, so the dev console isn't flooded with 404s.
const PLACEHOLDER_PROJECT_ID = 'demo-fallback'
export const sanityConfigured = Boolean(
  projectId && projectId !== PLACEHOLDER_PROJECT_ID && dataset
)

export const sanityClient = createClient({
  projectId: projectId || PLACEHOLDER_PROJECT_ID,
  dataset: dataset || 'production',
  apiVersion,
  useCdn: true,
})
