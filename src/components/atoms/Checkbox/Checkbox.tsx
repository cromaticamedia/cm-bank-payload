'use client'
import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from '@phosphor-icons/react'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils/styles'

// ─── Types ───────────────────────────────────────────────────────────────────

type CheckboxProps = {
  name: string
  label?: React.ReactNode
  description?: string
  disabled?: boolean
  indeterminate?: boolean
  className?: string
  defaultChecked?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

// ─── Checkbox ────────────────────────────────────────────────────────────────

const Checkbox = ({
  name,
  label,
  description,
  disabled,
  indeterminate,
  className,
  defaultChecked,
  checked,
  onCheckedChange,
}: CheckboxProps) => {
  const formContext = useFormContext()
  const isInForm = !!formContext

  const error = isInForm ? formContext.formState.errors[name] : undefined
  const fieldValue = isInForm ? formContext.watch(name) : checked

  const handleChange = (val: CheckboxPrimitive.CheckedState) => {
    const boolVal = val === true
    if (isInForm) formContext.setValue(name, boolVal, { shouldValidate: true })
    onCheckedChange?.(boolVal)
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-start gap-2.5">
        <CheckboxPrimitive.Root
          id={name}
          data-slot="checkbox"
          checked={indeterminate ? 'indeterminate' : (fieldValue ?? checked)}
          defaultChecked={defaultChecked}
          onCheckedChange={handleChange}
          disabled={disabled}
          aria-invalid={!!error}
          className={cn(
            'peer size-4 shrink-0 rounded-sm border border-input shadow-sm',
            'transition-colors outline-none mt-0.5',
            'focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
            'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary',
            'aria-invalid:border-destructive',
          )}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center">
            {indeterminate ? <Minus size={12} weight="bold" /> : <Check size={12} weight="bold" />}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

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
      </div>

      {error && <p className="text-destructive text-xs">{error.message as string}</p>}
    </div>
  )
}

// ─── Checkbox Group ───────────────────────────────────────────────────────────

type CheckboxOption = {
  label: string
  value: string
  description?: string
  disabled?: boolean
}

type CheckboxGroupProps = {
  name: string
  label?: string
  options: CheckboxOption[]
  description?: string
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

const CheckboxGroup = ({
  name,
  label,
  options,
  description,
  orientation = 'vertical',
  className,
}: CheckboxGroupProps) => {
  const formContext = useFormContext()
  const isInForm = !!formContext

  const error = isInForm ? formContext.formState.errors[name] : undefined
  const values: string[] = isInForm ? (formContext.watch(name) ?? []) : []

  const handleChange = (value: string, checked: boolean) => {
    if (!isInForm) return
    const current: string[] = formContext.getValues(name) ?? []
    const updated = checked ? [...current, value] : current.filter((v) => v !== value)
    formContext.setValue(name, updated, { shouldValidate: true })
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && <p className="text-sm font-medium leading-none">{label}</p>}

      <div
        className={cn('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap')}
      >
        {options.map((option) => (
          <Checkbox
            key={option.value}
            name={`${name}-${option.value}`}
            label={option.label}
            description={option.description}
            disabled={option.disabled}
            checked={values.includes(option.value)}
            onCheckedChange={(checked) => handleChange(option.value, checked)}
          />
        ))}
      </div>

      {description && !error && <p className="text-muted-foreground text-xs">{description}</p>}
      {error && <p className="text-destructive text-xs">{error.message as string}</p>}
    </div>
  )
}

export { Checkbox, CheckboxGroup }
