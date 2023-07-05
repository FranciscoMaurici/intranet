import type { NextPage } from 'next'

import { Dashboard } from '@components'
import PageLayout from '@components/templates/PageLayout'

const IndexPage: NextPage = () => (
  <PageLayout pageTitle="Dashboard">
    <Dashboard />
  </PageLayout>
)

export default IndexPage
