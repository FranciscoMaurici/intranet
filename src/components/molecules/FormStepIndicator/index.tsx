import React from 'react'

import { IndicatorContainer } from './styles'
import { IProps } from './types'

import FormStep from '@/components/atoms/FormStep'

const FormStepIndicator = ({ steps, current }: IProps) => (
  <IndicatorContainer>
    {steps.map(step => (
      <FormStep
        key={`form-step${step.step}`}
        step={step}
        status={
          current === step.step
            ? 'active'
            : current > step.step
            ? 'done'
            : 'inactive'
        }
      />
    ))}
  </IndicatorContainer>
)

export default FormStepIndicator
