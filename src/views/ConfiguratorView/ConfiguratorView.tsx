import LayoutContainer from '@/components/atoms/LayoutContainer'
import PageHeader from '@/components/molecules/PageHeader'
import type { LocaleCode } from '@/config/locales'
import ConfiguratorForm from '@/components/organisms/ConfiguratorForm'
import { useTranslations } from '@/hooks/useTranslations'
import translations from './translations.json'

interface ConfiguratorViewProps {
  locale: LocaleCode
}

const ConfiguratorView = ({ locale }: ConfiguratorViewProps) => {
  const t = useTranslations(translations, locale)

  return (
    <main className="w-full">
      <LayoutContainer className="flex-col gap-6">
        <PageHeader tagline={t.tagline} title={t.title} subtitle={t.subtitle} />
        <ConfiguratorForm locale={locale} />
      </LayoutContainer>
    </main>
  )
}

export default ConfiguratorView
