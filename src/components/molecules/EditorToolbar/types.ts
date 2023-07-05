import { IconType } from 'react-icons/lib'
import { Editor } from '@tiptap/react'

export interface IProps {
  editor: Editor
}

export interface ToolbarItemProps {
  icon?: IconType
  onClick(): void
  disabled?: boolean
  isActive?: boolean
  name: string
  text?: string
}
