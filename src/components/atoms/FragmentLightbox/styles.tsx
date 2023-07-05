import { BiX, BiZoomIn, BiZoomOut } from 'react-icons/bi'
import styled from 'styled-components'

import { colors } from '@/theme'

export const LightboxBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: baseline;
  z-index: 10;
  font-size: 3em;
  color: ${colors.grays.subtle};
  overflow: scroll;
  overflow-x: visible;
  padding-top: 1.5em;
  svg {
    position: fixed;
    top: 0.5em;
    z-index: 12;
  }
  cursor: pointer;
`

export const LightboxCloseButton = styled(BiX)`
  left: 0.5em;
`

export const LightboxZoomInButton = styled(BiZoomIn)`
  right: 1.75em;
`

export const LightboxZoomOutButton = styled(BiZoomOut)`
  right: 0.5em;
`

export const BenefitsLightboxImageContainer = styled('img')<{
  transform?: number
}>`
  position: relative;

  width: min-content;
  max-width: 96vw;
  max-height: none;
  height: auto;
  transform: ${({ transform }) => `scale(${transform})`};
  transform-origin: top;

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  overflow-y: visible;
  cursor: default;
`
