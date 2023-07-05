import styled from 'styled-components'

import { colors } from '@/theme'

export const IndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2em 1.8em;
  background-color: ${colors.neutrals.x100};
  height: fill-available;
  width: 100%;
  max-width: 17.5em;
  box-sizing: border-box;
  margin-bottom: 2.25em;
`
