// src/components/atoms/Textarea/Textarea.tsx
import * as React from 'react'
import { useFormContext, type RegisterOptions } from 'react-hook-form'
import { cn } from '@/utils/styles'

type TextareaProps = React.ComponentProps<'textarea'> & {
  label?: string
  description?: string
  name: string
  rules?: RegisterOptions
}

const TextArea = ({ className, label, description, name, rules, id, ...props }: TextareaProps) => {
  const textareaId = id ?? name

  const formContext = useFormContext()
  const isInForm = !!formContext

  const registration = isInForm ? formContext.register(name, rules) : {}
  const error = isInForm ? formContext.formState.errors[name] : undefined

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        data-slot="textarea"
        aria-invalid={!!error}
        className={cn(
          'border-input bg-background text-foreground placeholder:text-muted-foreground',
          'flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm shadow-sm',
          'transition-colors outline-none resize-y',
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

export default TextArea
