export const logos = {
  dark: '/logo-dark-cropped.png',
  light: '/logo-light-cropped.png',
  darkIsotype: '/c-dark-625x625.png',
  lightIsotype: '/c-light-625x625.png',
  darkIsotypeIcon: '/c-dark.png',
  lightIsotypeIcon: '/c-light.png',
} as const

export const meta = {
  titleSuffix: '— Cromatica Media',
  icons: [
    { rel: 'icon', url: '/c-light.png', media: '(prefers-color-scheme: light)' },
    { rel: 'icon', url: '/c-dark.png', media: '(prefers-color-scheme: dark)' },
  ],
  openGraph: {
    title: 'Cromatica Media — Dashboard',
    description: 'Content Management System by Cromatica Media.',
    images: [{ url: '/logo-light-cropped.png' }],
  },
}
