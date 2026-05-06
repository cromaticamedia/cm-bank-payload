import TemplateList from '@/components/views/TemplateList/TemplateList'
import { queryTemplates } from '@/queries/templates'
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

export default async function TemplatesPage({ params }: Props) {
  const { locale } = await params
  const templates = await queryTemplates()
  return <TemplateList locale={locale as LocaleCode} templates={templates} />
}
