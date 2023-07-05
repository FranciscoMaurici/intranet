import React, { Fragment } from 'react'

import FragmentText from '../FragmentText'

import { ReactionCtaButton } from './styles'
import { IProps } from './types'

const ReactionCta = ({ onClick, icon, label, active }: IProps) => (
  <ReactionCtaButton onClick={onClick} active={active}>
    <>
      {icon} <FragmentText variant="bodySmallBold">{label}</FragmentText>
    </>
  </ReactionCtaButton>
)

export default ReactionCta
