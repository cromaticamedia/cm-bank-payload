import * as React from 'react'
import { cn } from '@/utils/styles'

type CardProps = React.ComponentProps<'div'>

const Card = ({ className, children, ...props }: CardProps) => {
  // const Icon = icon ? (PhosphorIcons[icon] as React.ElementType) : null

  return (
    <div
      data-slot="card"
      className={cn(
        'flex flex-col items-start justify-between bg-neutral-200/20 transition-colors duration-200 ease-in-out',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-slot="card-header"
    className={cn('flex items-center justify-between px-6 pt-6 w-full', className)}
    {...props}
  />
)

const CardBody = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-slot="card-body"
    className={cn('flex flex-col gap-4 p-6 w-full', className)}
    {...props}
  />
)

const CardFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-slot="card-footer"
    className={cn('flex items-center justify-end gap-2 px-6 pb-6 w-full', className)}
    {...props}
  />
)

export { Card, CardHeader, CardBody, CardFooter }
