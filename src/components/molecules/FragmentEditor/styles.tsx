import { BubbleMenu, EditorContent } from '@tiptap/react'
import styled from 'styled-components'

import { colors } from '@theme'

import editorContentStyles from '@/utils/editor/editorContentStyles'

export const EditorContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
`

export const StyledEditorContent = styled(EditorContent)<{
  $isDashboard: boolean
  $isContentExpanded?: boolean
}>`
  ${editorContentStyles}
  &.edit-mode {
    border: 1px solid ${colors.grays.sideMenuDefault};
    border-radius: 0.5em;
    margin-top: 0.5em;
    overflow: auto;

    .ProseMirror {
      min-height: 10em;
      max-height: fit-content;
    }

    td {
      border: 2px solid #ced4da;
    }

    img {
      cursor: default;

      &.ProseMirror-selectednode {
        outline: 3px solid #68cef8;
      }
    }
  }
`

export const StyledBubbleMenu = styled(BubbleMenu)`
  display: flex;
  background-color: #0d0d0d;
  padding: 0.2rem;
  border-radius: 0.5rem;
  display: none;

  &.edit-mode {
    display: block;
  }
`

export const StyledBubbleMenuItem = styled.button`
  border: none;
  background: none;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0 0.2rem;
  opacity: 0.6;
  &:hover,
  &.is-active {
    opacity: 1;
  }
  &.is-active {
    text-decoration: underline;
  }
`
