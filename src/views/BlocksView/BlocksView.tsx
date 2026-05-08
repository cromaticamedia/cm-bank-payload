import Link from 'next/link'
import LayoutContainer from '@/components/atoms/LayoutContainer'
import Typography from '@/components/atoms/Typography'
import PageHeader from '@/components/molecules/PageHeader'
import BlockCard from '@/components/molecules/BlockCard/BlockCard'
import { useTranslations } from '@/hooks/useTranslations'
import type { LocaleCode } from '@/config/locales'
import type { queryBlocksPaginated } from '@/queries/blocks'
import translations from './translations.json'

interface BlocksViewProps {
  locale: LocaleCode
  data: Awaited<ReturnType<typeof queryBlocksPaginated>>
  currentPage: number
}

const BlocksView = ({ locale, data, currentPage }: BlocksViewProps) => {
  const t = useTranslations(translations, locale)
  const { docs: blocks, totalDocs, totalPages, hasPrevPage, hasNextPage } = data
  const subtitle = `${totalDocs} ${totalDocs === 1 ? t.subtitle_one : t.subtitle_many}`

  return (
    <main className="w-full flex items-center">
      <LayoutContainer className="flex-col gap-6">
        <PageHeader tagline={t.eyebrow} title={t.title} subtitle={subtitle} />

        {blocks.length === 0 ? (
          // ── Empty state ──────────────────────────────────────────
          <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
            <div className="flex items-center justify-center w-30 h-30 bg-neutral-900 dark:bg-neutral-300/50 border border-neutral-800 dark:border-neutral-700/50 text-6xl">
              📦
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Typography
                text={t.emptyTitle}
                variant="label5"
                className="text-neutral-300 dark:text-neutral-900"
              />
              <Typography
                text={t.emptySubtitle}
                variant="label6"
                className="text-neutral-600 dark:text-neutral-800 w-1/2"
              />
            </div>
          </div>
        ) : (
          <>
            {/* ── Grid ──────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {blocks.map((block) => (
                <BlockCard
                  key={block.id}
                  block={block}
                  locale={locale}
                  noPreviewLabel={t.noPreview}
                />
              ))}
            </div>

            {/* ── Pagination ────────────────────────────────────── */}
            {totalDocs > 0 && (
              <div className="flex items-center justify-center gap-10 pb-4">
                <PaginationLink
                  href={`/${locale}/blocks?page=${currentPage - 1}`}
                  disabled={!hasPrevPage}
                  label={t.prevPage}
                />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationLink
                    key={p}
                    href={`/${locale}/blocks?page=${p}`}
                    label={String(p)}
                    active={p === currentPage}
                  />
                ))}
                <PaginationLink
                  href={`/${locale}/blocks?page=${currentPage + 1}`}
                  disabled={!hasNextPage}
                  label={t.nextPage}
                />
              </div>
            )}
          </>
        )}
      </LayoutContainer>
    </main>
  )
}

// ── PaginationLink ──────────────────────────────────────────────────────────
function PaginationLink({
  href,
  label,
  active,
  disabled,
}: {
  href: string
  label: string
  active?: boolean
  disabled?: boolean
}) {
  if (disabled) {
    return (
      <span className="w-8 h-8 flex items-center justify-center rounded-sm text-sm font-mono text-neutral-700 dark:text-neutral-600 cursor-not-allowed">
        {label}
      </span>
    )
  }

  return (
    <Link
      href={href}
      className={`w-8 h-8 flex items-center justify-center rounded-sm text-sm font-mono transition-colors ${
        active
          ? 'bg-primary-600 text-white'
          : 'text-neutral-400 dark:text-neutral-700 hover:bg-neutral-800 dark:hover:bg-neutral-300 hover:text-neutral-100 dark:hover:text-neutral-900'
      }`}
    >
      {label}
    </Link>
  )
}

export default BlocksView
