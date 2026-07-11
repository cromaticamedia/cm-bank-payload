import Link from 'next/link'
import type { LocaleCode } from '@/config/locales'
import { useTranslations } from '@/hooks/useTranslations'
import { getAnalytics } from '@/queries/analytics'
import LayoutContainer from '@/components/atoms/LayoutContainer'
import PageHeader from '@/components/molecules/PageHeader/PageHeader'
import translations from './translations.json'
import { Card, CardHeader, CardBody } from '@/components/atoms/Card'
import Typography from '@/components/atoms/Typography'

interface HomeProps {
  locale: LocaleCode
}

const Home = async ({ locale }: HomeProps) => {
  const t = useTranslations(translations, locale)
  const analytics = await getAnalytics()

  const categoryColorMap: Record<string, string> = {
    hero: 'bg-red-400',
    form: 'bg-yellow-300',
    cta: 'bg-success-400',
    perks: 'bg-purple-400',
    cards: 'bg-blue-400',
  }

  return (
    <main className="w-full flex flex-col relative overflow-hidden">
      <LayoutContainer>
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
              {
                label: t.stable,
                value: analytics.blocks.byStatus.stable,
                color: 'bg-success-500',
              },
              { label: t.draft, value: analytics.blocks.byStatus.draft, color: 'bg-warning-500' },
              {
                label: t.deprecated,
                value: analytics.blocks.byStatus.deprecated,
                color: 'bg-error-500',
              },
            ]}
            total={analytics.blocks.total}
            locale={locale}
          />
          <BreakdownCard
            title={`${t.totalTemplates} — ${t.byStatus}`}
            items={[
              {
                label: t.published,
                value: analytics.templates.byStatus.published,
                color: 'bg-success-500',
              },
              {
                label: t.draft,
                value: analytics.templates.byStatus.draft,
                color: 'bg-warning-500',
              },
              {
                label: t.deprecated,
                value: analytics.templates.byStatus.deprecated,
                color: 'bg-error-500',
              },
            ]}
            total={analytics.templates.total}
            locale={locale}
          />
          <BreakdownCard
            title={`${t.totalBlocks} — ${t.byCategory}`}
            items={Object.entries(analytics.blocks.byCategory).map(([key, value]) => ({
              label: key,
              value,
              color: categoryColorMap[key] ?? 'bg-neutral-900',
            }))}
            total={analytics.blocks.total}
            locale={locale}
          />
          <BreakdownCard
            title={`${t.totalTemplates} — ${t.byTier}`}
            items={[
              {
                label: t.launch,
                value: analytics.templates.byTier.launch,
                color: 'bg-success-500',
              },
              {
                label: t.growth,
                value: analytics.templates.byTier.growth,
                color: 'bg-warning-500',
              },
              {
                label: t.scale,
                value: analytics.templates.byTier.scale,
                color: 'bg-error-500',
              },
            ]}
            total={analytics.templates.total}
            locale={locale}
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
      className="flex flex-col gap-4 p-5 border border-neutral-800 dark:border-neutral-500 bg-neutral-1000 dark:bg-neutral-100/20 hover:border-primary-600 dark:hover:border-primary-600 transition-colors group backdrop-blur-xs shadow-xs"
    >
      <Typography
        text={label}
        variant="label6"
        htmlTag="span"
        className="font-tertiary text-neutral-500 dark:text-neutral-900 tracking-wide"
      />
      <Typography
        text={String(value)}
        variant="label2"
        htmlTag="span"
        className="font-bold font-secondary text-neutral-100 dark:text-neutral-1000 group-hover:text-primary-500 transition-colors"
      />
    </Link>
  )
}

// ── BreakdownCard ───────────────────────────────────────────────────────────
function BreakdownCard({
  title,
  items,
  total,
  locale,
}: {
  title: string
  locale: LocaleCode
  items: { label: string; value: number; color: string }[]
  total: number
}) {
  const t = useTranslations(translations, locale)
  const totalEntries = items.reduce((sum, element) => sum + element.value, 0)
  return (
    <Card className="border border-neutral-800 dark:border-neutral-500 bg-neutral-1000 dark:bg-neutral-100/20 justify-start backdrop-blur-xs shadow-xs">
      <CardHeader className="pt-4 px-4 pb-0">
        <Typography
          text={title}
          variant="label6"
          htmlTag="span"
          className="font-tertiary text-neutral-500 dark:text-neutral-900 tracking-wide"
        />
      </CardHeader>

      <CardBody className="px-4 py-3 gap-4">
        {/* Bar */}
        {totalEntries !== 0 ? (
          <div className="flex h-3 w-full rounded-full overflow-hidden my-2 bg-neutral-500 dark:bg-white border-1 dark:border-neutral-200">
            {items.map((item) => (
              <div
                key={item.label}
                className={`${item.color} transition-all`}
                style={{ width: total > 0 ? `${(item.value / total) * 100}%` : '0%' }}
              />
            ))}
          </div>
        ) : (
          <Typography
            text={t.noEntries}
            variant="label6"
            className="text-neutral-600 dark:text-neutral-900"
          />
        )}

        {/* Legend */}
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <Typography
                  text={item.label}
                  variant="label6"
                  className="capitalize text-xs text-neutral-600 dark:text-neutral-900"
                />
              </div>
              <Typography
                text={String(item.value)}
                variant="label6"
                className="text-xs font-primary text-neutral-600 dark:text-neutral-900"
              />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

export default Home
