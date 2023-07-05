import type { NextPage } from 'next'

import PageLayout from '@components/templates/PageLayout'

import Leads from '@/components/organisms/Leads'

const LeadsView: NextPage = () => (
  <PageLayout pageTitle="Leads">
    <Leads />
  </PageLayout>
)

export default LeadsView
