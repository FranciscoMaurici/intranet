import styled from 'styled-components'

import { colors } from '@/theme'

export const ItemContainer = styled.section`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${colors.neutrals.x200};
  padding: 1.75em 0;
  header {
    display: flex;
    align-items: center;
    gap: 2.5em;
  }
  > div {
    overflow: hidden;
  }
`
export const StepsContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2em 0;
  margin-left: 0.75em;
`
