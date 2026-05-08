'use client'

import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { cn } from '@/utils/styles'
import { Separator } from '@/components/atoms/Separator'
import { useTranslations } from '@/hooks/useTranslations'
import translations from './translations.json'
import {
  SlidersHorizontal,
  Sun,
  PaletteIcon,
  Moon,
  Monitor,
  TranslateIcon,
  Check,
} from '@phosphor-icons/react'
import type { LocaleCode } from '@/config/locales'

interface PreferencesSectionProps {
  locale: LocaleCode
  pathname: string
  collapsed: boolean
  theme: 'light' | 'dark' | 'system'
  onApplyTheme: (t: 'light' | 'dark' | 'system') => void
}

const AVAILABLE_LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
]

export default function PreferencesSection({
  locale,
  pathname,
  collapsed,
  theme,
  onApplyTheme,
}: PreferencesSectionProps) {
  const t = useTranslations(translations, locale)
  const [prefsOpen, setPrefsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPrefsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative mb-3 w-full" ref={popoverRef}>
      <Separator className="mb-2" />
      <button
        onClick={() => setPrefsOpen((p) => !p)}
        className={cn(
          'w-full flex items-center gap-2.5 px-2 py-2 rounded-sm text-neutral-400 dark:text-white hover:bg-neutral-900/50 dark:hover:bg-neutral-300 transition-colors text-sm cursor-pointer',
          collapsed && 'justify-center px-0',
          prefsOpen &&
            'bg-neutral-900/50 dark:bg-neutral-300 text-neutral-300 dark:text-white font-medium',
        )}
      >
        <SlidersHorizontal size={18} weight="regular" className="shrink-0" />
        {!collapsed && <span className="whitespace-nowrap">{t.preferences}</span>}
      </button>

      {prefsOpen && (
        <div className="absolute bottom-full mb-2 left-0.5 w-64 rounded-sm border border-neutral-900 dark:border-neutral-300 bg-white dark:bg-neutral-200 shadow-xl p-4 flex flex-col gap-4 z-50">
          {/* Theme */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5 dark:text-neutral-800">
              <PaletteIcon size={14} weight="bold" />
              {t.theme}
            </span>
            <div className="flex gap-2">
              {(
                [
                  { value: 'light', icon: <Sun size={14} weight="bold" />, label: t.light },
                  { value: 'dark', icon: <Moon size={14} weight="bold" />, label: t.dark },
                  { value: 'system', icon: <Monitor size={14} weight="bold" />, label: t.system },
                ] as const
              ).map(({ value, icon, label }) => (
                <button
                  key={value}
                  onClick={() => onApplyTheme(value)}
                  className={cn(
                    'flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-sm border text-xs font-medium transition-all cursor-pointer',
                    theme === value
                      ? 'border-primary-600 bg-secondary-900/40 dark:bg-primary-100/80 text-primary-600 shadow-xs'
                      : 'border-neutral-700 text-neutral-700 hover:border-primary-600 hover:text-primary-600 dark:hover:border-primary-600',
                  )}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-800 flex items-center gap-1.5">
              <TranslateIcon size={14} weight="bold" />
              {t.language}
            </span>
            <div className="flex flex-col gap-1">
              {AVAILABLE_LOCALES.map(({ code, label }) => {
                const active = locale === code
                return (
                  <Link
                    key={code}
                    href={pathname.replace(`/${locale}`, `/${code}`)}
                    onClick={() => setPrefsOpen(false)}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all',
                      active
                        ? 'bg-neutral-900 dark:bg-neutral-400 text-primary-600 dark:text-primary-400 font-medium'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-900 dark:hover:bg-neutral-300',
                    )}
                  >
                    <span>{label}</span>
                    {active && <Check size={13} weight="bold" />}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
