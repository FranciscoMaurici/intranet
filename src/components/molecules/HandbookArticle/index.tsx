import React from 'react'
import { useRouter } from 'next/router'

import HandbookSection from '../HandbookSection'

import { HandbookArticleContainer } from './styles'
import { IProps } from './types'

import GoBack from '@/components/atoms/GoBack'

const HandbookArticle = ({ title, content, slug }: IProps) => {
  const router = useRouter()
  return (
    <HandbookArticleContainer>
      <GoBack onGoBack={() => router.push(`/handbook#${slug}`)} />

      <HandbookSection title={title} content={content} />
    </HandbookArticleContainer>
  )
}

export default HandbookArticle
