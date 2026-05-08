import AppShell from '@/components/organisms/AppShell'
import type { LocaleCode } from '@/config/locales'
import Footer from '@/components/molecules/Footer'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <AppShell locale={locale as LocaleCode} />
      <main className="flex-1 overflow-y-auto flex flex-col pb-14 lg:pb-0">
        <div className="flex-1">{children}</div>
        <Footer locale={locale as LocaleCode} />
      </main>
    </div>
  )
}
