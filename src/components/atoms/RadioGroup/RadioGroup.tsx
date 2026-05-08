'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils/styles'
import type { Icon as PhosphorIconType } from '@phosphor-icons/react'
import Icon from '@/components/atoms/Icon'

// ─── Types ───────────────────────────────────────────────────────────────────

type RadioOption = {
  label: string
  value: string
  description?: string
  disabled?: boolean
  icon?: PhosphorIconType['name']
}

type RadioGroupProps = {
  name: string
  label?: string
  description?: string
  options: RadioOption[]
  disabled?: boolean
  className?: string
  value?: string
  onValueChange?: (value: string) => void
}

// ─── RadioGroup ───────────────────────────────────────────────────────────────

const RadioGroup = ({
  name,
  label,
  description,
  options,
  disabled,
  className,
  value,
  onValueChange,
}: RadioGroupProps) => {
  const formContext = useFormContext()
  const isInForm = !!formContext

  const error = isInForm ? formContext.formState.errors[name] : undefined
  const fieldValue = isInForm ? formContext.watch(name) : value

  const handleChange = (val: string) => {
    if (isInForm) formContext.setValue(name, val, { shouldValidate: true })
    onValueChange?.(val)
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && <label className="text-sm font-medium leading-none">{label}</label>}
      {description && !error && <p className="text-muted-foreground text-xs">{description}</p>}

      <RadioGroupPrimitive.Root
        value={fieldValue ?? value}
        onValueChange={handleChange}
        disabled={disabled}
        className="flex flex-col gap-2"
      >
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={`${name}-${option.value}`}
            className={cn(
              'flex items-start gap-3 p-3 border cursor-pointer transition-colors',
              'border-neutral-800 dark:border-neutral-700/50',
              'hover:border-primary-500/50 hover:bg-neutral-800/50 dark:hover:bg-neutral-300/30',
              fieldValue === option.value && 'border-primary-500/70 bg-primary-500/5',
              option.disabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            <RadioGroupPrimitive.Item
              id={`${name}-${option.value}`}
              value={option.value}
              disabled={option.disabled}
              className={cn(
                'mt-0.5 size-4 shrink-0 rounded-full border-2 border-neutral-600',
                'transition-colors outline-none',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'data-[state=checked]:border-primary-500',
              )}
            >
              <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <div className="size-2 rounded-full bg-primary-500" />
              </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>

            <div className="flex flex-col gap-0.5 flex-1">
              <div className="flex items-center gap-1.5">
                {option.icon && (
                  <Icon
                    name={option.icon}
                    className="text-neutral-400 dark:text-neutral-600 shrink-0"
                    size={14}
                  />
                )}
                <span className="text-sm font-medium text-neutral-100 dark:text-neutral-1000">
                  {option.label}
                </span>
              </div>
              {option.description && (
                <span className="text-xs text-neutral-500 dark:text-neutral-600">
                  {option.description}
                </span>
              )}
            </div>
          </label>
        ))}
      </RadioGroupPrimitive.Root>

      {error && <p className="text-destructive text-xs">{error.message as string}</p>}
    </div>
  )
}

export default RadioGroup
