import Image from 'next/image'
import { useRouter } from 'next/router'

import FragmentLink from '../FragmentLink'
import FragmentText from '../FragmentText'

import { Container, ContentContainer } from './styles'
import { IProps } from './types'

import { colors } from '@/theme'

const BenefitsCard = ({ title, description, slug, hasMoreDetails }: IProps) => {
  const router = useRouter()
  return (
    <Container>
      <figure>
        <Image
          src={`/images/benefits-icons/${slug}.svg`}
          alt="benefit-card-icon"
          width={60}
          height={60}
        />
      </figure>
      <ContentContainer>
        <header>
          <FragmentText variant="subHeadingRegular">{title}</FragmentText>
        </header>
        <FragmentText color={colors.neutrals.x700} variant="bodySmall">
          {description}
        </FragmentText>
        {hasMoreDetails ? (
          <FragmentLink href={`${router.asPath}/${slug}`}>
            MORE DETAILS
          </FragmentLink>
        ) : (
          ''
        )}
      </ContentContainer>
    </Container>
  )
}

export default BenefitsCard
