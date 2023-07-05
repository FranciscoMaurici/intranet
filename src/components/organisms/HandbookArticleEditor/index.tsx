import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'

import {
  articleTypes,
  beginningOrderOption,
  defaultArticle,
  emptyValue,
  levels,
} from './constants'
import { HandbookArticleEditorLayout, SlugGrid, StyledButton } from './styles'
import { ArticleFormValues, IProps } from './types'
import {
  formatOrderOption,
  formatParentArticleOption,
  formatToDatabaseArticle,
  formatToFormArticle,
  orderReducer,
} from './utils'

import FragmentCheckbox from '@/components/atoms/FragmentCheckbox'
import FragmentText from '@/components/atoms/FragmentText'
import FragmentAutocomplete from '@/components/molecules/FragmentAutocomplete'
import FragmentEditor from '@/components/molecules/FragmentEditor'
import FragmentInput from '@/components/molecules/FragmentInput'
import { IHandbookPostPutRequest, Mutations } from '@/types'
import { useAppMutation } from '@/utils/hooks/useAppMutation'
import { useGetEntity } from '@/utils/hooks/useEntity'
import { useOnLeavePageConfirmation } from '@/utils/hooks/usePreventNavigation'
import { isValidSlug, requiredMessage } from '@/utils/validations'

export const HandbookArticleEditorSkeleton = () => (
  <Stack spacing={2}>
    <Skeleton height={48} width="60%" variant="rectangular" />
    <Skeleton height={48} width="60%" variant="rectangular" />
    <Skeleton height={48} variant="rectangular" />
    <Skeleton height={240} variant="rectangular" />
    <Skeleton height={48} width="50%" variant="rectangular" />
  </Stack>
)

const HandbookArticleEditor = ({ article }: IProps) => {
  const {
    watch,
    control,
    trigger,
    setValue,
    getValues,
    reset,
    formState: { isDirty, isValid },
  } = useForm<ArticleFormValues>({
    mode: 'onChange',
    defaultValues: defaultArticle,
  })

  const selectedLevel = watch('level').value
  const isNotLevelOne = selectedLevel !== undefined && !(selectedLevel === 0)
  const isHomepageOnly = watch('articleType').name === 'Homepage only'

  const { isLoading, data: levelOneArticles } = useGetEntity('handbook')

  const levelTwoArticles = useMemo(
    () => levelOneArticles?.flatMap(a => a.children),
    [levelOneArticles],
  )

  const selectedParentArticle = watch('parentArticle')
  const isOrderEnabled =
    selectedLevel === 0 || (isNotLevelOne && selectedParentArticle.name)
  const [orderOptions, setOrderOptions] = useState([beginningOrderOption])

  const orderOptionsByLevel = useMemo(() => {
    const options = {
      0: [
        ...(levelOneArticles?.map(levelOneArticle =>
          formatOrderOption(levelOneArticle, article),
        ) || []),
      ],
      1: levelOneArticles?.reduce(
        (accumulator, value) => orderReducer(accumulator, value, article),
        {},
      ),
      2: levelTwoArticles?.reduce(
        (accumulator, value) => orderReducer(accumulator, value, article),
        {},
      ),
    }

    if (!article) options[0].unshift(beginningOrderOption)

    return options
  }, [levelOneArticles, levelTwoArticles, article])

  const parentArticleOptionsByLevel = useMemo(
    () => ({
      1: levelOneArticles?.map(formatParentArticleOption),
      2: levelTwoArticles?.map(formatParentArticleOption),
    }),
    [levelOneArticles, levelTwoArticles, article],
  )

  useEffect(() => {
    if (!isLoading && article) {
      setCurrentOptions({
        level: article.level,
        parentId: article.parent_id,
      })

      reset(
        formatToFormArticle(
          article,
          orderOptionsByLevel,
          parentArticleOptionsByLevel,
        ),
      )
    }
  }, [isLoading, article])

  useOnLeavePageConfirmation({ preventNavigation: isDirty })

  const setCurrentOptions = ({ level, parentId }) => {
    const currentOptions =
      level === 0
        ? orderOptionsByLevel[0]
        : orderOptionsByLevel[level][parentId]

    setOrderOptions(currentOptions)
  }

  const handleLevelChange = ({ value }) => {
    if (value === 0) {
      setOrderOptions(orderOptionsByLevel[0])
    }

    setValue('order', emptyValue)
    setValue('parentArticle', emptyValue)
  }

  const handleParentArticleChange = ({ id }) => {
    setCurrentOptions({ level: selectedLevel, parentId: id })
    setValue('order', emptyValue)
  }

  const createArticleMutation = useAppMutation(
    Mutations.CREATE_HANDBOOK_ARTICLE,
    { invisible: false },
    'handbook',
  )
  const updateArticleMutation = useAppMutation(
    Mutations.UPDATE_HANDBOOK_ARTICLE,
    { invisible: false },
    `handbook/${article?.slug}`,
  )

  const router = useRouter()
  const handleSubmit = (e: React.SyntheticEvent) => {
    trigger()
    e.preventDefault()

    if (!isValid) return

    if (selectedLevel === 0) {
      setValue('parentArticle', null)
      setValue('articleType', defaultArticle.articleType)
      setValue('fullArticleContent', null)
      setValue('useTitleOnHomepage', false)
    }

    if (isHomepageOnly) {
      setValue('fullArticleContent', null)
    }

    const formattedArticle = formatToDatabaseArticle(getValues())

    const postSubmitRedirectRoute = formattedArticle.is_full_article
      ? `/handbook/${formattedArticle.slug}`
      : `/handbook#${formattedArticle.slug}`

    if (article) {
      updateArticleMutation
        .mutateAsync({
          id: article.id,
          ...formattedArticle,
        } as IHandbookPostPutRequest) // TODO: Get rid of casting
        .then(() => {
          // TODO: Update react-query methods so that both handbook and handbook/slug are invalidated, then remove the reload
          router.push(postSubmitRedirectRoute).then(() => router.reload())
        })
        .catch(err => err)
    } else {
      createArticleMutation
        .mutateAsync(formattedArticle as IHandbookPostPutRequest)
        .then(() => {
          router.push(postSubmitRedirectRoute)
        })
        .catch(err => err)
    }
  }

  if (isLoading) return <HandbookArticleEditorSkeleton />

  return (
    <HandbookArticleEditorLayout
      id="article-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <FragmentAutocomplete
            control={control}
            name="level"
            label="Level"
            options={levels}
            emptyOption={emptyValue}
            rules={requiredMessage('Level')}
            variant="filled"
            required
            onChange={handleLevelChange}
            autocompleteProps={{
              fullWidth: true,
              size: 'small',
              disableClearable: true,
              disabled: !!article,
            }}
          />
        </Grid>
        {isNotLevelOne && (
          <Grid item xs={6}>
            <FragmentAutocomplete
              control={control}
              name="parentArticle"
              label="Parent article"
              options={parentArticleOptionsByLevel[selectedLevel]}
              emptyOption={emptyValue}
              rules={requiredMessage('Parent article')}
              variant="filled"
              required
              onChange={handleParentArticleChange}
              autocompleteProps={{
                fullWidth: true,
                size: 'small',
                disableClearable: true,
                disabled: !!article,
              }}
            />
          </Grid>
        )}
        <Grid item xs={isNotLevelOne ? 8 : 6}>
          <FragmentAutocomplete
            key={article?.id || 0}
            control={control}
            name="order"
            label="Order"
            options={orderOptions}
            emptyOption={emptyValue}
            rules={requiredMessage('Order')}
            variant="filled"
            required
            autocompleteProps={{
              fullWidth: true,
              size: 'small',
              disableClearable: true,
              disabled: !isOrderEnabled,
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <FragmentInput
            control={control}
            size="small"
            name="title"
            label="Title"
            rules={requiredMessage('Title')}
            variant="filled"
            required
          />
        </Grid>

        {isNotLevelOne && (
          <>
            <Grid item xs={4}>
              <FragmentAutocomplete
                control={control}
                name="articleType"
                label="Article type"
                options={articleTypes}
                emptyOption={emptyValue}
                rules={requiredMessage('Article type')}
                variant="filled"
                required
                autocompleteProps={{
                  size: 'small',
                  disableClearable: true,
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <FragmentCheckbox
                control={control}
                name="useTitleOnHomepage"
                label="Use title on the homepage"
              />
            </Grid>
          </>
        )}
        <SlugGrid item xs={12}>
          <FragmentInput
            control={control}
            size="small"
            name="slug"
            label="Slug"
            rules={{
              validate: (slug: string) => isValidSlug(slug),
            }}
            variant="filled"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  https://intranet.distillery.com/handbook/
                  {isHomepageOnly && isNotLevelOne && '#'}
                </InputAdornment>
              ),
            }}
          />
        </SlugGrid>
        <Grid id="homepage-container" item xs={12}>
          <FragmentText variant="bodyXSmall">Homepage text</FragmentText>
          <FragmentEditor control={control} name="homepageText" editable />
        </Grid>

        {!isHomepageOnly && isNotLevelOne && (
          <Grid id="full-article-container" item xs={12}>
            <FragmentText variant="bodyXSmall">
              Full article content
            </FragmentText>
            <FragmentEditor
              control={control}
              name="fullArticleContent"
              editable
            />
          </Grid>
        )}

        <Grid item xs={6}>
          <StyledButton color="primary" type="submit" disabled={!isDirty}>
            Publish
          </StyledButton>
        </Grid>
      </Grid>
    </HandbookArticleEditorLayout>
  )
}

export default HandbookArticleEditor
