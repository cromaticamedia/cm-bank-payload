'use client'

import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light' | 'system'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'light') {
      setThemeState(stored)
    }
  }, [])

  const setTheme = useCallback((next: Theme) => {
    if (next === 'system') {
      localStorage.removeItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.remove('dark', 'light')
      document.documentElement.classList.add(prefersDark ? 'dark' : 'light')
    } else {
      localStorage.setItem('theme', next)
      document.documentElement.classList.remove('dark', 'light')
      document.documentElement.classList.add(next)
    }
    setThemeState(next)
  }, [])

  return { theme, setTheme }
}
