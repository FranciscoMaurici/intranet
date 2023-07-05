import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { FragmentLink } from '@components'

import AnimatedContentToggle from '../AnimatedContentToggle'
import FragmentText from '../FragmentText'

import { ItemContainer, StepsContainer } from './style'
import { IProps } from './types'

import LearningPathStep from '@/components/molecules/LearningPathStep'

const LearningCardListItem = ({ stack }: IProps) => {
  const [showInfo, setShowInfo] = useState(false)
  const lastPrincipalId = Math.max(
    ...stack.paths.map(step => !step.isComplementary && step.id),
  )
  return (
    <ItemContainer>
      <header>
        <FragmentText variant="headingSmall">{stack.name}</FragmentText>
        <FragmentLink onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? 'HIDE ' : 'SHOW '}PATH
        </FragmentLink>
      </header>
      <AnimatePresence initial={false}>
        <AnimatedContentToggle
          isExpanded={showInfo}
          initialHeight="0px"
          transition={{
            type: 'fade',
            stiffness: 100,
          }}
        >
          <StepsContainer>
            {stack.paths.map(step => (
              <LearningPathStep
                step={step}
                key={step.id}
                lastChild={step.id >= lastPrincipalId}
              />
            ))}
          </StepsContainer>
        </AnimatedContentToggle>
      </AnimatePresence>
    </ItemContainer>
  )
}

export default LearningCardListItem
