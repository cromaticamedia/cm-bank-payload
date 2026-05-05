import LayoutContainer from '@/components/atoms/LayoutContainer'
import Typography from '@/components/atoms/Typography'
import { Button } from '@/components/atoms/Button'
import type { LocaleCode } from '@/config/locales'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  params: Promise<{ locale: LocaleCode }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params

  return (
    <main className="w-full flex items-center">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,119,220,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,119,220,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <LayoutContainer className="relative z-10 flex-col items-center gap-10 text-center justify-center">
        <div className="flex flex-col items-center gap-10">
          {/* Logo + Heading */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-full flex items-center justify-center">
              <div className="dark:hidden">
                <Image
                  src="/logo-light-cropped.png"
                  alt="Cromatica"
                  width={350}
                  height={100}
                  className="object-contain"
                />
              </div>
              <div className="hidden dark:block">
                <Image
                  src="/logo-dark-cropped.png"
                  alt="Cromatica"
                  width={350}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <Typography
                text="Block Bank"
                className="font-primary"
                variant="label2"
                htmlTag="h1"
                isRawHtml
              />
              <Typography
                text="Reusable blocks and templates repository for the Cromatica team and clients."
                variant="label5"
                htmlTag="p"
                className="text-neutral-500 dark:text-neutral-800 font-body w-full"
              />
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link href={`/${locale}/blocks`}>
              <Button
                text="Browse Blocks"
                variant="primary"
                size="md"
                icon="ArrowRight"
                iconRightSide
              />
            </Link>
            <Link href={`/${locale}/templates`}>
              <Button
                iconRightSide
                icon="ArrowRight"
                text="Browse Templates"
                variant="outlined"
                size="md"
              />
            </Link>
          </div>
        </div>
      </LayoutContainer>
    </main>
  )
}
