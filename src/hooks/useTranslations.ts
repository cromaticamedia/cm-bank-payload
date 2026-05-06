import type { LocaleCode } from '@/config/locales'

export function useTranslations<T>(translations: { en: T; es: T }, locale: LocaleCode): T {
  return translations[locale] ?? translations.en
}
