import styled from 'styled-components'

import { colors } from '@/theme'

export const ReactionIconStyled = styled.div`
  border-radius: 50%;
  background-color: ${colors.brand.main.x300};
  width: 1.5em;
  height: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.125em solid ${colors.neutrals.white};
  margin-left: -0.5em;
  svg {
    path {
      fill: ${colors.neutrals.x900};
    }
  }
`
