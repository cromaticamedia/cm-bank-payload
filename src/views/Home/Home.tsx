import Link from 'next/link'
import type { LocaleCode } from '@/config/locales'
import { useTranslations } from '@/hooks/useTranslations'
import { getAnalytics } from '@/queries/analytics'
import LayoutContainer from '@/components/atoms/LayoutContainer'
import PageHeader from '@/components/molecules/PageHeader/PageHeader'
import translations from './translations.json'

interface HomeProps {
  locale: LocaleCode
}

const Home = async ({ locale }: HomeProps) => {
  const t = useTranslations(translations, locale)
  const analytics = await getAnalytics()

  return (
    <main className="w-full flex flex-col relative overflow-hidden">
      <LayoutContainer className="relative z-10 flex-col gap-6 py-8">
        <PageHeader tagline={t.tagline} title={t.title} subtitle={t.subtitle} />
        {/* ── Stat cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label={t.totalBlocks}
            value={analytics.blocks.total}
            href={`/${locale}/blocks`}
          />
          <StatCard
            label={t.totalTemplates}
            value={analytics.templates.total}
            href={`/${locale}/templates`}
          />
        </div>

        {/* ── Blocks breakdown ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BreakdownCard
            title={`${t.totalBlocks} — ${t.byStatus}`}
            items={[
              { label: t.stable, value: analytics.blocks.byStatus.stable, color: 'bg-primary-500' },
              { label: t.draft, value: analytics.blocks.byStatus.draft, color: 'bg-neutral-500' },
              {
                label: t.deprecated,
                value: analytics.blocks.byStatus.deprecated,
                color: 'bg-red-500',
              },
            ]}
            total={analytics.blocks.total}
          />
          <BreakdownCard
            title={`${t.totalTemplates} — ${t.byStatus}`}
            items={[
              {
                label: t.published,
                value: analytics.templates.byStatus.published,
                color: 'bg-primary-500',
              },
              {
                label: t.draft,
                value: analytics.templates.byStatus.draft,
                color: 'bg-neutral-500',
              },
              {
                label: t.deprecated,
                value: analytics.templates.byStatus.deprecated,
                color: 'bg-red-500',
              },
            ]}
            total={analytics.templates.total}
          />
          <BreakdownCard
            title={`${t.totalTemplates} — ${t.byTier}`}
            items={[
              { label: t.free, value: analytics.templates.byTier.free, color: 'bg-neutral-400' },
              { label: t.pro, value: analytics.templates.byTier.pro, color: 'bg-primary-500' },
              {
                label: t.enterprise,
                value: analytics.templates.byTier.enterprise,
                color: 'bg-secondary-500',
              },
            ]}
            total={analytics.templates.total}
          />
          <BreakdownCard
            title={`${t.totalBlocks} — ${t.byCategory}`}
            items={Object.entries(analytics.blocks.byCategory).map(([key, value]) => ({
              label: key,
              value,
              color: 'bg-primary-500',
            }))}
            total={analytics.blocks.total}
          />
        </div>
      </LayoutContainer>
    </main>
  )
}

// ── StatCard ────────────────────────────────────────────────────────────────
function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 p-5 border border-neutral-900 dark:border-neutral-300 bg-neutral-1000 dark:bg-neutral-100/20 hover:border-primary-600 dark:hover:border-primary-600 transition-colors group"
    >
      <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-700">
        {label}
      </span>
      <span className="text-4xl font-bold text-neutral-100 dark:text-neutral-1000 group-hover:text-primary-500 transition-colors">
        {value}
      </span>
    </Link>
  )
}

// ── BreakdownCard ───────────────────────────────────────────────────────────
function BreakdownCard({
  title,
  items,
  total,
}: {
  title: string
  items: { label: string; value: number; color: string }[]
  total: number
}) {
  return (
    <div className="flex flex-col gap-4 p-5 border border-neutral-900 dark:border-neutral-300 bg-neutral-1000 dark:bg-neutral-100/20">
      <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-700">
        {title}
      </span>

      {/* Bar */}
      <div className="flex h-1.5 w-full rounded-full overflow-hidden gap-px">
        {items.map((item) => (
          <div
            key={item.label}
            className={`${item.color} transition-all`}
            style={{ width: total > 0 ? `${(item.value / total) * 100}%` : '0%' }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-xs capitalize text-neutral-500 dark:text-neutral-700">
                {item.label}
              </span>
            </div>
            <span className="text-xs font-mono font-medium text-neutral-300 dark:text-neutral-800">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
