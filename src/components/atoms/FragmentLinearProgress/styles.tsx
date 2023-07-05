import { LinearProgress } from '@mui/material'
import styled from 'styled-components'

import { colors } from '@/theme'

export const StyledLinearProgress = styled(LinearProgress)`
  & .MuiLinearProgress-bar {
    background-color: ${colors.gold};
  }

  &.MuiLinearProgress-root {
    background-color: ${colors.neutrals.x200};
  }

  border-radius: 0.5em;
  width: 100%;
`
