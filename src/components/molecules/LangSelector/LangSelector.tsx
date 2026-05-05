'use client'

import { usePathname, useRouter } from 'next/navigation'
import { type LocaleCode, locales } from '@/config/locales'
import Typography from '@/components/atoms/Typography'
import Switch from '@/components/atoms/Switch'
import { Select } from '@/components/atoms/Select'

interface LangSelectorProps {
  locale: LocaleCode
}

const LangSelector = ({ locale }: LangSelectorProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const buildPath = (newLocale: LocaleCode) => {
    const rest = pathname.slice(locale.length + 1)
    return `/${newLocale}${rest}`
  }

  const handleChange = (newLocale: LocaleCode) => {
    if (newLocale === locale) return
    router.push(buildPath(newLocale))
  }

  // 2 locales → toggle
  if (locales.length === 2) {
    const other = locales.find((l) => l.code !== locale)!
    const isSwitchChecked: boolean = locale === locales[1].code
    return (
      <section className="flex items-center gap-2 h-fit">
        <Typography className="uppercase font-semibold" text={locales[0].code} variant="label5" />
        <Switch
          name="LangSelector"
          size="lg"
          onCheckedChange={() => handleChange(other.code as any)}
          defaultChecked={isSwitchChecked}
        />
        <Typography className="uppercase font-semibold" text={locales[1].code} variant="label5" />
      </section>
    )
  }

  // 3+ locales → select
  if (locales.length > 2) {
    return (
      <Select
        name="LangSelector"
        value={locale}
        onValueChange={(val) => handleChange(val as LocaleCode)}
        options={locales.map((l) => ({ label: l.label, value: l.code }))}
      />
    )
  }
  return null
}

export default LangSelector
