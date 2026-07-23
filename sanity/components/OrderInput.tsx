import { useCallback, useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { set, unset, useClient, useFormValue, type NumberInputProps } from 'sanity'
import { Select } from '@sanity/ui'

declare module 'sanity' {
  interface NumberOptions {
    /** Label reserved slots, e.g. options.slotLabels = { 1: 'CEO' }. */
    slotLabels?: Record<number, string>
    /**
     * Fixed number of slots to offer (1..slots). Use when the surface has a set
     * capacity — the homepage grid holds exactly six — rather than growing with
     * the document count, which is the default.
     */
    slots?: number
    /**
     * GROQ filter narrowing which documents can occupy a slot, e.g.
     * 'featured == true'. Without it every document of the type competes for
     * slots, so an unfeatured project would keep one reserved for nothing.
     */
    scope?: string
  }
}

const stripDraft = (id: string) => id.replace(/^drafts\./, '')

/**
 * Display-order picker.
 *
 * Renders the `order` number field as a dropdown of 1..N, where N is the number
 * of documents of this type. Values already taken by OTHER documents are shown
 * disabled, so two documents can't be assigned the same slot. The document's own
 * current value always stays selectable.
 *
 * Shared by the project / projectCategory / rentalCategory `order` fields.
 */
export function OrderInput(props: NumberInputProps) {
  const { value, onChange, elementProps, readOnly } = props
  // Optional per-slot labels, e.g. { 1: 'CEO', 2: 'Managing Director' }, set via
  // the field's `options.slotLabels` in the schema.
  const slotLabels = props.schemaType.options?.slotLabels ?? {}
  const slots = props.schemaType.options?.slots
  const scope = props.schemaType.options?.scope
  // The input is mounted on the field, so its own name tells us which field to
  // read — this component now backs both `order` and `homepageOrder`.
  const fieldName = props.schemaType.name || 'order'
  const client = useClient({ apiVersion: '2024-01-01' })
  const docType = useFormValue(['_type']) as string | undefined
  const docId = useFormValue(['_id']) as string | undefined

  const [taken, setTaken] = useState<number[]>([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!docType) return
    let active = true

    client
      .fetch<{ _id: string; order?: number }[]>(
        `*[_type == $t${scope ? ` && ${scope}` : ''}]{ _id, "order": ${fieldName} }`,
        { t: docType }
      )
      .then((docs) => {
        if (!active) return
        const currentBase = stripDraft(docId || '')
        // Distinct documents (a draft + published pair counts once).
        const bases = new Set(docs.map((d) => stripDraft(d._id)))
        setCount(bases.size)
        setTaken(
          docs
            .filter((d) => stripDraft(d._id) !== currentBase && typeof d.order === 'number')
            .map((d) => d.order as number)
        )
      })
      .catch(() => {
        /* leave the list as-is on a transient fetch error */
      })

    return () => {
      active = false
    }
  }, [client, docType, docId, fieldName, scope])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const next = event.currentTarget.value
      onChange(next === '' ? unset() : set(Number(next)))
    },
    [onChange]
  )

  // A fixed-capacity surface offers exactly that many slots; otherwise size the
  // list to the number of documents, but never hide the value this document
  // already holds (e.g. if orders currently have gaps).
  const max = slots ?? Math.max(count, value ?? 0, 1)
  const base = Array.from({ length: max }, (_, i) => i + 1)
  // Legacy/seed values outside 1..max (e.g. a 0 written by an import script)
  // would otherwise render as a blank Select; surface them so an editor can see
  // and correct the value instead of it silently disappearing.
  const options =
    value != null && !base.includes(value) ? [value, ...base].sort((a, b) => a - b) : base

  return (
    <Select
      id={elementProps.id}
      onBlur={elementProps.onBlur}
      onFocus={elementProps.onFocus}
      readOnly={readOnly}
      value={value ?? ''}
      onChange={handleChange}
    >
      <option value="">— Not set —</option>
      {options.map((n) => {
        const isTaken = taken.includes(n) && n !== value
        const label = slotLabels[n]
        return (
          <option key={n} value={n} disabled={isTaken}>
            {n}
            {label ? ` — ${label}` : ''}
            {isTaken ? ' — taken' : ''}
          </option>
        )
      })}
    </Select>
  )
}
