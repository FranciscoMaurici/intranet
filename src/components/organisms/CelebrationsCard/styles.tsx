import styled from 'styled-components'

import { borders, colors, shadows, spacers } from '@theme'

export const BirthDayCardContainer = styled.div`
  border: ${borders.basicCard};
  margin-top: ${spacers.md};
  padding: 1em;
  display: flex;
  flex-direction: column;
  border-radius: 0.5em;
  box-shadow: ${shadows.dashboardCard};
  width: 100%;
  box-sizing: border-box;
  height: fit-content;
  margin-bottom: 4.5em;
  overflow: hidden;
`

export const BirthDayCardSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props: { isLoading: boolean }) =>
    props.isLoading ? 'unset !important' : 'space-between'};
`

export const BirthDayCardContainerText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em 0em 1em 1.5em;
  color: ${colors.neutrals.x700};
  line-height: 22px;
  align-items: flex-start;
  @media (max-width: 890px) {
    max-width: 6.375em;
  }
  b {
    font-weight: 600 !important;
  }
`

export const BirthDayCardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-right: 3.5em;
  font-size: 1.1em;
  margin-top: 1em;
`

export const BirthdayImageContainer = styled.div`
  margin-top: 0.7em;
`

export const BirthDayHeaderContainer = styled.div`
  @media (max-width: 890px) {
    max-width: 15em;
    margin-top: 1em;
    text-align: right;
  }
`
export const BoldInnerText = styled.span`
  font-weight: 700;
`
