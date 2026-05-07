import LayoutContainer from '@/components/atoms/LayoutContainer'
import Typography from '@/components/atoms/Typography'
import PageHeader from '@/components/molecules/PageHeader'
import { useTranslations } from '@/hooks/useTranslations'
import type { LocaleCode } from '@/config/locales'
import type { queryTemplates } from '@/queries/templates'
import type { Media } from '@/payload-types'
import translations from './translations.json'
import Image from 'next/image'
import Link from 'next/link'

const TIER_STYLES: Record<string, string> = {
  free: 'bg-neutral-800 dark:bg-neutral-400/30 text-neutral-400 dark:text-neutral-600 border-neutral-700 dark:border-neutral-600/50',
  pro: 'bg-primary-500/10 text-primary-500 border-primary-500/30',
  enterprise: 'bg-tertiary-600/10 text-tertiary-600 border-tertiary-600/30',
}

interface TemplateListProps {
  locale: LocaleCode
  templates: Awaited<ReturnType<typeof queryTemplates>>
}

const TemplatesView = ({ locale, templates }: TemplateListProps) => {
  const t = useTranslations(translations, locale)
  const subtitle = `${templates.length} ${templates.length === 1 ? t.subtitle_one : t.subtitle_many}`

  return (
    <main className="w-full flex items-center">
      <LayoutContainer className="flex-col gap-10">
        <PageHeader tagline={t.eyebrow} title={t.title} subtitle={subtitle} />

        {templates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="text-6xl">🎨</span>
            <Typography
              text={t.empty}
              variant="label5"
              className="text-neutral-500 dark:text-neutral-800"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => {
              const thumbnail = template.thumbnail as Media | null
              const tier = template.tier as string
              const features = template.features

              return (
                <Link
                  key={template.id}
                  href={`/${locale}/templates/${template.slug}`}
                  className="group flex flex-col gap-3 p-5 bg-neutral-900 dark:bg-neutral-300/50 border border-neutral-800 dark:border-neutral-700/50 rounded-xl hover:border-primary-500/50 hover:bg-neutral-800 dark:hover:bg-neutral-300 transition-all duration-200"
                >
                  <div className="w-full aspect-video bg-neutral-800 dark:bg-neutral-400/30 rounded-lg overflow-hidden group-hover:ring-1 group-hover:ring-primary-500/30 transition-all">
                    {thumbnail?.url ? (
                      <Image
                        src={thumbnail.url}
                        alt={template.name}
                        width={600}
                        height={338}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Typography
                          text={t.noPreview}
                          variant="p"
                          className="text-neutral-600 font-mono"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <Typography
                        text={template.name}
                        variant="label5"
                        className="text-neutral-100 dark:text-neutral-1000 font-secondary"
                      />
                      <span
                        className={`text-xs font-mono px-2 py-0.5 rounded-full border capitalize flex-shrink-0 ${TIER_STYLES[tier] ?? TIER_STYLES.free}`}
                      >
                        {tier}
                      </span>
                    </div>

                    {template.description && (
                      <Typography
                        text={template.description}
                        variant="p"
                        className="text-neutral-500 line-clamp-2"
                      />
                    )}

                    {features && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {features.darkMode && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 dark:bg-neutral-400/20 text-neutral-500 dark:text-neutral-600 border border-neutral-700/50">
                            {t.darkMode}
                          </span>
                        )}
                        {features.responsive && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 dark:bg-neutral-400/20 text-neutral-500 dark:text-neutral-600 border border-neutral-700/50">
                            {t.responsive}
                          </span>
                        )}
                        {features.i18n && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 dark:bg-neutral-400/20 text-neutral-500 dark:text-neutral-600 border border-neutral-700/50">
                            {t.i18n}
                          </span>
                        )}
                        {features.pagesCount && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 dark:bg-neutral-400/20 text-neutral-500 dark:text-neutral-600 border border-neutral-700/50">
                            {features.pagesCount} {t.pages}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-800 dark:border-neutral-700/50">
                    <Typography
                      text={template.category}
                      variant="p"
                      className="text-neutral-600 font-mono capitalize"
                    />
                    <span className="text-primary-500 text-xs group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </LayoutContainer>
    </main>
  )
}

export default TemplatesView
