'use client'

import Link from 'next/link'
import { useLoading } from '@/hooks/useLoading'
import { usePathname, useSearchParams } from 'next/navigation'
import type { ComponentProps } from 'react'

type NavLinkProps = ComponentProps<typeof Link>

export default function NavLink({ onClick, href, ...props }: NavLinkProps) {
  const { startLoading } = useLoading()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        const isNewTab = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1

        // Build the current full URL (path + query) to compare against the target
        const currentUrl = searchParams.toString()
          ? `${pathname}?${searchParams.toString()}`
          : pathname
        const targetUrl = href.toString()

        if (!isNewTab && targetUrl !== currentUrl) {
          startLoading()
        }
        onClick?.(e)
      }}
    />
  )
}
