import pkg from '@/../package.json'
import { useTranslations } from '@/hooks/useTranslations'
import type { LocaleCode } from '@/config/locales'
import LayoutContainer from '@/components/atoms/LayoutContainer'
import { Separator } from '@/components/atoms/Separator'
import translations from './translations.json'
import Typography from '@/components/atoms/Typography'

interface FooterProps {
  locale: LocaleCode
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations(translations, locale)
  const year = new Date().getFullYear()

  return (
    <footer className="w-full flex flex-col items-center justify-center pb-3 lg:pb-0">
      <Separator className="w-[99%]" />
      <LayoutContainer className="flex-row justify-between items-center">
        <span className="flex items-center gap-1 min-w-0">
          <Typography
            variant="label5"
            htmlTag="span"
            className="font-primary text-neutral-200 dark:text-neutral-1000 shrink-0"
            text={pkg.name}
          />
          <Typography
            variant="label2"
            htmlTag="span"
            className="font-primary text-neutral-200 dark:text-neutral-1000 shrink-0 font-bold mx-1"
            text="·"
          />
          <Typography
            variant="label5"
            htmlTag="span"
            className="font-primary text-neutral-200 dark:text-neutral-1000 shrink-0"
            text={`v${pkg.version}`}
          />
        </span>

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
