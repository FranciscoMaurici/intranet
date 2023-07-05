import Checkbox from '@mui/material/Checkbox'
import styled from 'styled-components'

import { colors } from '@/theme'

export const StyledCheckbox = styled(Checkbox)`
  padding: 8px;

  &,
  &.Mui-checked {
    color: ${colors.gold};
  }
  &.Mui-disabled {
    color: rgba(0, 0, 0, 0.26);
  }
`
