import styled from 'styled-components'

import { borders } from '@theme'

export const IconContainer = styled('div')<{
  size: string
  iconSize: string
  borderRadius: string
  rightMargin: string
  color: string
}>`
  border: ${borders.basicCard};
  border-radius: ${({ borderRadius }) => borderRadius};
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  min-width: ${({ size }) => size};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${({ rightMargin }) => rightMargin};
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    width: ${({ iconSize }) => iconSize};
    height: ${({ iconSize }) => iconSize};
    color: ${({ color }) => color};
    svg {
      font-size: ${({ iconSize }) => iconSize};
    }
  }
`
