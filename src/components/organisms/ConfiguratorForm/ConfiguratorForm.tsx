'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useMemo, useCallback } from 'react'
import { configuratorSchema, type ConfiguratorSchema } from './schema'
import { AVAILABLE_LOCALES } from '@/catalogs/locales'
import { TIER_DEFAULTS } from '@/catalogs/websites-tier-defaults'
import { generateProjectConfig } from './generate-config'
import { useTranslations } from '@/hooks/useTranslations'
import Input from '@/components/atoms/Input'
import Switch from '@/components/atoms/Switch'
import RadioGroup from '@/components/atoms/RadioGroup/RadioGroup'
import CodeViewer from '@/components/molecules/CodeViewer'
import { Chip } from '@/components/atoms/Chip'
import { Button } from '@/components/atoms/Button'
import Typography from '@/components/atoms/Typography'
import translations from './translations.json'
import type { LocaleCode } from '@/config/locales'

interface ConfiguratorFormProps {
  locale: LocaleCode
}

const ConfiguratorForm = ({ locale }: ConfiguratorFormProps) => {
  const t = useTranslations(translations, locale)
  const [generatedConfig, setGeneratedConfig] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const methods = useForm<ConfiguratorSchema>({
    resolver: zodResolver(configuratorSchema),
    defaultValues: {
      name: '',
      tier: 'launch',
      locales: ['en'],
      defaultLocale: 'en',
      allowDarkMode: false,
      selectedNavigation: 'nav-simple',
      selectedFooter: 'footer-simple',
      allowPostsCollection: false,
      allowOurTeamCollection: false,
      isSinglePage: true,
      crmProvider: 'none',
    },
  })

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods

  const locales = watch('locales')
  const crmProvider = watch('crmProvider')

  const tierOptions = useMemo(
    () => [
      {
        label: t.project.tiers.launch.label,
        value: 'launch',
        description: t.project.tiers.launch.description,
        icon: 'RocketLaunchIcon' as const,
      },
      {
        label: t.project.tiers.growth.label,
        value: 'growth',
        description: t.project.tiers.growth.description,
        icon: 'TrendUpIcon' as const,
      },
      {
        label: t.project.tiers.scale.label,
        value: 'scale',
        description: t.project.tiers.scale.description,
        icon: 'ChartLineUpIcon' as const,
      },
    ],
    [t],
  )

  const navigationOptions = useMemo(
    () => [
      {
        label: t.menus.navigations.simple.label,
        value: 'nav-simple',
        description: t.menus.navigations.simple.description,
        icon: 'NavigationArrowIcon' as const,
      },
      {
        label: t.menus.navigations.mega.label,
        value: 'nav-mega',
        description: t.menus.navigations.mega.description,
        icon: 'SquaresFourIcon' as const,
      },
    ],
    [t],
  )

  const footerOptions = useMemo(
    () => [
      {
        label: t.menus.footers.simple.label,
        value: 'footer-simple',
        description: t.menus.footers.simple.description,
        icon: 'MinusIcon' as const,
      },
      {
        label: t.menus.footers.mega.label,
        value: 'footer-mega',
        description: t.menus.footers.mega.description,
        icon: 'RowsIcon' as const,
      },
    ],
    [t],
  )

  const crmOptions = useMemo(
    () => [
      {
        label: t.crm.providers.none.label,
        value: 'none',
        description: t.crm.providers.none.description,
        icon: 'ProhibitIcon' as const,
      },
      {
        label: t.crm.providers.brevo.label,
        value: 'brevo',
        description: t.crm.providers.brevo.description,
        icon: 'EnvelopeIcon' as const,
      },
      {
        label: t.crm.providers.hubspot.label,
        value: 'hubspot',
        description: t.crm.providers.hubspot.description,
        icon: 'GlobeStandIcon' as const,
      },
    ],
    [t],
  )

  const handleTierChange = useCallback(
    (value: string) => {
      const defaults = TIER_DEFAULTS[value]
      if (!defaults) return
      Object.entries(defaults).forEach(([key, val]) => {
        setValue(key as keyof ConfiguratorSchema, val as never, { shouldValidate: false })
      })
    },
    [setValue],
  )

  const handleLocaleToggle = useCallback(
    (code: string) => {
      const current = locales ?? []
      const next = current.includes(code as never)
        ? current.filter((l) => l !== code)
        : [...current, code as never]
      setValue('locales', next as never, { shouldValidate: true })
      const defaultLocale = methods.getValues('defaultLocale')
      if (!next.includes(defaultLocale as never) && next.length > 0) {
        setValue('defaultLocale', next[0] as never, { shouldValidate: true })
      }
    },
    [locales, setValue, methods],
  )

  const onSubmit = (data: ConfiguratorSchema) => {
    const config = generateProjectConfig(data)
    setGeneratedConfig(config)
  }

  const handleCopy = useCallback(async () => {
    if (!generatedConfig) return
    await navigator.clipboard.writeText(generatedConfig)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [generatedConfig])

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* ── Form ─────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 flex-1">
          {/* Project */}
          <section className="flex flex-col gap-4">
            <Typography
              text={t.sections.project}
              variant="span"
              className="text-primary-500 font-mono uppercase tracking-widest"
            />
            <Input
              name="name"
              icon="SuitcaseIcon"
              label={t.project.nameLabel}
              description={t.project.nameDescription}
              placeholder={t.project.namePlaceholder}
            />
            <RadioGroup
              name="tier"
              label={t.project.tierLabel}
              onValueChange={handleTierChange}
              options={tierOptions}
            />
          </section>

          {/* Languages */}
          <section className="flex flex-col gap-4">
            <Typography
              text={t.sections.languages}
              variant="span"
              className="text-primary-500 font-mono uppercase tracking-widest"
            />
            <div className="flex flex-col gap-2">
              <Typography
                text={t.languages.activeLocalesLabel}
                variant="label6"
                className="font-medium"
              />
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_LOCALES.map(({ code, label }) => {
                  const isActive = locales?.includes(code as never)
                  return (
                    <div
                      key={code}
                      onClick={() => handleLocaleToggle(code)}
                      className="cursor-pointer"
                    >
                      <Chip
                        label={label}
                        variant={isActive ? 'filled' : 'outlined'}
                        dismissible={isActive && (locales?.length ?? 0) > 1}
                        onDismiss={() => handleLocaleToggle(code)}
                      />
                    </div>
                  )
                })}
              </div>
              {errors.locales && (
                <Typography
                  text={errors.locales.message ?? ''}
                  variant="p"
                  className="text-destructive"
                />
              )}
            </div>
            <RadioGroup
              name="defaultLocale"
              label={t.languages.defaultLocaleLabel}
              description={t.languages.defaultLocaleDescription}
              options={(locales ?? []).map((code) => ({
                label: AVAILABLE_LOCALES.find((l) => l.code === code)?.label ?? code,
                icon: 'TranslateIcon',
                value: code,
              }))}
            />
          </section>

          {/* Theme */}
          <section className="flex flex-col gap-4">
            <Typography
              text={t.sections.theme}
              variant="span"
              className="text-primary-500 font-mono uppercase tracking-widest"
            />
            <Switch
              name="allowDarkMode"
              label={t.theme.darkModeLabel}
              description={t.theme.darkModeDescription}
            />
          </section>

          {/* Menus */}
          <section className="flex flex-col gap-4">
            <Typography
              text={t.sections.menus}
              variant="span"
              className="text-primary-500 font-mono uppercase tracking-widest"
            />
            <Switch
              name="isSinglePage"
              label={t.menus.singlePageLabel}
              description={t.menus.singlePageDescription}
            />
            <RadioGroup
              name="selectedNavigation"
              label={t.menus.navigationLabel}
              options={navigationOptions}
            />
            <RadioGroup name="selectedFooter" label={t.menus.footerLabel} options={footerOptions} />
          </section>

          {/* Collections */}
          <section className="flex flex-col gap-4">
            <Typography
              text={t.sections.collections}
              variant="span"
              className="text-primary-500 font-mono uppercase tracking-widest"
            />
            <Switch
              name="allowPostsCollection"
              label={t.collections.postsLabel}
              description={t.collections.postsDescription}
            />
            <Switch
              name="allowOurTeamCollection"
              label={t.collections.teamLabel}
              description={t.collections.teamDescription}
            />
          </section>

          {/* CRM */}
          <section className="flex flex-col gap-4">
            <Typography
              text={t.sections.crm}
              variant="span"
              className="text-primary-500 font-mono uppercase tracking-widest"
            />
            <RadioGroup name="crmProvider" label={t.crm.providerLabel} options={crmOptions} />
            {crmProvider === 'brevo' && (
              <Input
                name="brevoListId"
                label={t.crm.brevoListIdLabel}
                description={t.crm.brevoListIdDescription}
                placeholder={t.crm.brevoListIdPlaceholder}
                type="number"
              />
            )}
            {crmProvider === 'hubspot' && (
              <>
                <Input
                  name="hubspotPortalId"
                  label={t.crm.hubspotPortalIdLabel}
                  placeholder="12345678"
                />
                <Input
                  name="hubspotFormId"
                  label={t.crm.hubspotFormIdLabel}
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                />
              </>
            )}
          </section>

          <Button
            type="submit"
            text={t.output.generateButton}
            variant="primary"
            className="w-fit self-end"
            size="sm"
            icon="FileTs"
          />
        </form>

        {/* ── Output ───────────────────────────────────────────────── */}
        {generatedConfig && (
          <div className="flex flex-col gap-3 flex-1 lg:sticky lg:top-20 lg:self-start">
            <div className="flex items-center justify-between">
              <Typography
                text="project.config.ts"
                variant="span"
                className="text-primary-500 font-mono uppercase tracking-widest"
              />
              <Button
                text={copied ? t.output.copiedButton : t.output.copyButton}
                variant="outlined"
                icon={copied ? 'Check' : 'Copy'}
                onClick={handleCopy}
                size="sm"
              />
            </div>
            <CodeViewer code={generatedConfig} />
          </div>
        )}
      </div>
    </FormProvider>
  )
}

export default ConfiguratorForm
