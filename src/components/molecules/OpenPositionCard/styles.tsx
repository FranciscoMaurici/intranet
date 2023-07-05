import styled from 'styled-components'

import { spacers } from '@theme'

import { BasicCard } from '../CardInputContainer/styles'

export const PositionCardContainer = styled(BasicCard)`
  margin-top: ${spacers.md};
  padding: 1.3em;
`

export const PositionCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`

export const PositionCardHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`
