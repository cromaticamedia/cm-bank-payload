import { cn } from '@/utils/styles'
import { layoutWidth } from '@/config/theme'

interface LayoutContainerProps {
  children: React.ReactNode
  className?: string
}

// LayoutContainer.tsx
const LayoutContainer = ({ children, className }: LayoutContainerProps) => {
  const commmonClasses = 'relative mx-auto flex p-3 lg:p-5'
  return <section className={cn(layoutWidth, commmonClasses, className)}>{children}</section>
}

export default LayoutContainer
