import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'

import {
  CardContainer,
  IconContainer,
  IconSkeleton,
  InfoContainer,
  PathItemsContainer,
  Subtitle,
} from './styles'
import type { IProps } from './types'

import AnimatedContentToggle from '@/components/atoms/AnimatedContentToggle'
import FragmentLink from '@/components/atoms/FragmentLink'
import FragmentSkeleton from '@/components/atoms/FragmentSkeleton'
import FragmentText from '@/components/atoms/FragmentText'
import LearningCardListItem from '@/components/atoms/LearningCardListItem'

const LearningCard = ({ department: { name, description, stack } }: IProps) => {
  const [showInfo, setShowInfo] = useState(false)
  return (
    <CardContainer>
      <IconContainer>
        <Image
          alt="learning-card-image"
          src={`/images/learning-paths-icons/${name
            .replace('&', 'and')
            .replace(' ', '-')
            .toLowerCase()}.svg`}
          width={120}
          height={120}
        />
      </IconContainer>
      <InfoContainer>
        <header>
          <FragmentText variant="headingRegular">{name}</FragmentText>
          <Subtitle variant="bodyRegular">{description}</Subtitle>
        </header>
        <FragmentLink onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? 'LESS ' : 'MORE '}INFO
        </FragmentLink>
        <AnimatePresence initial={false}>
          <AnimatedContentToggle
            isExpanded={showInfo}
            initialHeight="0px"
            transition={{
              type: 'spring',
              stiffness: 100,
            }}
          >
            <PathItemsContainer>
              {stack.map(stack => (
                <LearningCardListItem key={stack.id} stack={stack} />
              ))}
            </PathItemsContainer>
          </AnimatedContentToggle>
        </AnimatePresence>
      </InfoContainer>
    </CardContainer>
  )
}

const LearningCardSkeleton = () => (
  <>
    <CardContainer>
      <IconContainer>
        <IconSkeleton />
      </IconContainer>
      <InfoContainer>
        <header>
          <FragmentSkeleton width={120} height={20} />
          <FragmentSkeleton width={80} />
          <FragmentSkeleton width={80} />
        </header>
      </InfoContainer>
    </CardContainer>
  </>
)

LearningCard.Skeleton = LearningCardSkeleton

export default LearningCard
