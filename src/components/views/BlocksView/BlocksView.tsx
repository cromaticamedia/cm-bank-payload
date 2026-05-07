import LayoutContainer from '@/components/atoms/LayoutContainer'
import Typography from '@/components/atoms/Typography'
import PageHeader from '@/components/molecules/PageHeader'
import { useTranslations } from '@/hooks/useTranslations'
import type { LocaleCode } from '@/config/locales'
import type { Media } from '@/payload-types'
import translations from './translations.json'
import type { queryBlocks } from '@/queries/blocks'
import Image from 'next/image'
import Link from 'next/link'

interface BlockListProps {
  locale: LocaleCode
  blocks: Awaited<ReturnType<typeof queryBlocks>>
}

const BlocksView = ({ locale, blocks }: BlockListProps) => {
  const t = useTranslations(translations, locale)
  const subtitle = `${blocks.length} ${blocks.length === 1 ? t.subtitle_one : t.subtitle_many}`

  return (
    <main className="w-full flex items-center">
      <LayoutContainer className="flex-col gap-10">
        <PageHeader tagline={t.eyebrow} title={t.title} subtitle={subtitle} />

        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="text-6xl">📦</span>
            <Typography
              text={t.empty}
              variant="label5"
              className="text-neutral-500 dark:text-neutral-800"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blocks.map((block) => {
              const preview = block.preview as Media | null
              return (
                <Link
                  key={block.id}
                  href={`/${locale}/blocks/${block.name}`}
                  className="group flex flex-col gap-3 p-5 bg-neutral-900 dark:bg-neutral-300/50 border border-neutral-800 dark:border-neutral-700/50 rounded-xl hover:border-primary-500/50 hover:bg-neutral-800 dark:hover:bg-neutral-300 transition-all duration-200"
                >
                  <div className="w-full aspect-video bg-neutral-800 dark:bg-neutral-400/30 rounded-lg overflow-hidden group-hover:ring-1 group-hover:ring-primary-500/30 transition-all">
                    {preview?.url ? (
                      <Image
                        src={preview.url}
                        alt={block.label as string}
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
                    <div className="flex items-center justify-between">
                      <Typography
                        text={block.label as string}
                        variant="label5"
                        className="text-neutral-100 dark:text-neutral-1000 font-secondary"
                      />
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-neutral-800 dark:bg-neutral-400/30 text-neutral-400 dark:text-neutral-600 border border-neutral-700 dark:border-neutral-600/50 group-hover:border-primary-500/30">
                        {block.category as string}
                      </span>
                    </div>
                    {block.description && (
                      <Typography
                        text={block.description as string}
                        variant="p"
                        className="text-neutral-500 line-clamp-2"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-800 dark:border-neutral-700/50">
                    <Typography
                      text={block.name as string}
                      variant="p"
                      className="text-neutral-600 font-mono"
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

export default BlocksView
