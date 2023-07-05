import { useState } from 'react'
import Image from 'next/image'

import FragmentButton from '@components/atoms/_FragmentButton'

import { steps } from './constants'
import {
  ControlsContainer,
  FiledsContainer,
  FormContainer,
  MainContainer,
  NextButtonContainer,
} from './styles'

import FormStepIndicator from '@/components/molecules/FormStepIndicator'

const TechInterviewForm = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    currentStep < steps.length && setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    currentStep > 1 && setCurrentStep(currentStep - 1)
  }

  return (
    <>
      <MainContainer>
        <FormStepIndicator steps={steps} current={currentStep} />
        <FormContainer>
          <FiledsContainer></FiledsContainer>
          <ControlsContainer>
            {currentStep > 1 && (
              <FragmentButton variant="tertiary" onClick={handlePrevious}>
                <Image
                  src={'/images/svg/back.svg'}
                  width={18}
                  height={18}
                  alt="Logout"
                />
                Prev Step
              </FragmentButton>
            )}
            {currentStep < steps.length && (
              <NextButtonContainer>
                <FragmentButton variant="secondary" onClick={handleNext}>
                  NEXT STEP
                  <Image
                    src={'/images/svg/next.svg'}
                    width={18}
                    height={18}
                    alt="Logout"
                  />
                </FragmentButton>
              </NextButtonContainer>
            )}
          </ControlsContainer>
        </FormContainer>
      </MainContainer>
    </>
  )
}

export default TechInterviewForm
