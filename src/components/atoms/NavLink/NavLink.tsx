'use client'

import Link from 'next/link'
import { useLoading } from '@/hooks/useLoading'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

type NavLinkProps = ComponentProps<typeof Link>

export default function NavLink({ onClick, href, ...props }: NavLinkProps) {
  const { startLoading } = useLoading()
  const pathname = usePathname()

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        const isNewTab = e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1

        if (!isNewTab && href.toString() !== pathname) {
          startLoading()
        }
        onClick?.(e)
      }}
    />
  )
}
