import styled from 'styled-components'

import { colors } from '@/theme'

export const CommentContainer = styled.article`
  display: flex;
  gap: 0.75em;
`
export const CommentReactionsContainer = styled.article`
  display: flex;
  gap: 0.75em;
`

export const CommentFigure = styled.figure`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75em;
  padding: 0.75em 1em 1em;
  background-color: ${colors.neutrals.x100};
  border-radius: 0.125em 0.75em 0.75em 0.75em;
  width: 100%;
  box-sizing: border-box;
  & > p {
    overflow-wrap: anywhere;
    > pre {
      white-space: break-spaces;
    }
  }
`

export const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`

export const CommentHeader = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 0.75em;
  align-items: baseline;

  & > div {
    display: flex;
    gap: 0.75em;
    align-items: baseline;
  }
`
