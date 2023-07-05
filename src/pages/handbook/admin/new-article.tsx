import type { NextPage } from 'next'

import PageTitle from '@components/atoms/PageTitle'
import PageLayout from '@components/templates/PageLayout'

import HandbookArticle from '@/components/organisms/HandbookArticleEditor'

const NewArticleView: NextPage = () => (
  <PageLayout pageTitle="Add New Article">
    <PageTitle>Add New Article</PageTitle>
    <HandbookArticle />
  </PageLayout>
)

export default NewArticleView
