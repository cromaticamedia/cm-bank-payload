import type { ConfiguratorSchema } from './schema'
import { AVAILABLE_LOCALES } from '@/catalogs/locales'

export function generateProjectConfig(data: ConfiguratorSchema): string {
  const localesArray = data.locales
    .map((code) => {
      const label = AVAILABLE_LOCALES.find((l) => l.code === code)?.label ?? code
      return `    { label: '${label}', code: '${code}' as const }`
    })
    .join(',\n')

  const crmConfig =
    data.crmProvider === 'brevo'
      ? `{
    provider: 'brevo',
    brevo: { listId: ${data.brevoListId ?? 0} },
    hubspot: { portalId: '', formId: '' },
  }`
      : data.crmProvider === 'hubspot'
        ? `{
    provider: 'hubspot',
    brevo: { listId: 0 },
    hubspot: { portalId: '${data.hubspotPortalId ?? ''}', formId: '${data.hubspotFormId ?? ''}' },
  }`
        : `{
    provider: 'none',
    brevo: { listId: 0 },
    hubspot: { portalId: '', formId: '' },
  }`

  return `import type { TypeProjectConfig } from '@/config/types'

const ProjectConfig: TypeProjectConfig = {
  // Project Headers
  tier: '${data.tier}',
  name: '${data.name}',
  // Languages
  locales: [
${localesArray}
  ],
  defaultLocale: '${data.defaultLocale}',
  isSingleLocale: ${data.locales.length === 1},
  // Theme
  allowDarkMode: ${data.allowDarkMode},
  layoutWidth: 'w-[95%] md:w-9/10 max-w-layout-lg',
  // Menus
  selectedNavigation: '${data.selectedNavigation}',
  selectedFooter: '${data.selectedFooter}',
  // Collections
  allowOurTeamCollection: ${data.allowOurTeamCollection},
  allowPostsCollection: ${data.allowPostsCollection},
  isSinglePage: ${data.isSinglePage},
  // CRM Connection
  crm: ${crmConfig},
}

export default ProjectConfig
`
}
