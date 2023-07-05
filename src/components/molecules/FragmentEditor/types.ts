import { FieldValues, UseControllerProps } from 'react-hook-form'
import { Content, Editor, JSONContent } from '@tiptap/react'

export type IProps<FV extends FieldValues = FieldValues> =
  UseControllerProps<FV> & { editable: boolean }

export interface EditorProps {
  onChange?(e: JSONContent): void
  editable: boolean
  editorContent: Content
  error?: boolean
}

export interface IEditorModuleProps {
  editor: Editor
  editable: boolean
}
