import styled from 'styled-components'

import { colors } from '@theme'

import FragmentText from '../FragmentText'

export const StyledLink = styled(FragmentText)`
  line-height: 1.325em;
  border-bottom: 0.25em solid;
  width: max-content;
  cursor: pointer;
  &:hover {
    color: ${colors.neutrals.black};
  }

  a {
    text-decoration: inherit;
    color: inherit;
    cursor: pointer;
    width: fit-content;
  }
`
