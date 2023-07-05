import styled from 'styled-components'

import FragmentInput from '../FragmentInput'

import { borders, colors } from '@/theme'

export const AnnouncementReactionsContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1em 1em 0;
`

export const CTAsContainer = styled.section`
  display: flex;
  padding: 1em 0 0;
  border-top: ${borders.divider};
  gap: 0.75em;
`

export const CommentsContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1em 0;
  gap: 1.5em;
  border-bottom: ${borders.divider};
`

export const CommentForm = styled.form`
  display: flex;
  gap: 0.75em;
  position: relative;
  padding: 1.5em 0 0;
  button {
    padding-left: 0.5em;
    font-size: 1em;
    border: none;
    position: absolute;
    bottom: 0.125em;
    right: 0.125em;
    background: ${colors.brand.main.x500};
    width: 1.75em;
    height: 1.75em;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    :disabled {
      cursor: not-allowed;
      background: ${colors.brand.main.x200};
    }
    :hover {
      background: ${colors.brand.main.x600};
    }
  }
`

export const CommentInput = styled(FragmentInput)`
  & > div {
    font-size: 0.75em;
    padding: 0 2.666em 0 16px;
    background: #f5f5f6;
    border-radius: 16px;
    box-sizing: border-box;
    min-height: 2.666em;
    textarea {
      font-family: 'Noto Sans';
      padding: 0.625em 0px;
      &::placeholder {
        color: ${colors.neutrals.x600};
      }
    }
  }
`

export const ViewAllCommentsButtonContainer = styled.div`
  border-top: ${borders.divider};
  border-bottom: ${borders.divider};
  padding: 0.125em;
  width: 100%;
`

export const ViewAllComments = styled.button`
  border: none;
  background: transparent;
  font-size: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75em;
  width: 100%;
  padding: 0.75em 0;
  cursor: pointer;
  &:hover {
    background: ${colors.neutrals.x100};
  }
`

export const IconButton = styled.button<{ active?: boolean }>`
  background-color: ${colors.neutrals.white};
  border: none;
  cursor: pointer;
  display: flex;
  svg {
    path {
      fill: ${props =>
        props.active ? colors.brand.main.x500 : colors.neutrals.x900};
    }
  }

  &:hover {
    svg {
      path {
        fill: ${colors.brand.main.x500};
      }
    }
  }
`
