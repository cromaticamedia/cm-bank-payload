export const locales = [
  { label: 'English', code: 'en' as const },
  { label: 'Spanish', code: 'es' as const },
] as const

export type Locale = (typeof locales)[number]
export type LocaleCode = Locale['code']

export const localeCodes = locales.map((l: Locale) => l.code)
export const defaultLocale: Locale = locales[0]
export const defaultLocaleCode: LocaleCode = locales[0].code
