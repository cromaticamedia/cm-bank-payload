'use client'

import { useField } from '@payloadcms/ui'
import { useState, useCallback, type KeyboardEvent } from 'react'

type Props = {
  path: string
  field: {
    name: string
    label?: Record<string, string> | string
    admin?: {
      description?: Record<string, string> | string
      placeholder?: string
    }
  }
}

export default function ChipsField({ path, field }: Props) {
  const { value, setValue } = useField<string[]>({ path })
  const [input, setInput] = useState('')

  const chips = Array.isArray(value) ? value : []

  const addChip = useCallback(() => {
    const trimmed = input.trim()
    if (!trimmed) return
    if (chips.includes(trimmed)) {
      setInput('')
      return
    }
    setValue([...chips, trimmed])
    setInput('')
  }, [input, chips, setValue])

  const removeChip = useCallback(
    (index: number) => {
      setValue(chips.filter((_, i) => i !== index))
    },
    [chips, setValue],
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addChip()
    }
    if (e.key === 'Backspace' && input === '' && chips.length > 0) {
      removeChip(chips.length - 1)
    }
  }

  const label = typeof field.label === 'string' ? field.label : field.label?.en || field.name
  const description =
    typeof field.admin?.description === 'string'
      ? field.admin.description
      : field.admin?.description?.en

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
      >
        {label}
      </label>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.375rem',
          padding: '0.5rem',
          border: '1px solid var(--theme-elevation-150, #333)',
          borderRadius: '4px',
          background: 'var(--theme-input-bg, transparent)',
          minHeight: '42px',
          alignItems: 'center',
          cursor: 'text',
        }}
        onClick={() => document.getElementById(`chip-input-${path}`)?.focus()}
      >
        {chips.map((chip, i) => (
          <span
            key={`${chip}-${i}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.2rem 0.5rem',
              borderRadius: '3px',
              fontSize: '0.8125rem',
              background: 'var(--theme-elevation-200, #222)',
              color: 'var(--theme-text, #fff)',
              whiteSpace: 'nowrap',
            }}
          >
            {chip}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removeChip(i)
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                padding: '0 0.125rem',
                fontSize: '1rem',
                lineHeight: 1,
                opacity: 0.6,
              }}
              aria-label={`Remove ${chip}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          id={`chip-input-${path}`}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addChip}
          placeholder={chips.length === 0 ? field.admin?.placeholder || 'Type and press Enter' : ''}
          style={{
            flex: 1,
            minWidth: '80px',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--theme-text, #fff)',
            fontSize: '0.875rem',
            padding: '0.125rem 0',
          }}
        />
      </div>

      {description && (
        <p
          style={{
            marginTop: '0.375rem',
            fontSize: '0.75rem',
            color: 'var(--theme-elevation-400, #888)',
          }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
