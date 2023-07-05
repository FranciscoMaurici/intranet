import styled from 'styled-components'

import { borders, breakpoints, colors } from '@theme'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

export const SideLogin = styled.div`
  min-width: 30rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: ${breakpoints.md}) {
    width: 100%;
  }
`

export const SideLoginContentContainer = styled.div`
  padding: 0 4.68em;
`

export const LoginImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('./images/login-background.jpg');
  background-size: cover;
  @media (max-width: ${breakpoints.md}) {
    display: none;
  }
`

export const DistilleryLogoContainer = styled.div`
  margin: 2.5em 0;
`

export const Headline = styled.h1`
  font-family: 'Noto Serif';
  font-style: italic;
  font-weight: 700;
  font-size: 2.5em;
  line-height: 3rem;
  color: #36343a;

  @media (max-width: ${breakpoints.sm}) {
    font-size: 1.5em;
  }

  span {
    font-family: 'Noto Serif';
    color: ${colors.gold};
  }
`

export const Subheadline = styled.h2`
  font-weight: 500;
  font-size: 0.875em;
  line-height: 1.25rem;
  color: ${colors.blackLight};
  margin: 1.2em 0;
`

export const GoogleLoginButton = styled.button`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 1.2em;
  background: ${colors.white};
  border: ${borders.basicContainer};
  border-radius: 0.25em;
  margin-top: 1.8em;
  cursor: pointer;

  i {
    background-image: url('./images/logo-google.png');
    width: 18px;
    height: 18px;
    margin-right: 1.5em;
  }
  span {
    font-weight: 700;
    font-size: 0.875em;
    line-height: 1.25rem;
    color: ${colors.blackLight};
  }
`
