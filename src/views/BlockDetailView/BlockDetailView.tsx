'use client'

import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/utils/styles'
import { useTranslations } from '@/hooks/useTranslations'
import LayoutContainer from '@/components/atoms/LayoutContainer'
import Typography from '@/components/atoms/Typography'
import { Button } from '@/components/atoms/Button'
import CodeViewer from '@/components/molecules/CodeViewer'
import PageHeader from '@/components/molecules/PageHeader'
import type { LocaleCode } from '@/config/locales'
import type { Media, User } from '@/payload-types'
import type { queryBlockByName } from '@/queries/blocks'
import translations from './translations.json'

import { Chip } from '@/components/atoms/Chip'

type Block = NonNullable<Awaited<ReturnType<typeof queryBlockByName>>>

interface BlockDetailViewProps {
  block: Block
  locale: LocaleCode
}

const STATUS_STYLES: Record<string, string> = {
  stable:
    'bg-success-500/10 text-success-400 border-success-400 dark:bg-success-500/15 dark:text-success-500 dark:border-success-300',
  draft:
    'bg-warning-500/10 text-warning-400 border-warning-400 dark:bg-warning-500/15 dark:text-warning-500 dark:border-warning-500',
  deprecated:
    'bg-error-500/10 text-error-400 border-error-400 dark:bg-error-500/15 dark:text-error-500 dark:border-error-500',
}

const TABS = ['component', 'schema', 'mock'] as const
type Tab = (typeof TABS)[number]

export default function BlockDetailView({ block, locale }: BlockDetailViewProps) {
  const t = useTranslations(translations, locale)
  const [activeTab, setActiveTab] = useState<Tab>('component')
  const [copiedInstall, setCopiedInstall] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [copiedTab, setCopiedTab] = useState(false)

  console.log('block', block)

  const preview = block.preview as Media | null
  const installCommand = `npx cm-template-website add block ${block.name}`

  const authorName =
    block.authorType === 'registered'
      ? `${(block.author as User)?.firstName} ${(block.author as User)?.lastName}` || '-'
      : (block.authorName ?? '—')

  const createdAt = new Date(block.createdAt).toLocaleDateString(
    locale === 'es' ? 'es-PE' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  )

  const tabContent: Record<Tab, string> = {
    component: (block.files?.componentTsx as string) ?? '',
    schema: (block.files?.blockTs as string) ?? '',
    mock: (block.files?.mockData as string) ?? '',
  }

  const handleCopyInstall = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopiedInstall(true)
    toast.success(t.copied, { description: installCommand })
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  const handleCopyTab = async () => {
    await navigator.clipboard.writeText(tabContent[activeTab])
    setCopiedTab(true)
    toast.success(t.copied, { description: tabContent[activeTab].slice(0, 50) + '...' })
    setTimeout(() => setCopiedTab(false), 2000)
  }

  return (
    <main>
      <LayoutContainer>
        <PageHeader
          tagline={t.tagline}
          getBackLink={`/${locale}/blocks`}
          getBackLabel={t.backToBlocks}
          title={block.label as string}
          subtitle={block.description as string}
        >
          <div className="flex items-center gap-2">
            <Chip label={block.category as string} />
            <Chip
              label={block.status as string}
              className={STATUS_STYLES[block.status as string] ?? STATUS_STYLES.draft}
            />
          </div>
        </PageHeader>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Typography
              text={t.createdBy}
              className="text-neutral-400 dark:text-neutral-900 text-[13px]"
            />
            <Typography
              text={authorName}
              className="text-neutral-200 dark:text-neutral-1000 text-[14px] font-bold"
            />
          </div>
          <div className="flex items-center gap-2">
            <Typography
              text={t.createdOn}
              className="text-neutral-400 dark:text-neutral-900 text-[13px]"
            />
            <Typography
              text={createdAt}
              className="text-neutral-200 dark:text-neutral-1000 text-[14px] font-bold"
            />
          </div>
        </div>

        {/* ── Preview ──────────────────────────────────────────────── */}
        {preview?.url && (
          <div className="relative w-full overflow-hidden flex items-center justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-neutral-600 border-t-primary-500 rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={preview.url}
              alt={block.label as string}
              width={700}
              height={400}
              priority
              onLoad={() => setImageLoaded(true)}
              className={cn(
                'w-fit max-w-[700px] transition-opacity duration-300',
                imageLoaded ? 'opacity-100' : 'opacity-0',
              )}
            />
          </div>
        )}

        {/* ── Meta — author + install command ──────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-neutral-800 dark:border-neutral-300 bg-neutral-900/20 dark:bg-neutral-200/50">
          <Typography
            text={installCommand}
            variant="p"
            htmlTag="span"
            className="font-mono text-neutral-400 dark:text-neutral-700 truncate max-w-[280px]"
          />
          <Button
            isIcon
            icon={copiedInstall ? 'CheckIcon' : 'CopyIcon'}
            iconVariant="none"
            iconSize="sm"
            onClick={handleCopyInstall}
            className="text-neutral-400 dark:text-neutral-600 hover:text-primary-400 dark:hover:text-primary-500 transition-colors shrink-0"
          />
        </div>

        {/* ── Dependencies + Tags ───────────────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col gap-2">
            <Typography
              text={t.dependencies}
              variant="p"
              className="font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-700"
            />
            <div className="flex flex-wrap gap-2">
              {block.dependencies && (block.dependencies as string[]).length > 0 ? (
                (block.dependencies as string[]).map((dep) => (
                  <Chip key={dep} label={dep} variant="outlined" className="font-mono text-xs" />
                ))
              ) : (
                <Typography
                  text={t.noDependencies}
                  variant="p"
                  className="font-mono text-neutral-600 dark:text-neutral-500"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Typography
              text={t.tags}
              variant="p"
              className="font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-700"
            />
            <div className="flex flex-wrap gap-2">
              {block.tags && (block.tags as string[]).length > 0 ? (
                (block.tags as string[]).map((tag) => (
                  <Chip key={tag} label={tag} variant="filled" className="font-mono text-xs" />
                ))
              ) : (
                <Typography
                  text={t.noTags}
                  variant="p"
                  className="font-mono text-neutral-600 dark:text-neutral-500"
                />
              )}
            </div>
          </div>
        </div>

        {/* ── Code tabs ────────────────────────────────────────────── */}
        <div className="flex flex-col">
          <div className="flex items-center border-b border-neutral-800 dark:border-neutral-300">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-4 py-2 text-xs font-mono transition-colors cursor-pointer border-b-2 -mb-px',
                  activeTab === tab
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-neutral-500 dark:text-neutral-600 hover:text-neutral-100 dark:hover:text-neutral-900',
                )}
              >
                {t.tabs[tab]}
              </button>
            ))}
            <div className="flex-1" />
            <button
              onClick={handleCopyTab}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-neutral-500 dark:text-neutral-600 hover:text-primary-500 dark:hover:text-primary-500 transition-colors cursor-pointer"
            >
              {copiedTab ? t.copied : t.copy}
            </button>
          </div>
          <CodeViewer code={tabContent[activeTab]} />
        </div>
      </LayoutContainer>
    </main>
  )
}
