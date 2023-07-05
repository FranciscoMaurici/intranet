import React from 'react'
import { MdArrowBack } from 'react-icons/md'

import { GoBackContainer } from './styles'
import { IProps } from './types'

const GoBack = ({ onGoBack }: IProps) => (
  <GoBackContainer onClick={onGoBack}>
    <MdArrowBack />
    Go Back
  </GoBackContainer>
)

export default GoBack
