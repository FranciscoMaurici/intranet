import React from 'react'

import { Container } from './styles'
import { Article, IProps } from './types'

import HandbookSection from '@/components/molecules/HandbookSection'

const Handbook = ({ articles }: IProps) => (
  <Container>{articles.map(article => printSectionElement(article))}</Container>
)

const printSectionElement = (article: Article) => {
  const { slug, title, homepage_text, children, level } = article

  return (
    <section key={slug} id={slug}>
      <HandbookSection
        title={title}
        content={homepage_text}
        titleVariant={level === 2 ? 'headingSmall' : 'headingRegular'}
      />
      {level < 2 && children.map(child => printSectionElement(child))}
    </section>
  )
}
export default Handbook
