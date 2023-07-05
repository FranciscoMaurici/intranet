import styled from 'styled-components'

import { colors } from '@/theme'

export const StepContainer = styled.div<{
  lastChild?: boolean
}>`
  display: flex;
  flex-direction: column;
  gap: 2em;
  box-sizing: border-box;
  border-left: ${({ lastChild }) =>
    lastChild
      ? `0.25em solid ${colors.neutrals.white}`
      : `0.25em solid ${colors.neutrals.x200}`};
  padding: 0 2.5em 2em;
`
export const StepTitleContainer = styled.div`
  position: relative;
`

export const StepTitleIcon = styled.div`
  width: 1.5em;
  height: 1.5em;
  position: absolute;
  left: -3.35em;
  border: 0.25em solid ${colors.neutrals.x200};
  background-color: ${colors.neutrals.white};
  border-radius: 50%;
  box-sizing: border-box;
`
