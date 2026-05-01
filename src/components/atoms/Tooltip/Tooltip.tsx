import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/styles'

// ─── Variants ────────────────────────────────────────────────────────────────

const tooltipVariants = cva(
  [
    'z-50 max-w-xs rounded-md px-3 py-1.5 text-xs',
    'animate-in fade-in-0 zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=top]:slide-in-from-bottom-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        muted: 'bg-muted text-muted-foreground border border-border',
        destructive: 'bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

// ─── Types ───────────────────────────────────────────────────────────────────

type TooltipProps = VariantProps<typeof tooltipVariants> & {
  content: React.ReactNode
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  delayDuration?: number
  className?: string
  contentClassName?: string
  asChild?: boolean
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

const Tooltip = ({
  content,
  children,
  side = 'top',
  align = 'center',
  sideOffset = 6,
  delayDuration = 300,
  variant,
  className,
  contentClassName,
  asChild = true,
}: TooltipProps) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration}>
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild={asChild} className={className}>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          data-slot="tooltip"
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={cn(tooltipVariants({ variant }), contentClassName)}
        >
          {content}
          <TooltipPrimitive.Arrow
            className={cn(
              variant === 'muted' ? 'fill-border' : 'fill-primary',
              variant === 'destructive' && 'fill-destructive',
            )}
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
)

export default Tooltip
