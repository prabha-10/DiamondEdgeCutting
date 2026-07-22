import { useCallback, useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { set, unset, useClient, useFormValue, type NumberInputProps } from 'sanity'
import { Select } from '@sanity/ui'

// Allow schemas to label reserved slots, e.g. options.slotLabels = { 1: 'CEO' }.
declare module 'sanity' {
  interface NumberOptions {
    slotLabels?: Record<number, string>
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
  const client = useClient({ apiVersion: '2024-01-01' })
  const docType = useFormValue(['_type']) as string | undefined
  const docId = useFormValue(['_id']) as string | undefined

  const [taken, setTaken] = useState<number[]>([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!docType) return
    let active = true

    client
      .fetch<{ _id: string; order?: number }[]>(`*[_type == $t]{ _id, order }`, { t: docType })
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
  }, [client, docType, docId])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const next = event.currentTarget.value
      onChange(next === '' ? unset() : set(Number(next)))
    },
    [onChange]
  )

  // Size the list to the number of documents, but never hide the value this
  // document already holds (e.g. if orders currently have gaps).
  const max = Math.max(count, value ?? 0, 1)
  const options = Array.from({ length: max }, (_, i) => i + 1)

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
