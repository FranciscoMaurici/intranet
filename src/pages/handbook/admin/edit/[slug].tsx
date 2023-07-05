import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import PageTitle from '@/components/atoms/PageTitle'
import HandbookArticleEditor, {
  HandbookArticleEditorSkeleton,
} from '@/components/organisms/HandbookArticleEditor'
import PageLayout from '@/components/templates/PageLayout'
import Custom404 from '@/pages/404'
import { useGetEntityById } from '@/utils/hooks/useEntity'

const ArticleView: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data, isLoading } = useGetEntityById('handbook', slug as string)

  if (isLoading) return <HandbookArticleEditorSkeleton />

  if (!data) return <Custom404 />
  return (
    data && (
      <PageLayout pageTitle="Edit Article">
        <PageTitle>Edit Article</PageTitle>
        <HandbookArticleEditor article={data} />
      </PageLayout>
    )
  )
}

export default ArticleView
