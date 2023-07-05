import React, { useCallback, useEffect, useState } from 'react'
import { FaArrowRight, FaPencilAlt } from 'react-icons/fa'
import Link from 'next/link'

import { HandbookMenuContainer, SearchInput, StyledFaTrashAlt } from './styles'
import { IMenuProps, IProps } from './types'

import FragmentText from '@/components/atoms/FragmentText'
import { colors } from '@/theme'
import { Mutations } from '@/types'
import { DefaultActionPermission } from '@/types/enums/defaultActions'
import { DefaultUserModules } from '@/types/enums/defaultModules'
import { useAppMutation } from '@/utils/hooks/useAppMutation'
import usePermissions from '@/utils/hooks/usePermissions'

const HEADER_OFFSET = 90

const HandbookMenu = ({ articles = [] }: IProps) => {
  const [selectedArticle, setSelectedArticle] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState<Set<number>>(new Set([]))

  useEffect(() => {
    setTimeout(() => {
      scrollToElement()
    }, 1000)
  }, [])

  useEffect(() => {
    setSearchResult(
      searchValue?.length > 2 ? searchTree(articles, searchValue) : new Set([]),
    )
  }, [searchValue])

  const scrollToElement = () => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition =
          elementPosition + window.pageYOffset - HEADER_OFFSET

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
      setSelectedArticle(window.location.href.split('#')[1])
    }
  }

  const articleIncludesText = ({
    title,
    slug,
    full_article_content,
    homepage_text,
  }) =>
    searchValue
      .split(' ')
      .map(text => !!text && text.toLowerCase())
      .some(searchWord =>
        `${title}${slug}${full_article_content || ''}${homepage_text || ''}`
          .toLowerCase()
          .includes(searchWord),
      )

  const searchTree = (articles = [], searchText, results = []) => {
    articles.forEach(article => {
      const { level, parent_id, children, id } = article
      if (level === 0) {
        results.push(id)
      } else {
        if (articleIncludesText(article)) {
          if (parent_id) results.push(parent_id)
          results.push(id)
        }
      }
      if (level < 2) {
        searchTree(children, searchText, results)
      }
    })

    return new Set(results)
  }

  const renderFilteredArticles = useCallback(() => {
    const filteredArticles =
      searchResult.size > articles.length
        ? articles.filter(article => {
            const childIds = article.children.map(child => child.id)
            return childIds.some(id => searchResult.has(id))
          })
        : articles

    return filteredArticles.map(article => (
      <PrintMenuElement
        article={article}
        articles={articles}
        key={article.slug}
        scrollToElement={scrollToElement}
        selectedArticle={selectedArticle}
        searchResult={searchResult}
      />
    ))
  }, [articles, searchResult])

  return (
    <HandbookMenuContainer>
      <FragmentText variant="subHeadingSmall" color={colors.neutrals.x600}>
        Table of contents
      </FragmentText>
      <SearchInput
        placeholder="Search..."
        onChange={({ target: { value } }) => setSearchValue(value)}
      />
      <ul>{renderFilteredArticles()}</ul>
    </HandbookMenuContainer>
  )
}

const PrintMenuElement = ({
  article,
  articles,
  searchResult,
  scrollToElement,
  selectedArticle,
}: IMenuProps) => {
  const { userCan } = usePermissions()
  const { id, slug, title, level, children, menu_index, is_full_article } =
    article

  const handleClick = slug => {
    const urlWithoutSlug = window.location.href.split('#')[0]
    window.history.replaceState(null, '', urlWithoutSlug + `#${slug}`)
    scrollToElement()
  }
  const showElement =
    !searchResult ||
    searchResult.size <= articles.length ||
    searchResult.has(article.id)
  const deleteArticleMutation = useAppMutation(
    Mutations.DELETE_HANDBOOK_ARTICLE,
    { invisible: false },
    'handbook',
  )

  const handleArticleDelete = async () => {
    try {
      const ok = confirm(`Delete ${slug} article?`)
      if (!ok) return
      await deleteArticleMutation.mutateAsync({
        id,
      })
    } catch (err) {
      return err
    }
  }

  return (
    <React.Fragment key={slug}>
      {showElement && (
        <li>
          <div>
            <FragmentText
              onClick={() => handleClick(slug)}
              variant={level === 0 ? 'bodyXSmallBold' : 'bodyXSmall'}
              color={
                selectedArticle === slug
                  ? colors.brand.main.x500
                  : colors.neutrals.x600
              }
            >
              {menu_index} {title}
            </FragmentText>
            {is_full_article && (
              <>
                <Link href={`handbook/${slug}`}>
                  <FaArrowRight />
                </Link>
                {userCan(
                  DefaultActionPermission.UPDATE,
                  DefaultUserModules.HANDBOOK,
                ) && (
                  <Link href={`handbook/admin/edit/${slug}`}>
                    <FaPencilAlt />
                  </Link>
                )}
                {userCan(
                  DefaultActionPermission.DELETE,
                  DefaultUserModules.HANDBOOK,
                ) && <StyledFaTrashAlt onClick={handleArticleDelete} />}
              </>
            )}
          </div>
          {level < 2 && children.length > 0 && (
            <ul>
              {children.map(child => (
                <PrintMenuElement
                  article={child}
                  articles={articles}
                  key={child.slug}
                  scrollToElement={scrollToElement}
                  selectedArticle={selectedArticle}
                  searchResult={searchResult}
                />
              ))}
            </ul>
          )}
        </li>
      )}
    </React.Fragment>
  )
}

export default HandbookMenu
