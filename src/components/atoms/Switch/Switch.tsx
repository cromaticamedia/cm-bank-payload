'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cva, type VariantProps } from 'class-variance-authority'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils/styles'

// ─── Variants ────────────────────────────────────────────────────────────────

const switchVariants = cva(
  [
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
    'transition-colors outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary/90 data-[state=unchecked]:bg-input',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-7',
        md: 'h-5 w-9',
        lg: 'h-6 w-11',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

const thumbVariants = cva(
  ['pointer-events-none block rounded-full bg-white', 'transition-transform'],
  {
    variants: {
      size: {
        sm: 'size-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0',
        md: 'size-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        lg: 'size-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

// ─── Types ───────────────────────────────────────────────────────────────────

type SwitchProps = VariantProps<typeof switchVariants> & {
  name: string
  label?: string
  description?: string
  disabled?: boolean
  className?: string
  defaultChecked?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

// ─── Switch ──────────────────────────────────────────────────────────────────

const Switch = ({
  name,
  label,
  description,
  disabled,
  size = 'md',
  className,
  defaultChecked,
  checked,
  onCheckedChange,
}: SwitchProps) => {
  const formContext = useFormContext()
  const isInForm = !!formContext

  const error = isInForm ? formContext.formState.errors[name] : undefined
  const fieldValue = isInForm ? formContext.watch(name) : checked

  const handleChange = (val: boolean) => {
    if (isInForm) formContext.setValue(name, val, { shouldValidate: true })
    onCheckedChange?.(val)
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center justify-between gap-4">
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={name}
                className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
            {description && <p className="text-muted-foreground text-xs">{description}</p>}
          </div>
        )}

        <SwitchPrimitive.Root
          id={name}
          data-slot="switch"
          checked={fieldValue ?? checked}
          defaultChecked={defaultChecked}
          onCheckedChange={handleChange}
          disabled={disabled}
          aria-invalid={!!error}
          className={cn(switchVariants({ size }))}
        >
          <SwitchPrimitive.Thumb className={cn(thumbVariants({ size }))} />
        </SwitchPrimitive.Root>
      </div>

      {error && <p className="text-destructive text-xs">{error.message as string}</p>}
    </div>
  )
}

export default Switch
