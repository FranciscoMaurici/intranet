import MUIDialogContent from '@mui/material/DialogContent'
import styled from 'styled-components'

export const FragmentDialogContentStyled = styled(MUIDialogContent)`
  min-width: 30em;

  root {
    padding-top: 1.5em;
  }

  &.full-w {
    min-width: 100%;
  }

  box-sizing: border-box;

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }
`
