import styled from 'styled-components'

import { spacers } from '@theme'

export const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.6fr) minmax(0, 0.4fr);
  grid-gap: ${spacers.md};
`

export const RightContent = styled.div`
  margin-top: -5em;
`
