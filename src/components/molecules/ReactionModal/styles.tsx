import styled from 'styled-components'

import { colors } from '@/theme'

export const Tabs = styled.div`
  display: flex;
  align-items: center;
`

export const Tab = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: baseline;
  gap: 0.625em;
  padding: 0.75em 1.25em;
  border-bottom: 0.125em solid
    ${({ isActive }) =>
      isActive ? colors.brand.main.x500 : colors.neutrals.x200};

  cursor: pointer;

  p {
    color: ${({ isActive }) =>
      isActive ? colors.brand.main.x500 : colors.neutrals.x500};
  }

  svg {
    path {
      fill: ${({ isActive }) =>
        isActive ? colors.brand.main.x500 : colors.neutrals.x500};
    }
  }

  &:hover {
    p {
      color: ${colors.brand.main.x500};
    }
    border-bottom: 0.125em solid ${colors.brand.main.x500};
    svg {
      path {
        fill: ${colors.brand.main.x500};
      }
    }
  }
`

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 1.5em 0 0;
`

export const UserReaction = styled.article`
  display: flex;
  gap: 0.75em;
`

export const UserReactionFigure = styled.figure`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const UserReactionContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div {
    margin-left: 0.5em;
    display: flex;
    gap: 0.5em;
    align-items: center;
  }
`

export const UserReactionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 0.75em;
  align-items: baseline;

  & > div {
    display: flex;
    gap: 0.75em;
    align-items: baseline;
  }
`
