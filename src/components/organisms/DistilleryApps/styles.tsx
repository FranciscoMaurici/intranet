import styled from 'styled-components'

import { borders, colors, shadows, spacers } from '@theme'

export const DistilleryAppsContainer = styled.div`
  margin-top: calc(-0.9em - ${spacers.sm});
  h2 {
    padding-top: ${spacers.sm};
    font-weight: 700;
    font-size: 14px;
  }
`

export const DistilleryAppsContent = styled.div`
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
`

export const DistilleryAppContainer = styled.div`
  display: flex;
  font-size: 0.875em;
  font-weight: 700;
  line-height: 1.25rem;
  & h3 {
    font-weight: 700;
  }
  & p {
    font-weight: 500;
    color: ${colors.grays.subtle};
  }
  & a {
    color: ${colors.textLink};
    text-decoration: underline;
  }
`

export const DistilleryAppsDivider = styled.hr`
  border: ${borders.basicCard};
  border-top: 0;
  width: 100%;
  margin: 1.5em 0;

  &:last-of-type {
    display: none;
  }
`
