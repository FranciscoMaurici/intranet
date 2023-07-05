import styled from 'styled-components'

import { colors } from '@theme'

import FragmentDialog from '../FragmentDialog'

export const UploadMediaContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  input {
    z-index: 2;
    opacity: 0;
    width: 10.75em;
    left: 8em;
    margin-left: -10.75em;
    height: 3em;
    cursor: pointer;
  }

  span {
    font-size: 0.75em;
    color: ${colors.grays.subtle};
    margin-left: 1em;
  }
`

export const UploadMediaText = styled.div`
  font-size: 0.875em;
  margin-right: 2em;
`

export const StyledFragmentDialog = styled(FragmentDialog)`
  & .MuiPaper-root {
    max-width: 43.25em;
    box-sizing: content-box;
    position: relative;
  }
`
