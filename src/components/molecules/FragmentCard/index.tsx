import Image from 'next/image'

import { CardActionText, Container, ContentContainer } from './styles'
import { IFragmentCardItem } from './types'

import FragmentLink from '@/components/atoms/FragmentLink'
import FragmentText from '@/components/atoms/FragmentText'
import { colors } from '@/theme'

const FragmentCard = ({
  title,
  description,
  iconSrc,
  alt,
  actionButton,
}: IFragmentCardItem) => {
  let actionButtonContent
  if (actionButton?.type === 'link') {
    actionButtonContent = (
      <FragmentLink href={actionButton.href}>
        {actionButton.title || 'MORE DETAILS'}
      </FragmentLink>
    )
  } else if (actionButton?.type === 'custom') {
    actionButtonContent = (
      <CardActionText onClick={actionButton.onClick} variant="bodyXSmallBold">
        {actionButton.title || 'MORE DETAILS'}
      </CardActionText>
    )
  } else {
    actionButtonContent = null
  }

  return (
    <Container>
      <figure>
        <Image src={iconSrc} alt={alt || 'card-icon'} width={60} height={60} />
      </figure>
      <ContentContainer>
        <header>
          <FragmentText variant="subHeadingRegular">{title}</FragmentText>
        </header>
        <FragmentText color={colors.neutrals.x700} variant="bodySmall">
          {description}
        </FragmentText>
        {actionButtonContent}
      </ContentContainer>
    </Container>
  )
}

export default FragmentCard
