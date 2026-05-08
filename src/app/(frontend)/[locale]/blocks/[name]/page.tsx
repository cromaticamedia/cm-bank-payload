import { queryBlockByName } from '@/queries/blocks'
import BlockDetailView from '@/views/BlockDetailView/BlockDetailView'
import type { LocaleCode } from '@/config/locales'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ locale: string; name: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, name } = await params
  const block = await queryBlockByName(name)
  if (!block) return { title: 'Block not found' }

  const isEn = locale === 'en'
  const label = (block.label as string) ?? name
  const description = (block.description as string) ?? ''

  return {
    title: `${label} — Block Bank`,
    description,
    alternates: {
      canonical: `/${locale}/blocks/${name}`,
      languages: {
        en: `/en/blocks/${name}`,
        es: `/es/blocks/${name}`,
      },
    },
    openGraph: {
      title: `${label} — Block Bank`,
      description,
      type: 'website',
      locale: isEn ? 'en_US' : 'es_PE',
    },
  }
}

export default async function BlockDetailPage({ params }: PageProps) {
  const { locale, name } = await params
  const block = await queryBlockByName(name)

  if (!block) notFound()

  return <BlockDetailView block={block} locale={locale as LocaleCode} />
}
