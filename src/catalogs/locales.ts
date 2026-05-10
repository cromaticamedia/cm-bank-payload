export const AVAILABLE_LOCALES = [
  { label: 'English', code: 'en' },
  { label: 'Spanish', code: 'es' },
  { label: 'Portuguese', code: 'pt' },
  { label: 'French', code: 'fr' },
  { label: 'German', code: 'de' },
  { label: 'Italian', code: 'it' },
  { label: 'Dutch', code: 'nl' },
  { label: 'Polish', code: 'pl' },
  { label: 'Russian', code: 'ru' },
  { label: 'Ukrainian', code: 'uk' },
  { label: 'Czech', code: 'cs' },
  { label: 'Swedish', code: 'sv' },
  { label: 'Danish', code: 'da' },
  { label: 'Norwegian', code: 'nb' },
  { label: 'Indonesian', code: 'id' },
  { label: 'Vietnamese', code: 'vi' },
] as const

export type AvailableLocale = (typeof AVAILABLE_LOCALES)[number]
export type AvailableLocaleCode = AvailableLocale['code']

// Helper para el schema de Zod
export const LOCALE_CODES = AVAILABLE_LOCALES.map((l) => l.code) as unknown as [string, ...string[]]
