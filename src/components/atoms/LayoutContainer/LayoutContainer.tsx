import { cn } from '@/utils/styles'

interface LayoutContainerProps {
  children: React.ReactNode
  className?: string
}

const LayoutContainer = ({ children, className }: LayoutContainerProps) => {
  const commmonClasses = 'relative mx-auto flex p-3 lg:p-5'
  const layoutWidth = 'w-[95%] md:w-9/10 max-w-layout-xl'
  return <section className={cn(layoutWidth, commmonClasses, className)}>{children}</section>
}

export default LayoutContainer
