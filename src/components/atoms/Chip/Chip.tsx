import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from '@phosphor-icons/react'
import * as PhosphorIcons from '@phosphor-icons/react'
import { cn } from '@/utils/styles'
import Typography from '@/components/atoms/Typography'

// ─── Types ───────────────────────────────────────────────────────────────────

type PhosphorIconName = keyof typeof PhosphorIcons

// ─── Variants ────────────────────────────────────────────────────────────────

const ChipVariants = cva('inline-flex items-center gap-1.5 transition-colors select-none', {
  variants: {
    variant: {
      filled: 'bg-primary/10 text-primary',
      outlined:
        'border border-black dark:border-white bg-transparent text-foreground hover:bg-neutral-300/30',
      brand: 'bg-brand-1/10 text-brand-1',
      success: 'bg-green-500/10 text-green-600 dark:text-green-400',
      warning: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
      danger: 'bg-destructive/10 text-destructive',
      muted: 'bg-muted text-muted-foreground',
    },
    size: {
      sm: 'h-6 px-2 text-xs',
      md: 'h-8 px-3 text-sm',
      lg: 'h-10 px-4 text-base',
    },
  },
  defaultVariants: {
    variant: 'filled',
    size: 'md',
  },
})

// ─── Props ───────────────────────────────────────────────────────────────────

type ChipVariantsType = VariantProps<typeof ChipVariants> & {
  index?: number
  label: string
  icon?: PhosphorIconName
  avatar?: string
  avatarAlt?: string
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

// ─── Avatar ──────────────────────────────────────────────────────────────────

const ChipAvatar = ({
  src,
  alt,
  size,
}: {
  src: string
  alt?: string
  size: 'sm' | 'md' | 'lg'
}) => {
  const sizeClass = { sm: 'size-4', md: 'size-5', lg: 'size-6' }[size]

  return (
    <img
      src={src}
      alt={alt ?? ''}
      className={cn('rounded-full object-cover shrink-0', sizeClass)}
    />
  )
}

// ─── Chip ────────────────────────────────────────────────────────────────────

const Chip = ({
  index,
  label,
  icon,
  avatar,
  avatarAlt,
  dismissible = false,
  onDismiss,
  variant,
  size = 'md',
  className,
}: ChipVariantsType) => {
  const Icon = icon ? (PhosphorIcons[icon] as React.ElementType) : null
  const iconSize = { sm: 12, md: 14, lg: 16 }[size ?? 'md']

  return (
    <span className={cn(ChipVariants({ variant, size }), className)} key={index}>
      {/* Avatar */}
      {avatar && <ChipAvatar src={avatar} alt={avatarAlt} size={size ?? 'md'} />}

      {/* Icon */}
      {!avatar && Icon && <Icon size={iconSize} className="shrink-0" />}

      {/* Label */}
      <Typography text={label} htmlTag="p" className="leading-none font-medium" />

      {/* Dismiss */}
      {dismissible && (
        <button
          onClick={onDismiss}
          className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label={`Remove ${label}`}
        >
          <X size={iconSize} />
        </button>
      )}
    </span>
  )
}

export { Chip, ChipVariants, type ChipVariantsType }
