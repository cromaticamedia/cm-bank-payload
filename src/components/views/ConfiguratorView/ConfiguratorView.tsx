import LayoutContainer from '@/components/atoms/LayoutContainer'
import PageHeader from '@/components/molecules/PageHeader'
import ConfiguratorForm from '@/components/organism/ConfiguratorForm'

const ConfiguratorView = () => {
  return (
    <main className="w-full">
      <LayoutContainer className="flex-col gap-10">
        <PageHeader
          tagline="Block Bank"
          title="Project Configurator"
          subtitle="Generate a project.config.ts file ready to paste into your cm-template-website."
        />
        <ConfiguratorForm />
      </LayoutContainer>
    </main>
  )
}

export default ConfiguratorView
