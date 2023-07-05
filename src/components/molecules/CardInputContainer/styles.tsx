import styled from 'styled-components'

import { borders, colors } from '@theme'

export const BasicCard = styled.div`
  border: ${borders.basicCard};
  border-radius: 0.5em;
`

export const StyledCardInputContainer = styled(BasicCard)<{
  flexDirection: 'column' | 'row'
  margin?: string
}>`
  padding: 1em;
  display: flex;
  font-size: 1em;
  background-color: ${colors.whiteVariant};
  flex-direction: ${({ flexDirection }) => flexDirection};
  gap: 0.75em;
  margin: ${({ margin }) => margin || '0'};

  input {
    border: ${borders.basicContainer};
    border-radius: 5em;
    background-color: ${colors.white};
    padding: 1em;
    color: ${colors.grays.heading};
    width: 100%;
    flex-wrap: nowrap;
    box-sizing: border-box;
  }
`
