import { Switch } from '@mui/material'
import styled from 'styled-components'

import { colors } from '@theme'

export const StyledSwitch = styled(Switch)`
  .MuiSwitch-switchBase.Mui-checked {
    color: ${colors.brandSun};
    &:hover {
      background-color: ${colors.brandSunDisabled};
    }
  }
  .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
    background-color: ${colors.brandSunLight};
  }
`
