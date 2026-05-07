import { z } from 'zod'
import { LOCALE_CODES } from '@/catalogs/locales'

export const TIERS = ['launch', 'growth', 'scale'] as const
export const NAVIGATIONS = ['nav-simple', 'nav-mega'] as const
export const FOOTERS = ['footer-simple', 'footer-mega'] as const
export const CRM_PROVIDERS = ['none', 'brevo', 'hubspot'] as const

export const configuratorSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Project name is required')
      .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers and hyphens'),
    tier: z.enum([...TIERS]),

    locales: z
      .array(z.enum(LOCALE_CODES as [string, ...string[]]))
      .min(1, 'At least one language is required'),
    defaultLocale: z.string(),

    allowDarkMode: z.boolean(),

    selectedNavigation: z.enum([...NAVIGATIONS]),
    selectedFooter: z.enum([...FOOTERS]),

    allowPostsCollection: z.boolean(),
    allowOurTeamCollection: z.boolean(),
    isSinglePage: z.boolean(),

    crmProvider: z.enum([...CRM_PROVIDERS]),
    brevoListId: z.number().optional(),
    hubspotPortalId: z.string().optional(),
    hubspotFormId: z.string().optional(),
  })
  .refine((data) => data.locales.includes(data.defaultLocale), {
    message: 'Default locale must be one of the selected locales',
    path: ['defaultLocale'],
  })

export type ConfiguratorSchema = z.infer<typeof configuratorSchema>
