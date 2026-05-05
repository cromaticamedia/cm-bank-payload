import Link from 'next/link'
import Image from 'next/image'
import LayoutContainer from '@/components/atoms/LayoutContainer'
import Typography from '@/components/atoms/Typography'
import { Button } from '@/components/atoms/Button'
import LangSelector from '@/components/molecules/LangSelector'
import ThemeToggle from '@/components/molecules/ThemeToggle'
import type { LocaleCode } from '@/config/locales'

interface FooterProps {
  locale: LocaleCode
}

const Footer = ({ locale }: FooterProps) => {
  return (
    <footer className="w-full border-t border-neutral-300/20 dark:border-neutral-700/30 bg-neutral-1000 dark:bg-neutral-200">
      <LayoutContainer className="flex-col gap-8 py-10 lg:py-12">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-8 w-full">
          {/* LEFT: Brand */}
          <div className="flex flex-col items-center lg:items-start gap-4 lg:w-1/3">
            <Link href={`/${locale}`} className="flex items-center gap-2.5">
              <div className="relative w-8 h-8">
                <div className="dark:hidden">
                  <Image
                    src="/c-light.png"
                    alt="Cromatica"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="hidden dark:block">
                  <Image
                    src="/c-dark.png"
                    alt="Cromatica"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              </div>
              <Typography
                text="Cromatica Block Bank"
                variant="label5"
                className="font-secondary text-neutral-100 dark:text-neutral-1000"
              />
            </Link>

            <Typography
              text="Reusable blocks and templates repository for the Cromatica team and clients."
              variant="label6"
              htmlTag="p"
              className="text-neutral-600 dark:text-neutral-800 text-center lg:text-start"
            />
          </div>

          {/* CENTER: Navigation */}
          <nav className="flex flex-col items-center lg:items-start gap-3">
            <Typography
              text="Navigation"
              variant="label6"
              className="text-neutral-500 dark:text-neutral-800 uppercase tracking-widest font-mono"
            />
            <Link href={`/${locale}/blocks`}>
              <Button text="Blocks" variant="link" size="sm" />
            </Link>
            <Link href={`/${locale}/templates`}>
              <Button text="Templates" variant="link" size="sm" />
            </Link>
            <Link href="/admin">
              <Button text="Dashboard" variant="link" size="sm" />
            </Link>
          </nav>

          {/* RIGHT: Preferences */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <Typography
              text="Preferences"
              variant="label6"
              className="text-neutral-500 dark:text-neutral-800 uppercase tracking-widest font-mono"
            />
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LangSelector locale={locale} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-neutral-300/20 dark:bg-neutral-700/30" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full">
          <Typography
            text={`© ${new Date().getFullYear()} Cromatica Media. All rights reserved.`}
            variant="p"
            className="text-neutral-600 dark:text-neutral-800"
          />
          <Typography
            text="Built with Payload CMS + Next.js"
            variant="p"
            className="text-neutral-600 dark:text-neutral-800 font-mono"
          />
        </div>
      </LayoutContainer>
    </footer>
  )
}

export default Footer
