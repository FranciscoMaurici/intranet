import { StepContainer, StepTitleContainer, StepTitleIcon } from './styles'
import { IProps } from './types'

import FragmentButton from '@/components/atoms/_FragmentButton'
import FragmentText from '@/components/atoms/FragmentText'
import { colors } from '@/theme'

const LearningPathStep = ({ step, lastChild = false }: IProps) => (
  <StepContainer lastChild={lastChild}>
    <StepTitleContainer>
      {!step.isComplementary && <StepTitleIcon />}
      <FragmentText variant="bodyRegularBold">{step.name}</FragmentText>
    </StepTitleContainer>
    <FragmentText color={colors.neutrals.x700} variant="bodySmall">
      {step.description}
    </FragmentText>
    <FragmentButton href={step.url} target="_blank" variant="secondary">
      ACCESS TO CONTENT
    </FragmentButton>
  </StepContainer>
)

export default LearningPathStep
