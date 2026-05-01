'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from '@phosphor-icons/react'
import * as PhosphorIcons from '@phosphor-icons/react'
import { cn } from '@/utils/styles'

type PhosphorIconName = keyof typeof PhosphorIcons

// ─── Types ───────────────────────────────────────────────────────────────────

type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  icon?: PhosphorIconName
  className?: string
  overlayClassName?: string
  children: React.ReactNode
}

type DialogSlotProps = React.ComponentProps<'div'>

// ─── Component ───────────────────────────────────────────────────────────────

const Dialog = ({
  open,
  onOpenChange,
  icon,
  className,
  overlayClassName,
  children,
}: DialogProps) => {
  const Icon = icon ? (PhosphorIcons[icon] as React.ElementType) : null

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            overlayClassName,
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            'bg-card text-card-foreground fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2',
            'flex flex-col rounded-xl border shadow-lg',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            className,
          )}
        >
          {/* Close button */}
          <DialogPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
            <X size={16} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* Icon */}
          {Icon && (
            <div className="px-6 pt-6">
              <Icon size={24} />
            </div>
          )}

          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

const DialogHeader = ({ className, ...props }: DialogSlotProps) => (
  <div
    data-slot="dialog-header"
    className={cn('flex flex-col gap-1 px-6 pt-6', className)}
    {...props}
  />
)

const DialogBody = ({ className, ...props }: DialogSlotProps) => (
  <div data-slot="dialog-body" className={cn('flex flex-col gap-4 p-6', className)} {...props} />
)

const DialogFooter = ({ className, ...props }: DialogSlotProps) => (
  <div
    data-slot="dialog-footer"
    className={cn('flex items-center justify-end gap-2 px-6 pb-6', className)}
    {...props}
  />
)

export { Dialog, DialogHeader, DialogBody, DialogFooter }
