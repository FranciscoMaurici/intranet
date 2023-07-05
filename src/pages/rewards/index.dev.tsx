import type { NextPage } from 'next'

import { RewardsList } from '@components'
import PageLayout from '@components/templates/PageLayout'

const RewardsView: NextPage = () => (
  <PageLayout pageTitle="Rewards">
    <RewardsList />
  </PageLayout>
)

export default RewardsView
