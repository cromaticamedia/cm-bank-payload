'use client'

import { useEffect, useState } from 'react'
import { logos } from '@/lib/logos'

export default function CompanyIcon() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    const check = () => setIsDark(html.getAttribute('data-theme') === 'dark')
    check()

    const observer = new MutationObserver(check)
    observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return (
    <img
      src={isDark ? logos.darkIsotypeIcon : logos.lightIsotypeIcon}
      alt="CromaticaIcon"
      width={30}
      height={30}
    />
  )
}
