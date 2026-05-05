import NavigationBar from '@/components/molecules/NavigationBar/NavigationBar'
import Footer from '@/components/molecules/Footer/Footer'
import type { LocaleCode } from '@/config/locales'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  return (
    <>
      <NavigationBar locale={locale as LocaleCode} />
      {children}
      <Footer locale={locale as LocaleCode} />
    </>
  )
}
