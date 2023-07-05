import { baseTypographyStyles } from '@/components/atoms/FragmentText'

export interface IPROPS {
  title: string
  content: string
  titleVariant?: keyof typeof baseTypographyStyles
}
