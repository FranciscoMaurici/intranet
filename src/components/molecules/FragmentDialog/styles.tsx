import MUIDialog from '@mui/material/Dialog'
import styled from 'styled-components'

import { borders } from '@theme'

export const FragmentDialogStyled = styled(MUIDialog)`
  .MuiPaper-root {
    border: ${borders.basicContainer}
    border-radius: 0.5em;
  }
  .MuiDialogContent-root {
    padding: 1.5em;
  }
  .MuiDialogTitle-root + .MuiDialogContent-root {
    padding-top: 1.5em;
  }
`
