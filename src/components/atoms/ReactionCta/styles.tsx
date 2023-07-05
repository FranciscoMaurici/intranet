import styled from 'styled-components'

import { colors } from '@/theme'

export const ReactionCtaButton = styled.button<{ active?: boolean }>`
  border: none;
  background: none;
  font-size: 1em;
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em;
  background-color: ${({ active }) =>
    active ? colors.brand.main.x300 : colors.white};
  cursor: pointer;

  &:hover {
    background-color: ${colors.neutrals.x200};
    border-radius: 0.125em;
  }
`
