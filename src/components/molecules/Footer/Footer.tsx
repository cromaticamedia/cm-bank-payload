import pkg from '@/../package.json'
import { useTranslations } from '@/hooks/useTranslations'
import type { LocaleCode } from '@/config/locales'
import LayoutContainer from '@/components/atoms/LayoutContainer'
import { Separator } from '@/components/atoms/Separator'
import translations from './translations.json'

interface FooterProps {
  locale: LocaleCode
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations(translations, locale)
  const year = new Date().getFullYear()

  return (
    <footer className="w-full flex flex-col items-center justify-center">
      <Separator className="w-[99%]" />
      <LayoutContainer className="justify-between p-0 lg:p-4">
        <span className="text-[12px] font-mono text-neutral-200 dark:text-neutral-900">
          {pkg.name}{' '}
          <span className="mx-1 text-neutral-200 dark:text-neutral-900 font-bold">·</span> v
          {pkg.version}
        </span>
        <span className="text-[12px] font-mono text-neutral-200 dark:text-neutral-900">
          © {year} {t.rights}
        </span>
      </LayoutContainer>
    </footer>
  )
}
