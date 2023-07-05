import { JSONContent } from '@tiptap/react'

import {
  articleTypes,
  beginningOrderOption,
  defaultArticle,
  levels,
} from './constants'
import { Article, ArticleFormValues } from './types'

import {
  editorContentToHTML,
  htmlToEditorContent,
} from '@/components/molecules/FragmentEditor/utils'

export const formatParentArticleOption = ({
  id,
  menu_index,
  title,
}: Article) => ({
  id,
  name: `${menu_index}. ${title}`,
})

export const formatOrderOption = (
  { id, menu_index, title, order }: Article,
  article,
) => {
  const label = `"${menu_index}. ${title}"`
  const prefix = article ? 'Replace' : 'After'

  return {
    id,
    name:
      article?.menu_index === menu_index
        ? `Leave original order: ${label}`
        : `${prefix} ${label}`,
    value: article ? order : order + 1,
  }
}

// reduces array into an object, allowing a parent article's children to be found by their parent_id
export const orderReducer = (
  accumulator,
  { id, children }: Article,
  article,
) => {
  const mappedChildren = children.map(child =>
    formatOrderOption(child, article),
  )
  if (!article || !children?.length) {
    mappedChildren.unshift(beginningOrderOption)
  }

  return {
    ...accumulator,
    [id]: mappedChildren,
  }
}

export const formatToFormArticle = (
  {
    id,
    title,
    slug,
    parent_id,
    level,
    is_full_article,
    use_title_on_homepage,
    homepage_text,
    full_article_content,
  },
  orderOptionsByLevel,
  parentArticleOptionsByLevel,
): ArticleFormValues => {
  const orderOption =
    level === 0
      ? orderOptionsByLevel[0].find(option => option.id === id)
      : orderOptionsByLevel[level][parent_id].find(option => option.id === id)

  const parentArticleOption = parent_id
    ? parentArticleOptionsByLevel[level].find(({ id }) => id === parent_id)
    : defaultArticle.parentArticle

  return {
    id,
    title,
    slug,
    parentArticle: parentArticleOption,
    level: levels[level],
    order: orderOption,
    articleType: is_full_article ? articleTypes[1] : articleTypes[0],
    useTitleOnHomepage: use_title_on_homepage,
    homepageText: homepage_text ? htmlToEditorContent(homepage_text) : null,
    fullArticleContent: full_article_content
      ? htmlToEditorContent(full_article_content)
      : null,
  }
}

export const formatToDatabaseArticle = ({
  parentArticle,
  level,
  order,
  articleType,
  useTitleOnHomepage,
  homepageText,
  fullArticleContent,
  ...article
}: ArticleFormValues) => ({
  ...article,
  parent_id: parentArticle?.id || null,
  level: level.value,
  order: order.value,
  is_full_article: articleType.name === 'Full article',
  use_title_on_homepage: useTitleOnHomepage,
  homepage_text: homepageText
    ? editorContentToHTML(homepageText as JSONContent)
    : null,
  full_article_content: fullArticleContent
    ? editorContentToHTML(fullArticleContent as JSONContent)
    : null,
})
