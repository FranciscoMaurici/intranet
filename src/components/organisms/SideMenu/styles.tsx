import Image from 'next/image'
import styled from 'styled-components'

import { breakpoints, colors, spacers } from '@theme'

export const SideMenuContainer = styled.nav`
  color: ${colors.neutrals.x700};
  display: flex;
  flex-direction: column;
  max-height: 100%;
  padding: 1.875em 0;
  justify-content: space-between;
  position: sticky;
  box-sizing: border-box;
  top: 5em;
  height: calc(100vh - 5rem);
  a {
    text-decoration: none;
  }
`

export const LogoContainer = styled.div`
  padding: 3.125em ${spacers.md};
  @media (max-width: ${breakpoints.xl}) {
    padding: 3vw ${spacers.md};
  }
`

export const DistilleryLogo = styled(Image).attrs({
  width: 170,
  height: 24,
  src: '/images/logo-ds.svg',
  alt: 'distillery-logo',
})`
  cursor: pointer;
`

export const SideMenuLinkButton = styled.div`
  height: 3.857em;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 1.25em;
  transition-property: background-color, color;
  transition-duration: 0.2s, 0.2s;
  transition-timing-function: ease-in;
  text-transform: uppercase;
  cursor: pointer;
  border-left: 0.225em solid transparent;
  box-sizing: border-box;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  &.active {
    cursor: pointer;
    background-color: ${colors.neutrals.white};
    transition-property: background-color, color;
    transition-duration: 0.2s, 0.2s;
    transition-timing-function: ease-out;
    border-left: 0.225em solid ${colors.brand.main.x500};
  }

  &.active > p {
    font-weight: 700;
    color: ${colors.neutrals.x800};
  }

  & > img,
  & > svg {
    margin-right: 0.75em;
  }

  & > img {
    margin-left: 0.3em;
  }

  & > svg > path {
    fill: ${colors.neutrals.x700};
  }

  &.active > svg > path {
    fill: ${colors.neutrals.x900};
  }
`

export const SettingsMenuContainer = styled.div`
  position: relative;
  &::before {
    content: '';
    display: block;
    height: 1px;
    background-color: ${colors.neutrals.x200};
    position: absolute;
    top: -1.5em;
    left: 0;
    right: 1em;
  }
`
