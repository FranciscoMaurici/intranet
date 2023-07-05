import React from 'react'

import FragmentText from '../FragmentText'

import { StepContainer, StepIcon } from './styles'
import { IProps } from './types'

import { colors } from '@/theme'

const FormStep = ({ step, status }: IProps) => (
  <>
    <StepContainer>
      <StepIcon variant={status}>{status != 'done' && step.step}</StepIcon>
      <FragmentText
        variant={status === 'active' ? 'subHeadingRegular' : 'subHeadingSmall'}
        color={
          status === 'inactive' ? colors.neutrals.x300 : colors.neutrals.x900
        }
      >
        {step.title}
      </FragmentText>
    </StepContainer>
  </>
)
export default FormStep
