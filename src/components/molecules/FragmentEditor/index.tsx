import { useEffect, useMemo } from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import { useEditor } from '@tiptap/react'
import { useRouter } from 'next/router'

import EditorToolbar from '../EditorToolbar'

import CustomImage from './extensions/custom-image'
import {
  EditorContainer,
  StyledBubbleMenu,
  StyledBubbleMenuItem,
  StyledEditorContent,
} from './styles'
import { EditorProps, IEditorModuleProps, IProps } from './types'
import { editorExtensions, extractImageFromContent } from './utils'

import LightBox from '@/components/atoms/FragmentLightbox'

const FragmentEditor = <FV extends FieldValues>({
  name,
  control,
  editable,
  rules,
}: IProps<FV>) => (
  <EditorContainer>
    <Controller<FV>
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <JMEditor
          onChange={field.onChange}
          editable={editable}
          editorContent={field.value}
          error={Boolean(fieldState.error)}
        />
      )}
    />
  </EditorContainer>
)

export const JMEditor = ({
  onChange,
  editable,
  editorContent,
}: EditorProps) => {
  const editor = useEditor({
    extensions: editorExtensions,
    editable: editable,
    content: editorContent,
    onUpdate({ editor }) {
      onChange(editor.getJSON())
    },
  })

  const router = useRouter()
  const isDashboard = router.asPath === '/'

  useEffect(() => {
    if (editor) {
      editor.setOptions({ editable })
    }
    if (editor && editable) {
      editor.commands.focus('end')
    }
  }, [editable, editor])

  useEffect(() => {
    if (!editor) return
    const { from, to } = editor.state.selection
    editor.commands.setTextSelection({ from, to })

    if (editor && editorContent) {
      if (JSON.stringify(editorContent) !== JSON.stringify(editor.getJSON())) {
        editor.commands.setContent(editorContent)
      }
    }
  }, [editor, editorContent])

  const images = useMemo<Array<string>>(
    () => (editorContent ? extractImageFromContent(editorContent, []) : []),
    [editorContent],
  )

  return (
    <div>
      {editor && <ImageBubbleMenu editor={editor} editable={editable} />}
      {editable && <EditorToolbar editor={editor} />}
      <StyledEditorContent
        editor={editor}
        className={editable ? 'edit-mode' : ''}
        $isDashboard={isDashboard}
        $isContentExpanded
      />
      {!editable &&
        images.map(image => (
          <LightBox
            key={image}
            src={image}
            style={{ display: 'none' }}
            handleClose={() => {
              document.getElementById(image).style.display = 'none'
              document.body.style.overflowY = 'scroll'
            }}
          />
        ))}
    </div>
  )
}

const ImageBubbleMenu = ({ editor, editable }: IEditorModuleProps) => {
  const menuItems = [
    { attrKey: 'size', value: 'small', label: 'Small' },
    { attrKey: 'size', value: 'medium', label: 'Medium' },
    { attrKey: 'size', value: 'large', label: 'Large' },
    /*
    TODO: Will reintroduce this in https://distillery.atlassian.net/browse/INTRA-687
    { attrKey: 'float', value: 'left', label: 'Left' },
    { attrKey: 'float', value: 'none', label: 'Center' },
    { attrKey: 'float', value: 'right', label: 'Right' },
    */
  ]
  return (
    <StyledBubbleMenu
      className={`bubble-menu ${editable ? 'edit-mode' : ''}`}
      tippyOptions={{ duration: 100 }}
      editor={editor}
      shouldShow={() => editor.isActive(CustomImage.name)}
    >
      {menuItems.map(item => (
        <BubbleMenuItem
          onClick={() => {
            editor
              .chain()
              .focus()
              .updateAttributes(CustomImage.name, {
                [item.attrKey]: item.value,
              })
              .run()
          }}
          isActive={editor.isActive(CustomImage.name, {
            [item.attrKey]: item.value,
          })}
          label={item.label}
          key={item.label}
        />
      ))}
    </StyledBubbleMenu>
  )
}

const BubbleMenuItem = ({
  onClick,
  label,
  isActive,
}: {
  onClick(): void
  label: string
  isActive: boolean
}) => (
  <StyledBubbleMenuItem
    type="button"
    onClick={onClick}
    className={isActive ? 'is-active' : ''}
  >
    {label}
  </StyledBubbleMenuItem>
)

export default FragmentEditor
