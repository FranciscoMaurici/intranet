import styled from 'styled-components'

import { colors } from '@/theme'

export const StepContainer = styled.div`
  display: flex;
  padding: 1em 0;
`
export const StepIcon = styled.div<{ variant?: string }>`
  display: ${({ variant }) => (variant === 'done' ? 'block' : 'flex')};
  justify-content: center;
  align-items: center;
  width: 1.7em;
  height: 1.7em;
  border-radius: 100%;
  background-color: ${({ variant }) =>
    variant === 'active' ? colors.neutrals.x900 : 'transparent'};
  border: ${({ variant }) =>
    variant === 'inactive' ? `2px solid ${colors.neutrals.x300}` : 'none'};
  box-sizing: border-box;
  color: ${({ variant }) =>
    variant === 'active' ? colors.neutrals.x100 : colors.neutrals.x300}};
  margin-right: 1em;
  font-size: 0.9em;
  background-image: ${({ variant }) =>
    variant === 'done' ? 'url(/images/svg/check.svg)' : 'none'};
  background-repeat: no-repeat;
  background-size: contain;
`
