'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/utils/styles'

type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'

type Props = {
  name: string
  size?: number
  weight?: IconWeight
  className?: string
}

const Icon = ({ name, size, weight = 'regular', className }: Props) => {
  const [IconComponent, setIconComponent] = useState<React.ElementType | null>(null)

  useEffect(() => {
    import('@phosphor-icons/react').then((mod) => {
      const component = (mod as any)[name]
      if (component) setIconComponent(() => component)
    })
  }, [name])

  const commonClass = 'w-fit'

  if (!IconComponent) {
    return <span className={cn(commonClass, className)} style={{ width: size, height: size }} />
  }

  return <IconComponent size={size} weight={weight} className={cn(commonClass, className)} />
}

export default Icon
