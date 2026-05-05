'use client'

import { MonitorIcon, MoonStarsIcon, SunIcon } from '@phosphor-icons/react'
import { useTheme, type Theme } from '@/hooks/useTheme'
import { cn } from '@/utils/styles'

const OPTIONS: { value: Theme; Icon: React.ElementType; label: string }[] = [
  { value: 'system', Icon: MonitorIcon, label: 'System' },
  { value: 'light', Icon: SunIcon, label: 'Light' },
  { value: 'dark', Icon: MoonStarsIcon, label: 'Dark' },
]

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <section className="flex items-center gap-1 rounded-full bg-neutral-900 dark:bg-neutral-500 p-1 w-fit">
      {OPTIONS.map(({ value, Icon, label }) => {
        const isActive = theme === value
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            aria-label={label}
            aria-pressed={isActive}
            className={cn(
              'flex items-center justify-center rounded-full p-2 transition-all duration-200 cursor-pointer',
              isActive
                ? 'bg-white dark:bg-neutral-300 shadow-full text-neutral-200 dark:text-white'
                : 'text-neutral-700 dark:text-neutral-800 hover:text-neutral-700 dark:hover:text-neutral-300',
            )}
          >
            <Icon size={18} weight="bold" />
          </button>
        )
      })}
    </section>
  )
}
