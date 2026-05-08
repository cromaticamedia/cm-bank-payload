'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utils/styles'
import { usePathname } from 'next/navigation'
import type { LocaleCode } from '@/config/locales'
import { useState, useEffect } from 'react'
import Typography from '@/components/atoms/Typography'
import { Separator } from '@/components/atoms/Separator'
import NavSection, { type NavItem } from '@/components/molecules/NavSection/NavSection'
import PreferencesSection from '@/components/molecules/PreferencesSection/PreferencesSection'
import { useTranslations } from '@/hooks/useTranslations'
import translations from './translations.json'
import {
  CodesandboxLogo,
  CardsThree,
  FileTsIcon,
  ArrowLineLeft,
  ArrowLineRight,
  HouseLineIcon,
  TreeStructureIcon,
} from '@phosphor-icons/react'

interface AppSidebarProps {
  locale: LocaleCode
}

const STORAGE_KEY = 'cm-sidebar-collapsed'

export default function AppSidebar({ locale }: AppSidebarProps) {
  const pathname = usePathname()
  const t = useTranslations(translations, locale)
  const [collapsed, setCollapsed] = useState(true)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

  const NAV_ITEMS: NavItem[] = [
    { label: t.home, href: `/${locale}`, icon: <HouseLineIcon size={18} weight="regular" /> },
    {
      label: t.dashboard,
      href: `/admin?returnTo=${pathname}`,
      icon: <TreeStructureIcon size={18} weight="regular" />,
    },
  ]

  const BANK_ITEMS: NavItem[] = [
    {
      label: t.blocks,
      href: `/${locale}/blocks`,
      icon: <CodesandboxLogo size={18} weight="regular" />,
    },
    {
      label: t.templates,
      href: `/${locale}/templates`,
      icon: <CardsThree size={18} weight="regular" />,
    },
  ]

  const TOOLS_ITEMS: NavItem[] = [
    {
      label: t.configurator,
      href: `/${locale}/configurator`,
      icon: <FileTsIcon size={18} weight="regular" />,
    },
  ]

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) setCollapsed(stored === 'true')
  }, [])

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

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      localStorage.setItem(STORAGE_KEY, String(!prev))
      return !prev
    })
  }

  const applyTheme = (t: typeof theme) => {
    setTheme(t)
    localStorage.setItem('theme', t)
    const root = document.documentElement
    if (t === 'dark') root.classList.add('dark')
    else if (t === 'light') root.classList.remove('dark')
    else root.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches)
  }

  const isActive = (href: string) => pathname === href

  return (
    <aside
      className={cn(
        'relative flex flex-col items-center h-screen shadow-sm border-r border-neutral-900 dark:border-neutral-300 bg-neutral-1000 dark:bg-neutral-200 transition-all duration-300 ease-in-out shrink-0 px-2 gap-4',
        collapsed ? 'w-[60px]' : 'w-[220px]',
      )}
    >
      {/* Toggle */}
      <button
        onClick={toggleCollapsed}
        className="absolute -right-6 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-tr-sm rounded-br-sm border border-neutral-900 dark:border-neutral-400 bg-white dark:bg-neutral-200 text-neutral-600 dark:text-neutral-700 hover:text-neutral-200 dark:hover:text-white shadow-xs transition-colors cursor-pointer"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <ArrowLineRight size={12} weight="bold" />
        ) : (
          <ArrowLineLeft size={12} weight="bold" />
        )}
      </button>

      {/* Logo */}
      <Link
        href={`/${locale}`}
        className={cn(
          'flex items-center shrink-0 overflow-hidden w-full pt-4',
          collapsed && 'justify-center',
        )}
      >
        <section
          className={cn(
            'flex items-center gap-2 w-full hover:bg-neutral-900/50 dark:hover:bg-neutral-300 py-2 rounded-sm justify-center transition-colors',
            !collapsed && 'justify-start',
          )}
        >
          <div className={cn('shrink-0 dark:hidden', !collapsed && 'ml-1')}>
            <Image
              src="/c-light.png"
              alt="Cromatica"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <div className={cn('shrink-0 hidden dark:block', !collapsed && 'ml-1')}>
            <Image
              src="/c-dark.png"
              alt="Cromatica"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          {!collapsed && <Typography text="Bank" variant="label6" className="font-secondary" />}
        </section>
      </Link>

      <Separator />

      {/* Nav */}
      <nav className="flex flex-col flex-1 gap-3 overflow-y-auto overflow-x-hidden w-full">
        <NavSection
          label={t.navigation}
          items={NAV_ITEMS}
          collapsed={collapsed}
          isActive={isActive}
        />
        <Separator />
        <NavSection label={t.bank} items={BANK_ITEMS} collapsed={collapsed} isActive={isActive} />
        <Separator />
        <NavSection label={t.tools} items={TOOLS_ITEMS} collapsed={collapsed} isActive={isActive} />
      </nav>

      {/* Preferences */}
      <PreferencesSection
        locale={locale}
        pathname={pathname}
        collapsed={collapsed}
        theme={theme}
        onApplyTheme={applyTheme}
      />
    </aside>
  )
}
