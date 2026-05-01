import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from '@phosphor-icons/react'
import * as PhosphorIcons from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/styles'

// ─── Variants ────────────────────────────────────────────────────────────────

const drawerVariants = cva(
  [
    'bg-card text-card-foreground fixed z-50 flex flex-col border shadow-lg',
    'transition ease-in-out',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:duration-300 data-[state=open]:duration-500',
  ],
  {
    variants: {
      side: {
        top: [
          'inset-x-0 top-0 border-b rounded-b-xl',
          'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        ],
        bottom: [
          'inset-x-0 bottom-0 border-t rounded-t-xl',
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        ],
        left: [
          'inset-y-0 left-0 h-full border-r',
          'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        ],
        right: [
          'inset-y-0 right-0 h-full border-l',
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
        ],
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        full: '',
      },
    },
    compoundVariants: [
      // Left / Right widths
      { side: 'left', size: 'sm', className: 'w-64' },
      { side: 'left', size: 'md', className: 'w-80' },
      { side: 'left', size: 'lg', className: 'w-96' },
      { side: 'left', size: 'full', className: 'w-full' },
      { side: 'right', size: 'sm', className: 'w-64' },
      { side: 'right', size: 'md', className: 'w-80' },
      { side: 'right', size: 'lg', className: 'w-96' },
      { side: 'right', size: 'full', className: 'w-full' },
      // Top / Bottom heights
      { side: 'top', size: 'sm', className: 'max-h-48' },
      { side: 'top', size: 'md', className: 'max-h-72' },
      { side: 'top', size: 'lg', className: 'max-h-96' },
      { side: 'top', size: 'full', className: 'max-h-screen' },
      { side: 'bottom', size: 'sm', className: 'max-h-48' },
      { side: 'bottom', size: 'md', className: 'max-h-72' },
      { side: 'bottom', size: 'lg', className: 'max-h-96' },
      { side: 'bottom', size: 'full', className: 'max-h-screen' },
    ],
    defaultVariants: {
      side: 'right',
      size: 'md',
    },
  },
)

// ─── Types ───────────────────────────────────────────────────────────────────

type PhosphorIconName = keyof typeof PhosphorIcons

type DrawerProps = VariantProps<typeof drawerVariants> & {
  open: boolean
  onOpenChange: (open: boolean) => void
  icon?: PhosphorIconName
  className?: string
  overlayClassName?: string
  children: React.ReactNode
  closeSide?: 'right' | 'left'
}

type DrawerSlotProps = React.ComponentProps<'div'>

// ─── Slots ────────────────────────────────────────────────────────────────────

const DrawerHeader = ({ className, ...props }: DrawerSlotProps) => (
  <div
    data-slot="drawer-header"
    className={cn('flex flex-col gap-1 px-6 pt-6 pb-2', className)}
    {...props}
  />
)

const DrawerBody = ({ className, ...props }: DrawerSlotProps) => (
  <div
    data-slot="drawer-body"
    className={cn('flex flex-col gap-4 p-6 flex-1 overflow-y-auto', className)}
    {...props}
  />
)

const DrawerFooter = ({ className, ...props }: DrawerSlotProps) => (
  <div
    data-slot="drawer-footer"
    className={cn(
      'flex items-center justify-end gap-2 px-6 pb-6 pt-2 border-t border-border',
      className,
    )}
    {...props}
  />
)

// ─── Drawer ───────────────────────────────────────────────────────────────────

const Drawer = ({
  open,
  onOpenChange,
  icon,
  side = 'right',
  size = 'md',
  className,
  overlayClassName,
  children,
  closeSide,
}: DrawerProps) => {
  const Icon = icon ? (PhosphorIcons[icon] as React.ElementType) : null

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            overlayClassName,
          )}
        />

        {/* Content */}
        <DialogPrimitive.Content className={cn(drawerVariants({ side, size }), className)}>
          {/* Accessible title — visually hidden, required by Radix for screen readers */}
          <DialogPrimitive.Title className="sr-only">Navigation menu</DialogPrimitive.Title>
          {/* Close button */}
          <DialogPrimitive.Close
            className={cn(
              'absolute top-4 rounded-sm opacity-70 transition-opacity',
              'hover:opacity-100 focus:outline-none disabled:pointer-events-none',
              closeSide === 'right' ? 'left-4' : 'right-4',
            )}
          >
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

export { Drawer, DrawerHeader, DrawerBody, DrawerFooter }
