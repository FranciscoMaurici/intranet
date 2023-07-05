import React from 'react'

import { ReactionIconStyled } from './styles'
import { IProps } from './types'

const ReactionIcon = ({ children }: IProps) => (
  <ReactionIconStyled>{children}</ReactionIconStyled>
)

export default ReactionIcon
