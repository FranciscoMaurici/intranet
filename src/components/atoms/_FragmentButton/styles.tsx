import styled from 'styled-components'

import { colors } from '@/theme'

export const FragmentButtonStyled = styled.button<{
  variant?: string
  size?: string
}>`
  cursor: pointer;
  font-size: 1em;
  font-weight: 700;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  color: ${({ variant }) =>
    variant === 'tertiary' ? colors.neutrals.x800 : colors.neutrals.x100};
  text-transform: uppercase;
  gap: ${({ size }) => (size === 'small' ? '0.5em' : '1em')};
  height: ${({ size }) => (size === 'small' ? '2.25em' : '3em')};
  padding: ${({ size }) => (size === 'small' ? '0.75em 0.8em' : '1em 1.25em')};
  background-color: ${({ variant }) =>
    variant === 'primary'
      ? colors.brand.main.x500
      : variant === 'secondary'
      ? colors.neutrals.x900
      : 'transparent'};
  border-radius: 0.125em;

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'primary'
        ? colors.brand.main.x600
        : variant === 'secondary'
        ? colors.neutrals.x700
        : 'transparent'};
    color: ${({ variant }) =>
      variant === 'tertiary' ? colors.neutrals.x900 : colors.neutrals.x100};
  }
  &:disabled {
    cursor: default;
    pointer-events: none;

    color: ${({ variant }) =>
      variant === 'primary'
        ? colors.brand.main.x300
        : variant === 'secondary'
        ? colors.neutrals.x100
        : colors.neutrals.x300};

    background-color: ${({ variant }) =>
      variant === 'primary'
        ? colors.brand.main.x200
        : variant === 'secondary'
        ? colors.neutrals.x200
        : 'transparent'};
  }
`

FragmentButtonStyled.defaultProps = {
  variant: 'primary',
  size: 'default',
}
