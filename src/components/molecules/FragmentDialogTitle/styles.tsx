import MUIDialogTitle from '@mui/material/DialogTitle'
import styled from 'styled-components'

import { borders, colors } from '@theme'

export const FragmentDialogTitleStyled = styled(MUIDialogTitle)`
  font-family: 'Noto Sans';
  font-size: 1.25em;
  line-height: 1.55em;
  text-align: center;
  font-weight: 700;
  border-bottom: ${borders.basicCard};
  color: ${colors.blackLight};

  .MuiIconButton-sizeMedium{
    position: absolute;
    top: 0.6em;
    right: 0.5em;
    color: ${colors.grays.subtle};
    svg {
        height: 0.833em;
        width: 0.833em;
  }
 
`
