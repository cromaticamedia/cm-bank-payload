import Link from 'next/link'
import { cn } from '@/utils/styles'
import Typography from '@/components/atoms/Typography'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

interface NavSectionProps {
  label: string
  items: NavItem[]
  collapsed: boolean
  isActive: (href: string) => boolean
}

export default function NavSection({ label, items, collapsed, isActive }: NavSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      {!collapsed && (
        <Typography
          text={label}
          htmlTag="p"
          className="px-2 text-[10px] uppercase text-neutral-400 dark:text-neutral-700 tracking-[0.1em]"
        />
      )}
      {items.map((item) => (
        <Link
          key={item.href}
          onClick={item.onClick}
          href={item.href}
          title={collapsed ? item.label : undefined}
          className={cn(
            'flex items-center gap-2.5 px-2 py-2 rounded-sm text-sm transition-colors',
            collapsed && 'justify-center px-0 py-2.5',
            isActive(item.href)
              ? 'bg-neutral-900 dark:bg-neutral-400 text-primary-600 dark:text-primary-400 font-medium'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-900/50 dark:hover:bg-neutral-300 hover:text-neutral-900 dark:hover:text-white',
          )}
        >
          <span className="shrink-0">{item.icon}</span>
          {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
        </Link>
      ))}
    </div>
  )
}

export type { NavItem, NavSectionProps }
