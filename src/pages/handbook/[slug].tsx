import { Container } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Custom404 from '../404'

import HandbookArticle from '@/components/molecules/HandbookArticle'
import HandbookSection from '@/components/molecules/HandbookSection'
import { useGetEntityById } from '@/utils/hooks/useEntity'

const ArticleView: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data, isLoading } = useGetEntityById('handbook', slug as string)
  if (isLoading)
    return (
      <Container>
        <HandbookSection.Skeleton />
        <HandbookSection.Skeleton />
        <HandbookSection.Skeleton />
      </Container>
    )

  if (!data) return <Custom404 />

  return (
    <HandbookArticle
      title={data.title}
      content={data.full_article_content}
      slug={slug}
    />
  )
}

export default ArticleView
