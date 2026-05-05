import React, { Suspense } from 'react'
import { cn } from '@/utils/styles'
import { themeScript, langScript } from '@/lib/scripts'
import Script from 'next/script'
import InitialLoading from '@/components/molecules/InitialLoading'
import { MiChroma, Microgramma, SpaceGrotesk } from '@/fonts'
import type { Metadata } from 'next'
import './styles.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://bank.cromatica.media'),
  title: {
    default: 'Block Bank',
    template: '%s — Cromatica Block Bank',
  },
  description: 'Reusable blocks and templates repository for the Cromatica team and clients.',
  keywords: ['blocks', 'templates', 'cromatica', 'payload', 'nextjs', 'ui components'],
  authors: [{ name: 'Cromatica Media', url: 'https://cromatica.media' }],
  creator: 'Leonardo Risco',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bank.cromatica.media',
    siteName: 'Cromatica Block Bank',
    title: 'Cromatica Block Bank',
    description: 'Reusable blocks and templates repository for the Cromatica team and clients.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cromatica Block Bank',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cromatica Block Bank',
    description: 'Reusable blocks and templates repository for the Cromatica team and clients.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/c-light.png', media: '(prefers-color-scheme: light)' },
      { url: '/c-dark.png', media: '(prefers-color-scheme: dark)' },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      lang="en"
      className={cn(MiChroma.variable, Microgramma.variable, SpaceGrotesk.variable)}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <Script
          id="locale-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: langScript }}
        />
      </head>
      <body className="min-h-screen w-full flex flex-col justify-between items-center bg-gradient-light dark:bg-gradient-dark">
        <Suspense fallback={<InitialLoading />}>{children}</Suspense>
      </body>
    </html>
  )
}
