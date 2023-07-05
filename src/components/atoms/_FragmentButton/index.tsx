import React from 'react'

import { FragmentButtonStyled } from './styles'
import { IProps } from './types'

const FragmentButton = (props: IProps) => {
  const Button = (
    <FragmentButtonStyled {...props}>{props.children}</FragmentButtonStyled>
  )

  return props.href ? (
    <a href={props.href} target={props.target}>
      {Button}
    </a>
  ) : (
    Button
  )
}

export default FragmentButton
