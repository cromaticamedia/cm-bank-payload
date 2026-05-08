import ConfiguratorView from '@/views/ConfiguratorView'
import type { LocaleCode } from '@/config/locales'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'

  const title = isEn ? 'Web Configurator — Block Bank' : 'Configurador Web — Block Bank'
  const description = isEn
    ? 'Generate your project.config.ts file instantly by configuring your tier, locales, theme, navigation and CRM integrations.'
    : 'Genera tu archivo project.config.ts al instante configurando tu tier, idiomas, tema, navegación e integraciones CRM.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEn ? 'en_US' : 'es_PE',
      siteName: 'Cromatica Block Bank',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/configurator`,
      languages: {
        en: '/en/configurator',
        es: '/es/configurator',
      },
    },
  }
}

export default async function ConfiguratorPage({ params }: Props) {
  const { locale } = await params
  return <ConfiguratorView locale={locale as LocaleCode} />
}
