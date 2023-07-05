import styled from 'styled-components'

import { FeedbackMessageType } from './types'

import { colors } from '@/theme'

export const UpdateContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  width: 80%;
  margin: auto;
  padding: 1.5em 0;
`
export const ProgressDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
`

export const MessageContainer = styled.div<{ $type: FeedbackMessageType }>`
  padding: 1em;
  background-color: ${({ $type }) =>
    $type === 'success' ? colors.success.x100 : colors.danger.x100};
`
