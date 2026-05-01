import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { X } from '@phosphor-icons/react'
import { cn } from '@/utils/styles'

// ─── Types ───────────────────────────────────────────────────────────────────

type PopoverProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  showClose?: boolean
  className?: string
  contentClassName?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const PopoverContent = ({
  className,
  align = 'center',
  side = 'bottom',
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      data-slot="popover-content"
      align={align}
      side={side}
      sideOffset={sideOffset}
      className={cn(
        'bg-popover text-popover-foreground',
        'z-50 w-auto max-w-120 p-1 shadow-xs outline-none',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=top]:slide-in-from-bottom-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
)

// ─── Popover ─────────────────────────────────────────────────────────────────

const Popover = ({
  trigger,
  children,
  side = 'bottom',
  align = 'center',
  sideOffset = 8,
  showClose = false,
  className,
  contentClassName,
  open,
  onOpenChange,
}: PopoverProps) => (
  <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
    <PopoverPrimitive.Trigger asChild className={className}>
      {trigger}
    </PopoverPrimitive.Trigger>

    <PopoverContent side={side} align={align} sideOffset={sideOffset} className={contentClassName}>
      {showClose && (
        <PopoverPrimitive.Close className="absolute top-3 right-3 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
          <X size={14} />
          <span className="sr-only">Close</span>
        </PopoverPrimitive.Close>
      )}
      {children}
    </PopoverContent>
  </PopoverPrimitive.Root>
)

export { Popover, PopoverContent }
