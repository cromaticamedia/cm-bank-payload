'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/styles'
import { useState } from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import translations from './translations.json'
import PreferencesContent from '@/components/molecules/PreferencesContent'
import type { LocaleCode } from '@/config/locales'
import {
  HouseLineIcon,
  CodesandboxLogo,
  CardsThree,
  FileTsIcon,
  SlidersHorizontal,
} from '@phosphor-icons/react'

interface BottomBarProps {
  locale: LocaleCode
  theme: 'light' | 'dark' | 'system'
  onApplyTheme: (t: 'light' | 'dark' | 'system') => void
}

export default function BottomBar({ locale, theme, onApplyTheme }: BottomBarProps) {
  const pathname = usePathname()
  const t = useTranslations(translations, locale)
  const [prefsOpen, setPrefsOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  const items = [
    { label: t.home, href: `/${locale}`, icon: <HouseLineIcon size={22} weight="regular" /> },
    {
      label: t.blocks,
      href: `/${locale}/blocks`,
      icon: <CodesandboxLogo size={22} weight="regular" />,
    },
    {
      label: t.templates,
      href: `/${locale}/templates`,
      icon: <CardsThree size={22} weight="regular" />,
    },
    {
      label: t.configurator,
      href: `/${locale}/configurator`,
      icon: <FileTsIcon size={22} weight="regular" />,
    },
  ]

  return (
    <>
      {/* Preferences popover — abre hacia arriba */}
      {prefsOpen && (
        <>
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setPrefsOpen(false)} />
          <div className="fixed bottom-14 left-2 right-2 z-50 lg:hidden">
            <PreferencesContent
              locale={locale}
              pathname={pathname}
              theme={theme}
              onApplyTheme={onApplyTheme}
              onClose={() => setPrefsOpen(false)}
            />
          </div>
        </>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden items-center justify-around border-t border-neutral-900 dark:border-neutral-300 bg-neutral-1000 dark:bg-neutral-200 h-17 pt-2 px-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-0.5 px-3 py-1 transition-colors text-[10px] font-mono',
              isActive(item.href)
                ? 'text-primary-500'
                : 'text-neutral-500 dark:text-neutral-700 hover:text-neutral-100 dark:hover:text-neutral-900',
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}

        {/* Preferences button */}
        <button
          onClick={() => setPrefsOpen((p) => !p)}
          className={cn(
            'flex flex-col items-center gap-0.5 px-3 py-1 transition-colors text-[10px] font-mono cursor-pointer',
            prefsOpen
              ? 'text-primary-500'
              : 'text-neutral-500 dark:text-neutral-700 hover:text-neutral-100 dark:hover:text-neutral-900',
          )}
        >
          <SlidersHorizontal size={22} weight="regular" />
          <span>{t.preferences}</span>
        </button>
      </nav>
    </>
  )
}
