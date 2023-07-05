import { Button } from '@mui/material'
import styled from 'styled-components'

import FragmentText from '@/components/atoms/FragmentText'

export const StyledButton = styled(Button)`
  width: 6em;
  height: 3em;
`
export const ButtonTitle = styled(FragmentText)`
  font-size: 1em;
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  & > div:nth-child(2) {
    margin-top: 2.5em;
  }
`
export const UserRowContainer = styled.div`
  display: flex;
  margin-top: 1.25em;
`
