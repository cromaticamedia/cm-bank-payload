'use client'

import Link from 'next/link'
import { useLoading } from '@/hooks/useLoading'
import type { ComponentProps } from 'react'

type NavLinkProps = ComponentProps<typeof Link>

export default function NavLink({ onClick, ...props }: NavLinkProps) {
  const { startLoading } = useLoading()

  return (
    <Link
      {...props}
      onClick={(e) => {
        startLoading()
        onClick?.(e)
      }}
    />
  )
}
