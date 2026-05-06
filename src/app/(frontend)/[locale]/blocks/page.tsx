import BlockList from '@/components/views/BlockList'
import { queryBlocks } from '@/queries/blocks'
import type { LocaleCode } from '@/config/locales'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blocks',
    description: 'Reusable UI blocks for Cromatica templates.',
  }
}

export default async function BlocksPage({ params }: Props) {
  const { locale } = await params
  const blocks = await queryBlocks()
  return <BlockList locale={locale as LocaleCode} blocks={blocks} />
}
