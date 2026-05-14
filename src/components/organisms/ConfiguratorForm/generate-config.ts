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

  // Strip leading slash for the config value since the middleware handles routing
  const postsPath = (data.postsPath ?? '/blog').replace(/^\//, '') || 'blog'
  const ourTeamPath = (data.ourTeamPath ?? '/our-team').replace(/^\//, '') || 'our-team'

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
  layoutWidth: '${data.layoutWidth}',
  // Menus
  selectedNavigation: '${data.selectedNavigation}',
  selectedFooter: '${data.selectedFooter}',
  // Collections
  allowOurTeamCollection: ${data.allowOurTeamCollection},
  ourTeamPath: '${ourTeamPath}',
  allowPostsCollection: ${data.allowPostsCollection},
  postsPath: '${postsPath}',
  isSinglePage: ${data.isSinglePage},
  // CRM Connection
  crm: ${crmConfig},
}

export default ProjectConfig
`
}
