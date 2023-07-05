import styled from 'styled-components'

import { colors, spacers, zindex } from '@theme'

export const StyledToolbar = styled.div<{ $isDashboard: boolean }>`
  border: 1px solid ${colors.grays.sideMenuDefault};
  padding: ${spacers.sm};
  border-radius: 0.5em;
  display: flex;
  width: fit-content;
  max-width: 1000px;
  flex-wrap: wrap;
  align-self: center;
  background-color: ${colors.white};
  position: sticky;
  top: ${({ $isDashboard }) => ($isDashboard ? '-1.5em' : '7.5em')};
  z-index: ${zindex.z10};
`
export const StyledToolbarItem = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) =>
    isActive ? colors.grays.editorItemActive : 'inherit'};
  border: hidden;
  border-radius: 0.3em;
  padding: 0.3em;
  cursor: pointer;
  margin: 0 0.1em;
  font-size: 1.3em;
  height: fit-content;

  &:hover {
    background-color: ${colors.grays.editorHover};
  }

  svg,
  p {
    color: ${colors.grays.heading};
  }

  svg {
    display: block;
  }

  p {
    font-size: 0.85em;
  }
`

export const StyledColorPicker = styled.div`
  width: 1.5em;
  height: 1.5em;
  border-radius: 0.2em;
  overflow: hidden;
  margin-top: 0.28em;

  [type='color'] {
    border: 0;
    padding: 0;
    width: 200%;
    height: 200%;
    cursor: pointer;
    transform: translate(-25%, -25%);
  }
`
