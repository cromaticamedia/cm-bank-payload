import ConfiguratorView from '@/components/views/ConfiguratorView'
import type { LocaleCode } from '@/config/locales'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Templates',
    description: 'Figma templates available for Cromatica clients.',
  }
}

export default async function ConfiguratorPage({ params }: Props) {
  const { locale } = await params
  return <ConfiguratorView />
}
