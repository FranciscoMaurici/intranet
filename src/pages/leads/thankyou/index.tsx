import type { NextPage } from 'next'

import PageLayout from '@components/templates/PageLayout'

import LeadThankYouModal from '@/components/molecules/LeadThankYouModal'

const LeadsView: NextPage = () => (
  <PageLayout pageTitle="Leads">
    <LeadThankYouModal />
  </PageLayout>
)

export default LeadsView
