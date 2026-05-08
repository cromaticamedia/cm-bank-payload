import TemplatesView from '@/views/TemplatesView'
import { queryTemplates } from '@/queries/templates'
import type { LocaleCode } from '@/config/locales'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'

  const title = isEn ? 'Templates — Block Bank' : 'Templates — Block Bank'
  const description = isEn
    ? 'Browse Figma templates available for Cromatica clients. Ready-to-use designs for every project tier.'
    : 'Explora los templates de Figma disponibles para clientes de Cromatica. Diseños listos para usar en cada tier de proyecto.'

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
      canonical: `/${locale}/templates`,
      languages: {
        en: '/en/templates',
        es: '/es/templates',
      },
    },
  }
}

export default async function TemplatesPage({ params }: Props) {
  const { locale } = await params
  const templates = await queryTemplates()
  return <TemplatesView locale={locale as LocaleCode} templates={templates} />
}
