'use client'

import { useState, useEffect } from 'react'
import AppSidebar from '@/components/organisms/AppSidebar'
import BottomBar from '@/components/molecules/BottomBar/BottomBar'
import type { LocaleCode } from '@/config/locales'

interface AppShellProps {
  locale: LocaleCode
}

export default function AppShell({ locale }: AppShellProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

  useEffect(() => {
    const stored = (localStorage.getItem('theme') as typeof theme) ?? 'system'
    setTheme(stored)
    const root = document.documentElement
    if (stored === 'dark') root.classList.add('dark')
    else if (stored === 'light') root.classList.remove('dark')
    else root.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches)
  }, [])

  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) =>
      document.documentElement.classList.toggle('dark', e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const applyTheme = (t: typeof theme) => {
    setTheme(t)
    localStorage.setItem('theme', t)
    const root = document.documentElement
    if (t === 'dark') root.classList.add('dark')
    else if (t === 'light') root.classList.remove('dark')
    else root.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches)
  }

  return (
    <>
      <AppSidebar locale={locale} theme={theme} onApplyTheme={applyTheme} />
      <BottomBar locale={locale} theme={theme} onApplyTheme={applyTheme} />
    </>
  )
}
