import styled from 'styled-components'

import { borders, colors } from '@theme'

export const FragmentButtonStyled = styled.button<{ variant?: string }>`
  font-family: 'Noto Sans';
  height: 2.87em;
  text-transform: none;
  font-weight: 700;
  font-size: 0.875em;
  background-color: ${({ variant }) =>
    variant === 'contained' ? colors.brandSun : colors.white};
  border: ${borders.basicCard};
  border-radius: 0.285em;
  padding: 0 1em;
  color: ${({ variant }) =>
    variant === 'contained' ? colors.whiteVariant : colors.blackLight};
  cursor: pointer;

  &:disabled,
  &:hover {
    background-color: ${({ variant }) =>
      variant === 'contained'
        ? colors.brandSunDisabled
        : colors.grays.buttonDisabled};
  }
`
