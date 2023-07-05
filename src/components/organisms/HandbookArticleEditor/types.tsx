import { Content } from '@tiptap/react'

import { Handbook as IHandbook } from '@prisma/client'

export interface Article extends IHandbook {
  children: Article[]
}

export interface IProps {
  article?: Article
}

export type Options = {
  id: number
  name: string
  value?: string | number
}

export type ArticleFormValues = {
  level: Options
  order: Options
  parentArticle: Options
  title: string
  articleType: Options
  useTitleOnHomepage: boolean
  slug: string
  homepageText: Content
  fullArticleContent: Content
  id?: number
}
