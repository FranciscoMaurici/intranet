import { Container } from '@mui/system'
import styled from 'styled-components'

import { breakpoints, colors, shadows } from '@theme'

export const LayoutRoot = styled(Container)`
  position: relative;
  & > div:nth-child(1) {
    background: linear-gradient(
      180deg,
      #f5f5f6 0%,
      rgba(245, 245, 246, 0) 100%
    );
    position: fixed;
    height: 100%;
    width: 50%;
    left: 0;
  }
  & > div:nth-child(2) {
    background: ${colors.neutrals.white};
    position: fixed;
    height: 100%;
    width: 50%;
    right: 0;
    top: 0;
  }
`

export const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 17.5em 1fr;

  main {
    padding: 1.875em 2.5em;
    position: relative;
    background: ${colors.neutrals.white};
    @media (max-width: ${breakpoints.md}) {
      padding: 1.5em 1em;
    }
  }
`

export const BannerContainer = styled.div`
  background-color: white;
  box-shadow: ${shadows.banner};
  border-bottom: 1px solid #d6d8d9;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 188px auto;
  overflow: hidden;
  justify-content: space-between;
  column-gap: 1.5rem;
  box-sizing: border-box;
`

export const LogoContainer = styled.div`
  display: inline-block;
  padding: 0 1.5rem;
`
export const DecorationContainer = styled.aside`
  height: 80px;
  overflow: hidden;
  width: 852px;
  position: relative;
  text-align: right;

  img {
    display: inline-block;
    object-fit: cover;
    object-position: left;
  }
`
