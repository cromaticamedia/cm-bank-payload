import { queryBlocksPaginated } from '@/queries/blocks'
import BlocksView from '@/views/BlocksView'
import type { LocaleCode } from '@/config/locales'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'

  const title = isEn ? 'Blocks — Block Bank' : 'Bloques — Block Bank'
  const description = isEn
    ? 'Browse all stable reusable blocks available in the Cromatica Block Bank.'
    : 'Explora todos los bloques reutilizables estables disponibles en el Block Bank de Cromatica.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEn ? 'en_US' : 'es_PE',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/blocks`,
      languages: {
        en: '/en/blocks',
        es: '/es/blocks',
      },
    },
  }
}

export default async function BlocksPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page ?? '1', 10))
  const data = await queryBlocksPaginated(currentPage)

  return <BlocksView locale={locale as LocaleCode} data={data} currentPage={currentPage} />
}
