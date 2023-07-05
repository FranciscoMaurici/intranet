import { TextField } from '@mui/material'
import styled from 'styled-components'

import { colors } from '@/theme'

export const StyledTextField = styled(TextField)`
  & input::placeholder {
    color: ${colors.neutrals.x500};
    line-height: 1.362em;
  }
`
