import styled from 'styled-components'

import { colors } from '@/theme'

export const MessageContent = styled.div`
  background: ${colors.success.x100};
  padding: 1em 1.25em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 25em;
  ul {
    list-style: disc;
    padding-left: 1.25em;
  }
`
