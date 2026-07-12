import pkg from '@/../package.json'
import { useTranslations } from '@/hooks/useTranslations'
import type { LocaleCode } from '@/config/locales'
import LayoutContainer from '@/components/atoms/LayoutContainer'
import { Separator } from '@/components/atoms/Separator'
import translations from './translations.json'
import Link from 'next/link'
import Icon from '@/components/atoms/Icon'
import Typography from '@/components/atoms/Typography'

interface FooterProps {
  locale: LocaleCode
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations(translations, locale)
  const year = new Date().getFullYear()
  const repoLink = 'https://github.com/cromaticamedia/cm-bank-payload'

  return (
    <footer className="w-full flex flex-col items-center justify-center pb-3 lg:pb-0">
      <Separator className="w-[99%]" />
      <LayoutContainer className="flex-row justify-center sm:justify-between items-center py-3 sm:py-4 lg:py-5">
        <Link
          className="group flex items-center justify-center gap-2 w-fit"
          href={repoLink}
          target="_blank"
        >
          <Icon
            name="GitBranchIcon"
            size={21}
            weight="bold"
            className="transition-colors group-hover:text-primary-500 dark:group-hover:text-primary-600"
          />
          <Typography
            variant="label5"
            htmlTag="span"
            className="font-primary text-neutral-200 dark:text-neutral-1000 shrink-0 transition-colors group-hover:text-primary-500 dark:group-hover:text-primary-600"
            text={pkg.name}
          />
          <Typography
            variant="label2"
            htmlTag="span"
            className="font-primary text-neutral-200 dark:text-neutral-1000 shrink-0 font-bold transition-colors group-hover:text-primary-500 dark:group-hover:text-primary-600 -mx-[3px]"
            text="·"
          />
          <Typography
            variant="label5"
            htmlTag="span"
            className="font-primary text-neutral-200 dark:text-neutral-1000 shrink-0 transition-colors group-hover:text-primary-500 dark:group-hover:text-primary-600"
            text={`v.${pkg.version}`}
          />
        </Link>

        <Typography
          variant="label5"
          htmlTag="span"
          className="font-primary text-neutral-200 dark:text-neutral-1000 text-right shrink-0 hidden sm:block"
          text={`© ${year} ${t.rights}`}
        />
      </LayoutContainer>
    </footer>
  )
}
