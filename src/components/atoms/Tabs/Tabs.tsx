'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import * as PhosphorIcons from '@phosphor-icons/react'
import { cn } from '@/utils/styles'

type PhosphorIconName = keyof typeof PhosphorIcons

type TabItem = {
  value: string
  label: string
  icon?: PhosphorIconName
  disabled?: boolean
  content: React.ReactNode
}

const tabsListVariants = cva('inline-flex items-center', {
  variants: {
    variant: {
      default: 'h-9 rounded-lg bg-muted p-1 gap-1',
      underline: 'border-b border-border gap-0',
      pills: 'gap-2',
    },
  },
  defaultVariants: { variant: 'default' },
})

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center gap-1.5 text-sm font-medium whitespace-nowrap transition-all outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: [
          'rounded-md px-3 h-7 text-muted-foreground',
          'hover:text-foreground',
          'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        ],
        underline: [
          'px-4 h-9 text-muted-foreground rounded-none border-b-2 border-transparent -mb-px',
          'hover:text-foreground',
          'data-[state=active]:border-primary data-[state=active]:text-foreground',
        ],
        pills: [
          'rounded-full px-4 h-8 text-muted-foreground',
          'hover:bg-muted hover:text-foreground',
          'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
        ],
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

// ─── Sub-components ───────────────────────────────────────────────────────────

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>

const TabsList = ({ className, variant, ...props }: TabsListProps) => (
  <TabsPrimitive.List
    data-slot="tabs-list"
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
)

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants> & {
    icon?: PhosphorIconName
  }

const TabsTrigger = ({ className, variant, icon, children, ...props }: TabsTriggerProps) => {
  const Icon = icon ? (PhosphorIcons[icon] as React.ElementType) : null

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    >
      {Icon && <Icon size={14} className="shrink-0" />}
      {children}
    </TabsPrimitive.Trigger>
  )
}

type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content>

const TabsContent = ({ className, ...props }: TabsContentProps) => (
  <TabsPrimitive.Content
    data-slot="tabs-content"
    className={cn('mt-4 outline-none', className)}
    {...props}
  />
)

// ─── Tabs ────────────────────────────────────────────────────────────────────

type TabsProps = {
  items: TabItem[]
  defaultValue?: string
  variant?: VariantProps<typeof tabsListVariants>['variant']
  listClassName?: string
  contentClassName?: string
  className?: string
  onValueChange?: (value: string) => void
}

const Tabs = ({
  items,
  defaultValue,
  variant = 'default',
  listClassName,
  contentClassName,
  className,
  onValueChange,
}: TabsProps) => (
  <TabsPrimitive.Root
    data-slot="tabs"
    defaultValue={defaultValue ?? items[0]?.value}
    onValueChange={onValueChange}
    className={cn('w-full', className)}
  >
    <TabsList variant={variant} className={listClassName}>
      {items.map((item) => (
        <TabsTrigger
          key={item.value}
          value={item.value}
          variant={variant}
          icon={item.icon}
          disabled={item.disabled}
        >
          {item.label}
        </TabsTrigger>
      ))}
    </TabsList>

    {items.map((item) => (
      <TabsContent key={item.value} value={item.value} className={contentClassName}>
        {item.content}
      </TabsContent>
    ))}
  </TabsPrimitive.Root>
)

export { Tabs, TabsList, TabsTrigger, TabsContent }
