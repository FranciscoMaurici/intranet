import type { NextPage } from 'next'

import PageLayout from '@components/templates/PageLayout'

import Configuration from '@/components/organisms/Configuration'

const ConfigurationView: NextPage = () => (
  <PageLayout pageTitle="Configuration">
    <Configuration />
  </PageLayout>
)

export default ConfigurationView
