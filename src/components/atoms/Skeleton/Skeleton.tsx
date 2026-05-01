import { cn } from '@/utils/styles'

type SkeletonProps = React.ComponentProps<'div'> & {
  variant?: 'default' | 'circle' | 'text'
  lines?: number // solo para variant="text"
}

const Skeleton = ({ variant = 'default', lines = 1, className, ...props }: SkeletonProps) => {
  if (variant === 'text') {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-4 animate-pulse rounded-md bg-muted',
              i === lines - 1 && lines > 1 && 'w-3/4', // última línea más corta
              className,
            )}
            {...props}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      data-slot="skeleton"
      className={cn(
        'animate-pulse bg-muted',
        variant === 'circle' ? 'rounded-full' : 'rounded-md',
        className,
      )}
      {...props}
    />
  )
}

export default Skeleton
