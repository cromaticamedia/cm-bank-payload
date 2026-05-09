'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from '@payloadcms/ui'

export default function AfterLogin() {
  const searchParams = useSearchParams()
  const { i18n } = useTranslation()
  const uiLocale = i18n.language

  const redirect = searchParams.get('redirect') ?? ''
  const decoded = decodeURIComponent(decodeURIComponent(redirect))
  const returnTo =
    new URLSearchParams(decoded.startsWith('?') ? decoded.slice(1) : decoded).get('returnTo') ??
    `/${uiLocale}`

  const label = uiLocale === 'es' ? '← Regresar al Bank' : '← Back to Bank'

  return (
    <Link
      href={returnTo}
      style={{
        display: 'block',
        textAlign: 'center',
        marginTop: '12px',
        color: '#888',
        fontSize: '14px',
        textDecoration: 'underline',
      }}
    >
      {label}
    </Link>
  )
}
