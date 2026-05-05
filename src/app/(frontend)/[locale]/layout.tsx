import NavigationBar from '@/components/molecules/NavigationBar'
import Footer from '@/components/molecules/Footer'
import type { LocaleCode } from '@/config/locales'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: LocaleCode }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  return (
    <>
      <NavigationBar locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  )
}
