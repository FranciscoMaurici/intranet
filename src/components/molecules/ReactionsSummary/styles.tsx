import styled from 'styled-components'

import FragmentText from '@/components/atoms/FragmentText'

export const ReactionSummarySection = styled.section<{ isComment?: boolean }>`
  display: flex;
  padding: ${({ isComment }) =>
    isComment ? '0 0 0 0.375em' : '1em 0 1em 0.375em'};
  align-items: center;
`

export const ReactionSummaryMessage = styled(FragmentText)`
  cursor: pointer;
  margin-left: 1em;
  &:hover {
    text-decoration: underline;
  }
`
