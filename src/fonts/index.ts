import localFont from 'next/font/local'

export const MiChroma = localFont({
  src: [{ path: './michroma/Michroma-Regular.ttf', weight: '400' }],
  variable: '--font-michroma',
})

export const Microgramma = localFont({
  src: [{ path: './microgramma/Microgramma-Bold.otf', weight: '700' }],
  variable: '--font-microgramma',
})

export const SpaceGrotesk = localFont({
  src: [
    { path: './space-grotesk/static/SpaceGrotesk-Light.ttf', weight: '300' },
    { path: './space-grotesk/static/SpaceGrotesk-Regular.ttf', weight: '400' },
    { path: './space-grotesk/static/SpaceGrotesk-Medium.ttf', weight: '500' },
    { path: './space-grotesk/static/SpaceGrotesk-SemiBold.ttf', weight: '600' },
    { path: './space-grotesk/static/SpaceGrotesk-Bold.ttf', weight: '700' },
  ],
  variable: '--font-space-grotesk',
})
