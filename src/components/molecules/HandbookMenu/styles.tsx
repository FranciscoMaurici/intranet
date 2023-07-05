import { FaTrashAlt } from 'react-icons/fa'
import styled, { css } from 'styled-components'

import { borders, colors } from '@/theme'

const LinkStyles = css`
  font-size: 0.75em;
  color: ${colors.neutrals.x600};
  &:hover {
    cursor: pointer;
    color: ${colors.neutrals.x900};
  }
`
export const StyledFaTrashAlt = styled(FaTrashAlt)`
  ${LinkStyles}
`

export const HandbookMenuContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1em;

  li {
    display: flex;
    flex-direction: column;
    align-items: baseline;

    & > div {
      display: flex;
      flex-direction: row;
      gap: 0.5em;
      padding: 0.375em 0;
      align-items: center;

      & > p {
        &:hover {
          cursor: pointer;
          color: ${colors.neutrals.x900};
        }
      }
      a {
        ${LinkStyles}
      }
    }
  }

  ul {
    padding-left: 0.75em;
    border-left: 2px solid #f5f5f6;
  }

  & > ul:first-of-type {
    border: none;
  }
`

export const SearchInput = styled.input`
  border: ${borders.basicContainer};
  border-radius: 5em;
  background-color: ${colors.white};
  padding: 1em;
  color: ${colors.grays.heading};
  width: 100%;
  flex-wrap: nowrap;
  box-sizing: border-box;
`
