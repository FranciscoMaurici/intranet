import type { NextPage } from 'next'

import TechInterviews from '@components/organisms/TechInterviews'
import PageLayout from '@components/templates/PageLayout'

const LearningPathsView: NextPage = () => (
  <PageLayout pageTitle="Tech Interviews">
    <TechInterviews />
  </PageLayout>
)

export default LearningPathsView
