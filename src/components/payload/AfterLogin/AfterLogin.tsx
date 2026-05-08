'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function AfterLogin() {
  const searchParams = useSearchParams()

  // Payload usa ?redirect=, dentro de ese valor está tu ?returnTo=
  const redirect = searchParams.get('redirect') ?? ''
  const decoded = decodeURIComponent(decodeURIComponent(redirect))
  const returnTo =
    new URLSearchParams(decoded.startsWith('?') ? decoded.slice(1) : decoded).get('returnTo') ??
    '/en'

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
      ← Regresar al Bank
    </Link>
  )
}
