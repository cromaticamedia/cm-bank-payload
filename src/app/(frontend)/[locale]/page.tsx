import Home from '@/views/Home/Home'
import type { LocaleCode } from '@/config/locales'
import type { Metadata } from 'next'
import { getOrganizationJsonLd, getWebsiteJsonLd } from '@/lib/jsonLd'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'

  const title = 'Block Bank — Cromatica Media'
  const description = isEn
    ? 'Reusable blocks and templates repository for the Cromatica team and clients.'
    : 'Repositorio de bloques y templates reutilizables para el equipo y clientes de Cromatica.'

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
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        es: '/es',
      },
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebsiteJsonLd(locale)) }}
      />
      <Home locale={locale as LocaleCode} />
    </>
  )
}
