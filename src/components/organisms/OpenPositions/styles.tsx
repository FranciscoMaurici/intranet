import styled from 'styled-components'

import { colors, spacers } from '@theme'

export const CardSearchControlsContainer = styled.div`
  flex: 1;
`

export const ResultsNumberContainer = styled.div`
  flex: 1;
  padding-top: 1rem;

  strong {
    font-weight: bold;
  }
`

export const SearchBoxContainer = styled.div`
  flex: 1;
`

export const DisclaimerMessage = styled.div`
  font-weight: 700;
  line-height: 20px;
  padding-left: 1.3em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 2.85em;
  span {
    color: ${colors.brandSun};
    text-decoration: underline;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    cursor: pointer;
    color: ${colors.brand.support.x600};
  }
`

export const HeaderPositionsBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  align-items: flex-start;
`

export const SearchSectionContainer = styled.div`
  margin-top: ${spacers.md};
`
