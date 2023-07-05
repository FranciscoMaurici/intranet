import styled from 'styled-components'

import { colors } from '@theme'

export const IconContainer = styled('picture')<{
  size?: string
  rightMargin?: string
}>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  min-width: ${({ size }) => size};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  margin-right: ${({ rightMargin }) => rightMargin};

  & img,
  & span {
    border-radius: 50%;
  }

  & span {
    background-color: ${colors.gold};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & svg {
    width: 100%;
    height: 80%;
    color: ${colors.blackLight};
  }
`
