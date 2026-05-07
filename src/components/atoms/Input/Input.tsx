import * as React from 'react'
import { useFormContext, type RegisterOptions } from 'react-hook-form'
import { cn } from '@/utils/styles'

type InputProps = React.ComponentProps<'input'> & {
  label?: string
  description?: string
  name: string
  rules?: RegisterOptions
}

const Input = ({ className, label, description, name, rules, id, ...props }: InputProps) => {
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
      <input
        id={inputId}
        data-slot="input"
        aria-invalid={!!error}
        className={cn(
          'border-input bg-neutral-400/20 dark:bg-neutral-200/20 text-foreground placeholder:text-muted-foreground',
          'flex h-9 w-full border px-3 py-1 text-sm',
          'transition-colors outline-none',
          'focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20',
          className,
        )}
        {...registration}
        {...props}
      />
      {description && !error && <p className="text-muted-foreground text-xs">{description}</p>}
      {error && <p className="text-destructive text-xs">{error.message as string}</p>}
    </div>
  )
}

export default Input
