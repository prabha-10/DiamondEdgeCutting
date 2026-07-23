import type { NumberRule } from 'sanity'

/**
 * Async validation for a `Display Order` field: fails when another document of
 * the same type already holds this value.
 *
 * Why this exists: the OrderInput dropdown only *disables* taken values for new
 * picks. It does NOT stop a duplicate value that arrived some other way — e.g.
 * duplicating a document in Studio (which copies the source's order), or a seed
 * script assigning orders in bulk. Those slip past the dropdown and two docs end
 * up sharing a slot (which then makes the front-end ordering ambiguous — ties
 * fall back to a secondary sort). This validator is the actual guarantee: Studio
 * shows an error until every order is unique.
 *
 * Compares against both the published and draft copies of every OTHER document,
 * while excluding this document's own published+draft pair.
 *
 * `field` picks which number field to guard (the same rule backs `order` and
 * `homepageOrder`). `scope` narrows the comparison set to documents actually
 * competing for a slot, and `appliesTo` skips the check entirely for documents
 * outside that set — without it, a project that was un-featured while holding a
 * stale homepage slot would report an error on a field Studio no longer shows.
 */
export function uniqueOrder(
  rule: NumberRule,
  options: {
    field?: string
    label?: string
    scope?: string
    appliesTo?: (doc: Record<string, unknown>) => boolean
  } = {}
) {
  const { field = 'order', label = 'Order', scope, appliesTo } = options

  return rule.custom(async (value, context) => {
    if (value === undefined || value === null) return true

    const doc = context.document
    if (!doc?._type) return true
    if (appliesTo && !appliesTo(doc)) return true

    const client = context.getClient({ apiVersion: '2024-01-01' })
    const base = String(doc._id || '').replace(/^drafts\./, '')

    const clashes = await client.fetch<number>(
      `count(*[_type == $type && ${field} == $value${
        scope ? ` && ${scope}` : ''
      } && !(_id in [$pub, $draft])])`,
      { type: doc._type, value, pub: base, draft: `drafts.${base}` }
    )

    return clashes > 0
      ? `${label} ${value} is already used by another ${doc._type} — pick a unique number.`
      : true
  })
}
