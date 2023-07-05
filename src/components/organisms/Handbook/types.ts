import { Handbook as IHandbook } from '@prisma/client'

export interface IProps {
  articles: Article[]
}

export interface Article extends IHandbook {
  children: Article[]
}
