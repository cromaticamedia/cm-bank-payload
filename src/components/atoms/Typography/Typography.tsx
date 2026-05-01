import { cn } from '@/utils/styles'

//@Props
interface TypographyProps {
  text?: string
  isRawHtml?: boolean
  htmlTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p'
  className?: string
  variant?: 'label1' | 'label2' | 'label3' | 'label4' | 'label5' | 'label6' | 'span' | 'p'
  children?: React.ReactNode
}
const defaultTagMap: Record<string, TypographyProps['htmlTag']> = {
  label1: 'h1',
  label2: 'h2',
  label3: 'h3',
  label4: 'h4',
  label5: 'h5',
  label6: 'h6',
  p: 'p',
  span: 'span',
}

const Typography = ({
  text,
  className,
  isRawHtml = false,
  htmlTag,
  variant = 'p',
  children,
}: TypographyProps) => {
  if (!text) return null

  const Tag = htmlTag || defaultTagMap[variant] || 'p'
  const commonClass = 'w-fit'
  const variants = {
    label1: 'leading-10 md:leading-14 text-size-6 md:text-size-7 lg:text-size-8 lg:leading-16',
    label2: 'leading-12 text-size-6 lg:text-size-7',
    label3: 'leading-10 text-size-5 lg:text-size-6',
    label4: 'leading-8 text-size-4 lg:text-size-5',
    label5: 'leading-6 text-size-3 lg:text-size-4',
    label6: 'leading-5 text-size-2 lg:text-size-3',
    p: 'leading-5 text-size-1',
    span: 'leading-5 text-size-1',
  }

  const currentVariant = variants[variant] || variants.p

  if (isRawHtml) {
    return (
      <Tag
        className={cn(commonClass, currentVariant, className)}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    )
  }

  return (
    <Tag className={cn(commonClass, currentVariant, className)}>
      {text}
      {children}
    </Tag>
  )
}

export default Typography
