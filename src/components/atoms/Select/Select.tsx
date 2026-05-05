'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { CaretDown, CaretUp, Check } from '@phosphor-icons/react'
import Icon from '@/components/atoms/Icon'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils/styles'

// ─── Types ───────────────────────────────────────────────────────────────────

type SelectOption = {
  label: string
  value: string
  disabled?: boolean
}

type SelectGroup = {
  label: string
  options: SelectOption[]
}

type SelectProps = {
  name: string
  label?: string
  description?: string
  placeholder?: string
  options?: SelectOption[]
  groups?: SelectGroup[]
  disabled?: boolean
  className?: string
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const SelectTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) => (
  <SelectPrimitive.Trigger
    data-slot="select-trigger"
    className={cn(
      'border-input bg-background text-foreground placeholder:text-muted-foreground',
      'flex h-12 w-auto items-center justify-between border gap-3 px-3 py-3 text-md',
      'transition-colors outline-none',
      'focus:border-ring focus:ring-1 focus:ring-ring/50',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20',
      '[&>span]:line-clamp-1',
      className,
    )}
    {...props}
  >
    <Icon size={20} name="Translate" />
    {children}
    <SelectPrimitive.Icon asChild>
      <Icon size={14} name="CaretDown" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
)

const SelectContent = ({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      data-slot="select-content"
      position={position}
      className={cn(
        'bg-popover text-popover-foreground',
        'relative z-50 min-w-[8rem] overflow-hidden border',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1 w-[var(--radix-select-trigger-width)] max-h-[var(--radix-select-content-available-height)]',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1">
        <CaretUp size={12} />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1">
        <CaretDown size={12} />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
)

const SelectItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) => (
  <SelectPrimitive.Item
    data-slot="select-item"
    className={cn(
      'relative flex w-full cursor-default select-none items-center py-1.5 pr-8 pl-2 text-md outline-none',
      'text-foreground',
      'focus:bg-accent focus:text-accent-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check size={14} />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
)

const SelectLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) => (
  <SelectPrimitive.Label
    data-slot="select-label"
    className={cn('px-2 py-1.5 text-xs font-semibold text-muted-foreground', className)}
    {...props}
  />
)

const SelectSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) => (
  <SelectPrimitive.Separator
    data-slot="select-separator"
    className={cn('bg-border -mx-1 my-1 h-px', className)}
    {...props}
  />
)

// ─── Select ───────────────────────────────────────────────────────────────────

const Select = ({
  name,
  label,
  description,
  placeholder,
  options,
  groups,
  disabled,
  className,
  defaultValue,
  value,
  onValueChange,
}: SelectProps) => {
  const formContext = useFormContext()
  const isInForm = !!formContext

  const error = isInForm ? formContext.formState.errors[name] : undefined
  const fieldValue = isInForm ? formContext.watch(name) : value

  const handleChange = (val: string) => {
    if (isInForm) formContext.setValue(name, val, { shouldValidate: true })
    onValueChange?.(val)
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <label className="text-sm font-medium leading-none">{label}</label>}

      <SelectPrimitive.Root
        value={fieldValue ?? value}
        defaultValue={defaultValue}
        onValueChange={handleChange}
        disabled={disabled}
      >
        <SelectTrigger aria-invalid={!!error}>
          <SelectPrimitive.Value placeholder={placeholder ?? 'Select an option'} />
        </SelectTrigger>

        <SelectContent>
          {/* Flat options */}
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </SelectItem>
          ))}

          {/* Grouped options */}
          {groups?.map((group, i) => (
            <React.Fragment key={group.label}>
              {i > 0 && <SelectSeparator />}
              <SelectPrimitive.Group>
                <SelectLabel>{group.label}</SelectLabel>
                {group.options.map((option) => (
                  <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectPrimitive.Group>
            </React.Fragment>
          ))}
        </SelectContent>
      </SelectPrimitive.Root>

      {description && !error && <p className="text-muted-foreground text-xs">{description}</p>}
      {error && <p className="text-destructive text-xs">{error.message as string}</p>}
    </div>
  )
}

export { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectSeparator }
