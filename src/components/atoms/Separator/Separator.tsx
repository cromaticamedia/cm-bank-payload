import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/styles'

const separatorVariants = cva('shrink-0 rounded-lg', {
  variants: {
    variant: {
      primary: 'bg-neutral-900 dark:bg-neutral-300',
      secondary: 'bg-border',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

type SeparatorVariants = VariantProps<typeof separatorVariants>['variant']

type Props = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants>

const Separator = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  variant,
  ...props
}: Props) => (
  <SeparatorPrimitive.Root
    decorative={decorative}
    orientation={orientation}
    className={cn(
      separatorVariants({ variant }),
      orientation === 'horizontal' ? 'h-0.5 w-full' : 'h-full w-px',
      className,
    )}
    {...props}
  />
)

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator, type SeparatorVariants }
