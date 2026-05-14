import { z } from 'zod'
import { LOCALE_CODES } from '@/catalogs/locales'
import type { LocaleCode } from '@/config/locales'

export const TIERS = ['launch', 'growth', 'scale', 'custom'] as const
export const LAYOUTS = [
  'w-[95%] md:w-9/10 max-w-layout-sm',
  'w-[95%] md:w-9/10 max-w-layout-md',
  'w-[95%] md:w-9/10 max-w-layout-lg',
  'w-[95%] md:w-9/10 max-w-layout-xl',
] as const
export const NAVIGATIONS = ['nav-simple', 'nav-mega'] as const
export const FOOTERS = ['footer-simple', 'footer-mega'] as const
export const CRM_PROVIDERS = ['none', 'brevo', 'hubspot'] as const

export const schemaErrors = {
  en: {
    nameRequired: 'Project name is required.',
    nameFormat: 'Only lowercase letters, numbers and hyphens.',
    localesMin: 'At least one language is required.',
    defaultLocaleInvalid: 'Default locale must be one of the selected locales.',
  },
  es: {
    nameRequired: 'El nombre del proyecto es requerido.',
    nameFormat: 'Solo letras minúsculas, números y guiones.',
    localesMin: 'Al menos un idioma es requerido.',
    defaultLocaleInvalid: 'El idioma por defecto debe ser uno de los idiomas seleccionados.',
  },
}

export function buildConfiguratorSchema(locale: LocaleCode) {
  const e = schemaErrors[locale] ?? schemaErrors.en

  return z
    .object({
      name: z
        .string()
        .min(1, e.nameRequired)
        .transform((val) =>
          val
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .replace(/[^a-zA-Z0-9-]/g, '')
            .toLowerCase()
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, ''),
        )
        .pipe(
          z
            .string()
            .min(1, e.nameRequired)
            .regex(/^[a-z0-9-]+$/, e.nameFormat),
        ),
      tier: z.enum([...TIERS]),
      locales: z.array(z.enum(LOCALE_CODES as [string, ...string[]])).min(1, e.localesMin),
      defaultLocale: z.string(),
      allowDarkMode: z.boolean(),
      layoutWidth: z.enum([...LAYOUTS]),
      selectedNavigation: z.enum([...NAVIGATIONS]),
      selectedFooter: z.enum([...FOOTERS]),
      allowPostsCollection: z.boolean(),
      postsCustomName: z.string().optional(),
      postsPath: z.string().optional(),
      allowOurTeamCollection: z.boolean(),
      ourTeamCustomName: z.string().optional(),
      ourTeamPath: z.string().optional(),
      isSinglePage: z.boolean(),
      crmProvider: z.enum([...CRM_PROVIDERS]),
      brevoListId: z.number().optional(),
      hubspotPortalId: z.string().optional(),
      hubspotFormId: z.string().optional(),
    })
    .refine((data) => data.locales.includes(data.defaultLocale), {
      message: e.defaultLocaleInvalid,
      path: ['defaultLocale'],
    })
}

export const configuratorSchema = buildConfiguratorSchema('en')
export type ConfiguratorSchema = z.infer<typeof configuratorSchema>
