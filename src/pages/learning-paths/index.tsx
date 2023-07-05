import type { NextPage } from 'next'

import PageTitle from '@components/atoms/PageTitle'
import PageLayout from '@components/templates/PageLayout'

import FragmentText from '@/components/atoms/FragmentText'
import LearningPaths from '@/components/organisms/LearningPaths'

const LearningPathsView: NextPage = () => (
  <PageLayout pageTitle="Learning Paths">
    <article>
      <header>
        <PageTitle>Learning Paths (draft)</PageTitle>
        <FragmentText>
          The Learning Paths project is a company effort to provide guided
          training for all the employees in Distillery, each Stack manager and
          Heads of Departments works hardly to define the main competencies that
          each employee should have based on their seniority level and stack.
          <br />
          <br />
          Based on the competencies identified, we curated learning resources
          such as courses, books, interactive resources and other materials that
          will let us achieve the different learning goals.
        </FragmentText>
      </header>
      <LearningPaths />
    </article>
  </PageLayout>
)

export default LearningPathsView
