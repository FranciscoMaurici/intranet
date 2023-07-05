import { ArticleFormValues, Options } from './types'

export const emptyValue: Options = { id: 0, name: '' }
export const defaultArticle: ArticleFormValues = {
  level: emptyValue,
  order: emptyValue,
  parentArticle: emptyValue,
  title: '',
  articleType: { id: 1, name: 'Homepage only' },
  useTitleOnHomepage: false,
  slug: '',
  homepageText: null,
  fullArticleContent: null,
}

export const articleTypes: Options[] = [
  { id: 1, name: 'Homepage only' },
  { id: 2, name: 'Full article' },
]

export const levels: Options[] = [
  { id: 1, name: '1', value: 0 },
  { id: 2, name: '2', value: 1 },
  { id: 3, name: '3', value: 2 },
]

export const beginningOrderOption = {
  id: 1,
  name: 'At the beginning',
  value: 1,
}
