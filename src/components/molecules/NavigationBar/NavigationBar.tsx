'use client'

import Link from 'next/link'
import Image from 'next/image'
import LayoutContainer from '@/components/atoms/LayoutContainer'
import Typography from '@/components/atoms/Typography'
import { Button } from '@/components/atoms/Button'
import type { LocaleCode } from '@/config/locales'

interface NavigationBarProps {
  locale: LocaleCode
}

const NavigationBar = ({ locale }: NavigationBarProps) => {
  return (
    <nav className="w-full flex items-center sticky top-0 z-50 animate-nav-enter bg-neutral-1000 dark:bg-neutral-200 backdrop-blur-xs">
      <LayoutContainer className="items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 w-fit">
          <div className="relative w-8 h-8">
            <div className="dark:hidden">
              <Image
                src="/c-light.png"
                alt="Cromatica"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div className="hidden dark:block absolute inset-0">
              <Image
                src="/c-dark.png"
                alt="Cromatica"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
          </div>
          <Typography text="Block Bank" htmlTag="h1" variant="label6" className="font-secondary" />
        </Link>

        {/* Links */}
        <div className="flex items-center gap-5">
          <Link href={`/${locale}/blocks`}>
            <Button icon="CodesandboxLogoIcon" text="Blocks" variant="link" size="sm" />
          </Link>
          <Link href={`/${locale}/templates`}>
            <Button icon="CardsThreeIcon" text="Templates" variant="link" size="sm" />
          </Link>
        </div>
        {/* DashboardLink */}
        <Link href="/admin">
          <Button
            iconRightSide
            icon="ArrowFatRightIcon"
            text="Dashboard"
            variant="link"
            size="sm"
          />
        </Link>
      </LayoutContainer>
    </nav>
  )
}

export default NavigationBar
