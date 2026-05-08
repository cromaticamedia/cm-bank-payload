'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Typography from '@/components/atoms/Typography'
import { CardHeader, CardBody, CardFooter } from '@/components/atoms/Card'
import { Button } from '@/components/atoms/Button'
import type { Media } from '@/payload-types'
import type { queryBlocksPaginated } from '@/queries/blocks'
import { Separator } from '@/components/atoms/Separator'
import { cn } from '@/utils/styles'

type Block = Awaited<ReturnType<typeof queryBlocksPaginated>>['docs'][number]

interface BlockCardProps {
  block: Block
  locale: string
  noPreviewLabel: string
}

const STATUS_STYLES: Record<string, string> = {
  stable:
    'bg-success-500/10 text-success-400 border-success-400 dark:bg-success-500/15 dark:text-success-500 dark:border-success-300',
  draft:
    'bg-warning-500/10 text-warning-400 border-warning-400 dark:bg-warning-500/15 dark:text-warning-500 dark:border-warning-500',
  deprecated:
    'bg-error-500/10 text-error-400 border-error-400 dark:bg-error-500/15 dark:text-error-500 dark:border-error-500',
}

export default function BlockCard({ block, locale, noPreviewLabel }: BlockCardProps) {
  const preview = block.preview as Media | null
  const installCommand = `npx cm-template-website add block ${block.name}`
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand)
  }

  return (
    <Link
      href={`/${locale}/blocks/${block.name}`}
      className="p-3 group flex flex-col gap-3 bg-neutral-1000 dark:bg-neutral-200/50 border border-neutral-800 dark:border-neutral-700/50 hover:border-primary-500/50 hover:bg-neutral-900/20 dark:hover:bg-neutral-200 transition-all duration-200 shadow-xs hover:scale-105 cursor-pointer"
    >
      {/* Header — category + status */}
      <CardHeader className="w-full px-0 py-0">
        <span className="text-[12px] font-mono px-2 py-0.5 border bg-neutral-900/20 dark:bg-neutral-300 text-neutral-200 dark:text-neutral-900 border-neutral-400 dark:border-neutral-600/50 group-hover:border-primary-500/30 transition-colors">
          {block.category as string}
        </span>
        <span
          className={`text-[12px] font-mono px-2 py-0.5 border ${STATUS_STYLES[block.status as string] ?? STATUS_STYLES.draft}`}
        >
          {block.status as string}
        </span>
      </CardHeader>

      {/* Body — label + description */}
      <CardBody className="py-0 px-0 w-full gap-3">
        {/* Preview */}
        {preview?.url ? (
          <div className="relative w-full h-48 dark:bg-neutral-400/30 overflow-hidden">
            {/* Spinner */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-neutral-600 border-t-primary-500 rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={preview.url}
              alt={block.label as string}
              width={600}
              height={338}
              priority
              onLoad={() => setImageLoaded(true)}
              className={cn(
                'w-full h-full object-cover transition-opacity duration-300',
                imageLoaded ? 'opacity-100' : 'opacity-0',
              )}
            />
          </div>
        ) : (
          <div className="w-full aspect-video flex items-center justify-center bg-neutral-800 dark:bg-neutral-400/30">
            <Typography text={noPreviewLabel} variant="p" className="text-neutral-600 font-mono" />
          </div>
        )}
        <Typography
          text={block.label as string}
          className="text-neutral-100 dark:text-neutral-1000 font-medium text-size-4"
        />
        {block.description && (
          <Typography
            text={block.description as string}
            className="text-neutral-400 dark:text-neutral-700 line-clamp-2 text-sm"
          />
        )}
      </CardBody>
      <Separator />
      {/* Footer — install command + copy button */}
      <CardFooter className="py-0 px-0 w-full justify-between">
        <Typography
          text={installCommand}
          variant="p"
          className="text-neutral-400 dark:text-neutral-700 font-mono text-[11px] truncate max-w-[70%]"
        />
        <Button
          isIcon
          icon="CopyIcon"
          iconVariant="none"
          iconSize="sm"
          onClick={handleCopy}
          className="text-neutral-400 hover:text-primary-400 transition-colors shrink-0 hover:bg-neutral-300 hover:text-white rounded-sm"
        />
      </CardFooter>
    </Link>
  )
}
