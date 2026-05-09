'use client'

import Typography from '@/components/atoms/Typography'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import NavLink from '@/components/atoms/NavLink/NavLink'
import { cn } from '@/utils/styles'

interface PageHeaderProps {
  tagline: string
  title: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
  getBackLink?: string
  getBackLabel?: string
}

const PageHeader = ({
  tagline,
  title,
  subtitle,
  children,
  className,
  getBackLink,
  getBackLabel,
}: PageHeaderProps) => {
  return (
    <div className={cn('flex flex-col gap-3 leading pt-2 sm:pt-4 lg:pt-7 w-full', className)}>
      {getBackLink && (
        <NavLink
          href={getBackLink}
          className="flex items-center gap-1.5 w-fit text-sm font-mono text-neutral-500 dark:text-neutral-200 hover:text-primary-500 dark:hover:text-primary-500 transition-colors group"
        >
          <ArrowLeftIcon
            size={14}
            weight="bold"
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          {getBackLabel}
        </NavLink>
      )}
      <div className="w-full flex items-center justify-between">
        <Typography
          text={tagline}
          variant="label6"
          className="text-primary-600 uppercase dark:text-primary-600"
        />
        {children}
      </div>
      <Typography
        text={title}
        variant="label2"
        htmlTag="h1"
        className="font-primary text-neutral-100 dark:text-neutral-1000 leading-1"
      />
      {subtitle && (
        <Typography
          text={subtitle}
          variant="label6"
          htmlTag="p"
          className="text-neutral-600 dark:text-neutral-800"
        />
      )}
    </div>
  )
}

export default PageHeader
