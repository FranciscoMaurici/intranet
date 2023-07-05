import styled from 'styled-components'

import { breakpoints } from '@theme'

export const LayoutContainer = styled.section`
  width: 100%;
  max-width: 1200px;
  margin-left: 0;
`

export const BenefitsContent = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: ${breakpoints.lg}) {
    justify-content: center;
  }
  text-align: center;
  position: relative;
`

export const BenefitSectionHeader = styled.header`
  padding: 5em 0;
`
export const BenefitSectionContent = styled.section`
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.75em;

  & article:nth-child(1),
  & article:nth-child(2) {
    margin-bottom: 30px;
  }

  & article:nth-child(3),
  & article:nth-child(4) {
    margin-top: 15px;
  }
`

export const TitlesContainer = styled.div`
  margin: 2em 1em 0 1em;
`
export const HorizonalDivider = styled.hr`
  height: 1px;
  background-color: #e8e7ea;
  border: none;
  position: absolute;
  width: 100%;
  top: 140px;
`
