import { queryBlockBySlug } from '@/queries/blocks'
import BlockDetailView from '@/views/BlockDetailView/BlockDetailView'
import type { LocaleCode } from '@/config/locales'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const block = await queryBlockBySlug(slug)
  if (!block) return { title: 'Block not found' }

  const isEn = locale === 'en'
  const label = (block.label as string) ?? slug
  const description = (block.description as string) ?? ''

  return {
    title: `${label} — Block Bank`,
    description,
    alternates: {
      canonical: `/${locale}/blocks/${slug}`,
      languages: {
        en: `/en/blocks/${slug}`,
        es: `/es/blocks/${slug}`,
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
  const { locale, slug } = await params
  const block = await queryBlockBySlug(slug)

  if (!block) notFound()

  return <BlockDetailView block={block} locale={locale as LocaleCode} />
}
