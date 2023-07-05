import styled from 'styled-components'

import { colors } from '@theme'

export const LoadingContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  align-items: center;
  text-align: center;
`

export const Title = styled.h1`
  font-family: 'Noto Serif', serif;
  font-weight: 700;
  font-style: italic;
  font-size: 3.1em;
  margin-bottom: 0.5em;
  line-height: 1.3em;
`

export const SubTitle = styled.p`
  color: ${colors.grays.subtle};
  font-size: 1.4em;
  margin-bottom: 2.5em;
  line-height: 1.3em;
`

export const ImageContainer = styled.div`
  margin-bottom: 2rem;
`
