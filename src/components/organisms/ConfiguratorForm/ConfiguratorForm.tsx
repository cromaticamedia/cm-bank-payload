'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { configuratorSchema, type ConfiguratorSchema } from './schema'
import { AVAILABLE_LOCALES } from '@/catalogs/locales'
import { TIER_DEFAULTS } from '@/catalogs/websites-tier-defaults'
import { generateProjectConfig } from './generate-config'
import Input from '@/components/atoms/Input'
import Switch from '@/components/atoms/Switch'
import RadioGroup from '@/components/atoms/RadioGroup/RadioGroup'
import CodeViewer from '@/components/molecules/CodeViewer'
import { Chip } from '@/components/atoms/Chip'
import { Button } from '@/components/atoms/Button'
import Typography from '@/components/atoms/Typography'

const SectionLabel = ({ text }: { text: string }) => (
  <Typography
    text={text}
    variant="span"
    className="text-primary-500 font-mono uppercase tracking-widest"
  />
)

const ConfiguratorForm = () => {
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

  const handleTierChange = (value: string) => {
    const defaults = TIER_DEFAULTS[value]
    if (!defaults) return
    Object.entries(defaults).forEach(([key, val]) => {
      setValue(key as keyof ConfiguratorSchema, val as never, { shouldValidate: false })
    })
  }

  const handleLocaleToggle = (code: string) => {
    const current = locales ?? []
    const next = current.includes(code as never)
      ? current.filter((l) => l !== code)
      : [...current, code as never]
    setValue('locales', next as never, { shouldValidate: true })
    const defaultLocale = methods.getValues('defaultLocale')
    if (!next.includes(defaultLocale as never) && next.length > 0) {
      setValue('defaultLocale', next[0] as never, { shouldValidate: true })
    }
  }

  const onSubmit = (data: ConfiguratorSchema) => {
    const config = generateProjectConfig(data)
    setGeneratedConfig(config)
  }

  const handleCopy = async () => {
    if (!generatedConfig) return
    await navigator.clipboard.writeText(generatedConfig)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* ── Form ─────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 flex-1">
          {/* Project */}
          <section className="flex flex-col gap-4">
            <SectionLabel text="Project" />
            <Input
              name="name"
              label="Project name"
              description="Only lowercase letters, numbers and hyphens. e.g: my-client-project"
              placeholder="my-client-project"
            />
            <RadioGroup
              name="tier"
              label="Tier"
              onValueChange={handleTierChange}
              options={[
                {
                  label: 'Launch',
                  value: 'launch',
                  description: '$400 — 1 route, 5 blocks, 1 language, no dark mode',
                },
                {
                  label: 'Growth',
                  value: 'growth',
                  description: '$800 — 5 routes, 25 blocks, 2 languages, dark mode, blog',
                },
                {
                  label: 'Scale',
                  value: 'scale',
                  description: '$1,200 — 10 routes, 40 blocks, 3+ languages, mega menu',
                },
              ]}
            />
          </section>

          {/* Languages */}
          <section className="flex flex-col gap-4">
            <SectionLabel text="Languages" />
            <div className="flex flex-col gap-2">
              <Typography text="Active locales" variant="label6" className="font-medium" />
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
              label="Default locale"
              description="The locale shown when no language prefix is in the URL"
              options={(locales ?? []).map((code) => ({
                label: AVAILABLE_LOCALES.find((l) => l.code === code)?.label ?? code,
                value: code,
              }))}
            />
          </section>

          {/* Theme */}
          <section className="flex flex-col gap-4">
            <SectionLabel text="Theme" />
            <Switch
              name="allowDarkMode"
              label="Dark mode"
              description="Allow users to toggle between light and dark mode"
            />
          </section>

          {/* Menus */}
          <section className="flex flex-col gap-4">
            <SectionLabel text="Menus" />
            <Switch
              name="isSinglePage"
              label="Single page"
              description="Site has only one route — no multi-page navigation needed"
            />
            <RadioGroup
              name="selectedNavigation"
              label="Navigation type"
              options={[
                {
                  label: 'Simple navigation',
                  value: 'nav-simple',
                  description: 'Standard navbar without dropdown menus',
                },
                {
                  label: 'Mega menu navigation',
                  value: 'nav-mega',
                  description: 'Supports dropdown menus and nested links — Scale only',
                },
              ]}
            />
            <RadioGroup
              name="selectedFooter"
              label="Footer type"
              options={[
                {
                  label: 'Simple footer',
                  value: 'footer-simple',
                  description: 'Compact footer with basic links',
                },
                {
                  label: 'Mega footer',
                  value: 'footer-mega',
                  description: 'Full footer with link groups and brand section — Scale only',
                },
              ]}
            />
          </section>

          {/* Collections */}
          <section className="flex flex-col gap-4">
            <SectionLabel text="Collections" />
            <Switch
              name="allowPostsCollection"
              label="Blog / Posts"
              description="Enable the Posts collection for blog support"
            />
            <Switch
              name="allowOurTeamCollection"
              label="Our Team"
              description="Enable the Our Team collection to showcase team members"
            />
          </section>

          {/* CRM */}
          <section className="flex flex-col gap-4">
            <SectionLabel text="CRM Connection" />
            <RadioGroup
              name="crmProvider"
              label="CRM Provider"
              options={[
                { label: 'None', value: 'none', description: 'No CRM integration' },
                {
                  label: 'Brevo',
                  value: 'brevo',
                  description: 'Connect form submissions to a Brevo list',
                },
                {
                  label: 'HubSpot',
                  value: 'hubspot',
                  description: 'Connect form submissions to a HubSpot form',
                },
              ]}
            />
            {crmProvider === 'brevo' && (
              <Input
                name="brevoListId"
                label="Brevo List ID"
                description="The ID of the Brevo list where contacts will be added"
                placeholder="12345"
                type="number"
              />
            )}
            {crmProvider === 'hubspot' && (
              <>
                <Input name="hubspotPortalId" label="HubSpot Portal ID" placeholder="12345678" />
                <Input
                  name="hubspotFormId"
                  label="HubSpot Form ID"
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                />
              </>
            )}
          </section>

          <Button
            type="submit"
            text="Generate config"
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
                text={copied ? 'Copied!' : 'Copy'}
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
