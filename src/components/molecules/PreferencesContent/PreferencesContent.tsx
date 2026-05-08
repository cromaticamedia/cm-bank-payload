'use client'

import Link from 'next/link'
import { cn } from '@/utils/styles'
import { Sun, PaletteIcon, Moon, Monitor, TranslateIcon, Check } from '@phosphor-icons/react'
import type { LocaleCode } from '@/config/locales'
import { useTranslations } from '@/hooks/useTranslations'
import translations from './translations.json'

interface PreferencesContentProps {
  locale: LocaleCode
  pathname: string
  theme: 'light' | 'dark' | 'system'
  onApplyTheme: (t: 'light' | 'dark' | 'system') => void
  onClose?: () => void
}

const AVAILABLE_LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
]

export default function PreferencesContent({
  locale,
  pathname,
  theme,
  onApplyTheme,
  onClose,
}: PreferencesContentProps) {
  const t = useTranslations(translations, locale)

  return (
    <div className="w-full rounded-sm border border-neutral-900 dark:border-neutral-300 bg-white dark:bg-neutral-200 shadow-xl p-4 flex flex-col gap-4">
      {/* Theme */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-800 flex items-center gap-1.5">
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
                onClick={onClose}
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
  )
}
