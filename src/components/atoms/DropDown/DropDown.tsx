'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@/utils/styles'

// ── Root ─────────────────────────────────────────────────────────────────────
const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuPortal = DropdownMenuPrimitive.Portal

// ── Content ──────────────────────────────────────────────────────────────────
function DropdownMenuContent({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[160px] flex flex-col gap-0.5 p-1.5',
          'border border-neutral-800 dark:border-neutral-300',
          'bg-neutral-1000 dark:bg-neutral-200',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

// ── Item ─────────────────────────────────────────────────────────────────────
function DropdownMenuItem({
  className,
  inset,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        'relative flex items-center gap-2 px-2 py-1.5 text-sm font-mono cursor-pointer outline-none transition-colors select-none',
        'text-neutral-400 dark:text-neutral-1000',
        'hover:bg-neutral-900 dark:hover:bg-neutral-300 hover:text-neutral-100',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  )
}

// ── Separator ────────────────────────────────────────────────────────────────
function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn('my-1 h-px bg-neutral-800 dark:bg-neutral-300', className)}
      {...props}
    />
  )
}

// ── Label ────────────────────────────────────────────────────────────────────
function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        'px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-600',
        className,
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
}
