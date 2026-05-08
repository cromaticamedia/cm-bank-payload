'use client'

import Link from 'next/link'
import { useDocumentInfo, useTranslation } from '@payloadcms/ui'

export default function ViewInBankButton() {
  const { savedDocumentData } = useDocumentInfo()
  const { i18n } = useTranslation()
  const name = savedDocumentData?.name
  const uiLocale = i18n.language

  if (!name) return null

  const label = uiLocale === 'es' ? 'Regresar al listado' : 'Back to list'
  const labelDetail = uiLocale === 'es' ? 'Regresar al detalle' : 'Back to detail'

  const linkStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    fontSize: '13px',
    border: '1px solid #444',
    color: '#aaa',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'color 0.2s ease, border-color 0.2s ease',
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = '#fff'
    e.currentTarget.style.borderColor = '#888'
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = '#aaa'
    e.currentTarget.style.borderColor = '#444'
  }

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Link
        href={`/${uiLocale}/blocks`}
        target="_blank"
        style={linkStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {label} →
      </Link>
      <Link
        href={`/${uiLocale}/blocks/${name}`}
        target="_blank"
        style={linkStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {labelDetail} →
      </Link>
    </div>
  )
}
