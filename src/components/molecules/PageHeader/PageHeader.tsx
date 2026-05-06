import Typography from '@/components/atoms/Typography'

interface PageHeaderProps {
  tagline: string
  title: string
  subtitle?: string
}

const PageHeader = ({ tagline, title, subtitle }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 pt-5">
      <span className="text-primary-500 text-xs font-mono uppercase tracking-widest">
        {tagline}
      </span>
      <Typography
        text={title}
        variant="label2"
        htmlTag="h1"
        className="font-primary text-neutral-100 dark:text-neutral-1000"
      />
      {subtitle && (
        <Typography
          text={subtitle}
          variant="label6"
          htmlTag="p"
          className="text-neutral-600 dark:text-neutral-800"
        />
      )}
    </div>
  )
}

export default PageHeader
