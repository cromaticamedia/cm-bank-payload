'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/utils/styles'
import { useTranslations } from '@/hooks/useTranslations'
import LayoutContainer from '@/components/atoms/LayoutContainer'
import Typography from '@/components/atoms/Typography'
import { Button } from '@/components/atoms/Button'
import { Chip } from '@/components/atoms/Chip'
import CodeViewer from '@/components/molecules/CodeViewer'
import PageHeader from '@/components/molecules/PageHeader'
import type { LocaleCode } from '@/config/locales'
import type { Media, User } from '@/payload-types'
import type { queryBlockByName } from '@/queries/blocks'
import translations from './translations.json'
import { ArrowLeftIcon } from '@phosphor-icons/react'

type Block = NonNullable<Awaited<ReturnType<typeof queryBlockByName>>>

interface BlockDetailViewProps {
  block: Block
  locale: LocaleCode
}

const STATUS_STYLES: Record<string, string> = {
  stable: 'bg-success-500/10 text-success-400 border-success-400',
  draft: 'bg-warning-500/10 text-warning-400 border-warning-400',
  deprecated: 'bg-error-500/10 text-error-400 border-error-400',
}

const TABS = ['component', 'schema', 'mock'] as const
type Tab = (typeof TABS)[number]

export default function BlockDetailView({ block, locale }: BlockDetailViewProps) {
  const t = useTranslations(translations, locale)
  const [activeTab, setActiveTab] = useState<Tab>('component')
  const [copied, setCopied] = useState(false)

  const preview = block.preview as Media | null
  const installCommand = `npx cm-template-website add block ${block.name}`

  const authorName =
    block.authorType === 'registered'
      ? ((block.author as User)?.email ?? '—')
      : (block.authorName ?? '—')

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success(t.copied, { description: text })
    setTimeout(() => setCopied(false), 2000)
  }

  const tabContent: Record<Tab, string> = {
    component: (block.files?.componentTsx as string) ?? '',
    schema: (block.files?.blockTs as string) ?? '',
    mock: (block.files?.mockData as string) ?? '',
  }

  return (
    <main className="w-full flex flex-col">
      <LayoutContainer className="flex-col gap-8 py-8">
        {/* Back */}
        <Link
          href={`/${locale}/blocks`}
          className="flex items-center gap-1.5 text-neutral-500 hover:text-primary-500 transition-colors text-sm font-mono w-fit"
        >
          <ArrowLeftIcon size={14} weight="bold" />
          {t.backToBlocks}
        </Link>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <PageHeader
            tagline={t.tagline}
            title={block.label as string}
            subtitle={block.description as string}
          />
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[12px] font-mono px-2 py-0.5 border border-neutral-700 text-neutral-400">
              {block.category as string}
            </span>
            <span
              className={`text-[12px] font-mono px-2 py-0.5 border ${STATUS_STYLES[block.status as string] ?? STATUS_STYLES.draft}`}
            >
              {block.status as string}
            </span>
          </div>
        </div>

        {/* Preview */}
        {preview?.url && (
          <div className="w-full rounded-sm overflow-hidden border border-neutral-800 dark:border-neutral-300">
            <Image
              src={preview.url}
              alt={block.label as string}
              width={1200}
              height={675}
              className="w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Meta row — author + install command */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-neutral-800 dark:border-neutral-300 bg-neutral-900/20 dark:bg-neutral-200/50">
          {/* Author */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-700">
              {t.createdBy}
            </span>
            <span className="text-sm font-mono text-neutral-200 dark:text-neutral-900">
              {authorName}
            </span>
          </div>

          {/* Install command */}
          <div className="flex items-center gap-2">
            <code className="text-[11px] font-mono text-neutral-400 dark:text-neutral-700 truncate max-w-[280px]">
              {installCommand}
            </code>
            <Button
              isIcon
              icon={copied ? 'CheckIcon' : 'CopyIcon'}
              iconVariant="none"
              iconSize="sm"
              onClick={() => handleCopy(installCommand)}
              className="text-neutral-400 hover:text-primary-400 transition-colors shrink-0"
            />
          </div>
        </div>

        {/* Dependencies + Tags */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-700">
              {t.dependencies}
            </span>
            <div className="flex flex-wrap gap-2">
              {block.dependencies && (block.dependencies as string[]).length > 0 ? (
                (block.dependencies as string[]).map((dep) => (
                  <Chip key={dep} label={dep} variant="outlined" className="font-mono text-xs" />
                ))
              ) : (
                <span className="text-xs text-neutral-600 font-mono">{t.noDependencies}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-700">
              {t.tags}
            </span>
            <div className="flex flex-wrap gap-2">
              {block.tags && (block.tags as string[]).length > 0 ? (
                (block.tags as string[]).map((tag) => (
                  <Chip key={tag} label={tag} variant="filled" className="font-mono text-xs" />
                ))
              ) : (
                <span className="text-xs text-neutral-600 font-mono">{t.noTags}</span>
              )}
            </div>
          </div>
        </div>

        {/* Code tabs */}
        <div className="flex flex-col gap-0">
          {/* Tab headers */}
          <div className="flex border-b border-neutral-800 dark:border-neutral-300">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-4 py-2 text-xs font-mono transition-colors cursor-pointer border-b-2 -mb-px',
                  activeTab === tab
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-neutral-500 hover:text-neutral-200 dark:hover:text-neutral-900',
                )}
              >
                {t.tabs[tab]}
              </button>
            ))}
            <div className="flex-1" />
            <button
              onClick={() => handleCopy(tabContent[activeTab])}
              className="px-3 py-2 text-xs font-mono text-neutral-500 hover:text-primary-500 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copied ? t.copied : t.copy}
            </button>
          </div>

          {/* Tab content */}
          <CodeViewer code={tabContent[activeTab]} />
        </div>
      </LayoutContainer>
    </main>
  )
}
