import { Avatar } from '@mui/material'
import styled from 'styled-components'

export const TextFieldAvatarContainer = styled.div`
  padding: 0.5em 0;
  padding-left: 0.2em;
`

export const StyledAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    width: 1.7em;
    height: 1.7em;
    margin-right: 0.3em;
  }
`
