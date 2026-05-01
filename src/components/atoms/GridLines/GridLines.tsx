import { cn } from '@/utils/styles'
import { layoutWidth } from '@/config/theme'

type GridLinesProps = {
  className?: string
  children: React.ReactNode
}

export default function GridLines({ className, children }: GridLinesProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <div
        className="absolute inset-0 pointer-events-none z-20 flex justify-center"
        aria-hidden="true"
      >
        <div className={cn('relative h-full', layoutWidth)}>
          <div className="absolute inset-y-0 left-0 w-0.5 bg-neutral-900 dark:bg-neutral-300" />
          <div className="absolute inset-y-0 right-0 w-0.5 bg-neutral-900 dark:bg-neutral-300" />
        </div>
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">{children}</div>
    </div>
  )
}
