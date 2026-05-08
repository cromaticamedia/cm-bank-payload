import * as React from 'react'
import { useFormContext, type RegisterOptions } from 'react-hook-form'
import { cn } from '@/utils/styles'
import type { Icon as PhosphorIconType } from '@phosphor-icons/react'
import Icon from '@/components/atoms/Icon'

type InputProps = React.ComponentProps<'input'> & {
  label?: string
  description?: string
  name: string
  rules?: RegisterOptions
  icon?: PhosphorIconType['name']
}

const Input = ({ className, label, description, name, rules, id, icon, ...props }: InputProps) => {
  const inputId = id ?? name

  const formContext = useFormContext()
  const isInForm = !!formContext

  const registration = isInForm ? formContext.register(name, rules) : {}
  const error = isInForm ? formContext.formState.errors[name] : undefined

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <Icon
            name={icon}
            size={15}
            className="absolute left-3 text-neutral-500 dark:text-neutral-600 pointer-events-none shrink-0"
          />
        )}
        <input
          id={inputId}
          data-slot="input"
          aria-invalid={!!error}
          className={cn(
            'border-input bg-neutral-1000 dark:bg-neutral-200/20 text-foreground placeholder:text-muted-foreground',
            'flex h-9 w-full border px-3 py-1 text-sm',
            'transition-colors outline-none',
            'focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20',
            icon && 'pl-8',
            className,
          )}
          {...registration}
          {...props}
        />
      </div>
      {description && !error && <p className="text-muted-foreground text-xs">{description}</p>}
      {error && <p className="text-destructive text-xs">{error.message as string}</p>}
    </div>
  )
}

export default Input
