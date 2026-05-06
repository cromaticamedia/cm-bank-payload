import Home from '@/components/views/Home/Home'
import type { LocaleCode } from '@/config/locales'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Home',
    description: 'Reusable blocks and templates repository for the Cromatica team and clients.',
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  return <Home locale={locale as LocaleCode} />
}
