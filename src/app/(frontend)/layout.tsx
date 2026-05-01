import React from 'react'
import { cn } from '@/utils/styles'
import { MiChroma, Microgramma, SpaceGrotesk } from '@/fonts'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      lang="en"
      className={cn(MiChroma.variable, Microgramma.variable, SpaceGrotesk.variable)}
      suppressHydrationWarning
    >
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
