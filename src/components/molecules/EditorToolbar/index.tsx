import { useCallback, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
// TODO: https://distillery.atlassian.net/browse/INTRA-480
// import { CgRedo, CgUndo } from 'react-icons/cg'
import { BiCodeBlock, BiLink, BiUnlink } from 'react-icons/bi'
import { BsTextParagraph } from 'react-icons/bs'
import { FaTable } from 'react-icons/fa'
import { ImEmbed } from 'react-icons/im'
import { IoMdImages } from 'react-icons/io'
import {
  MdHorizontalRule,
  MdOutlineFormatListBulleted,
  MdOutlineFormatListNumbered,
} from 'react-icons/md'
import {
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight,
  RiBold,
  RiFormatClear,
  RiItalic,
  RiStrikethrough,
  RiUnderline,
} from 'react-icons/ri'
import { Tooltip } from '@mui/material'
import { Editor } from '@tiptap/react'
import { useRouter } from 'next/router'

import AddImageDialog from '../AddImageDialog'
import { ImageFormValues } from '../AddImageDialog/types'
import AddTableDialog from '../AddTableDialog'
import { TableFormValues } from '../AddTableDialog/types'

import { StyledColorPicker, StyledToolbar, StyledToolbarItem } from './styles'
import type { IProps, ToolbarItemProps } from './types'

import FragmentLoadingOverlay from '@/components/atoms/FragmentLoadingOverlay'
import { colors } from '@/theme'

const EditorToolbar = ({ editor }: IProps) => {
  if (!editor) {
    return null
  }

  const router = useRouter()

  const [tableDialogOpen, setTableDialogOpen] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const openTableDialog = () => setTableDialogOpen(true)
  const closeTableDialog = () => setTableDialogOpen(false)

  const addTable: SubmitHandler<TableFormValues> = data => {
    editor.chain().focus().insertTable(data).run()
    closeTableDialog()
  }

  const addImage: SubmitHandler<ImageFormValues> = useCallback(
    data => {
      editor.chain().focus().setImage(data).run()
      setImageDialogOpen(false)
    },
    [editor],
  )

  const addEmbed = useCallback(() => {
    const tag = window.prompt('Insert the HTML code of the iframe:')

    if (!tag?.includes('</iframe>')) {
      alert('The inserted tag is invalid. Please, try again.')
      return
    }
    editor.commands.insertContent(tag)
  }, [editor])

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    let url = window.prompt('Insert the URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    if (!url.startsWith('https://')) {
      url = 'https://' + url
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  return (
    <>
      <StyledToolbar id="editorToolbar" $isDashboard={router.asPath === '/'}>
        <ToolbarItem
          icon={RiBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          name="bold"
        />
        <ToolbarItem
          icon={RiItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          name="italic"
        />
        <ToolbarItem
          icon={RiUnderline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          name="underline"
        />
        <ToolbarItem
          icon={RiStrikethrough}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          name="strike through"
        />
        <ToolbarItem
          icon={RiFormatClear}
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          name="clear format"
        />
        <ToolbarItem
          icon={BsTextParagraph}
          onClick={() => editor.chain().focus().clearNodes().run()}
          name="normal text"
        />
        <ToolbarItem
          text="h1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive('heading', { level: 1 })}
          name="heading 1"
        />
        <ToolbarItem
          text="h2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive('heading', { level: 2 })}
          name="heading 2"
        />
        <ToolbarItem
          text="h3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive('heading', { level: 3 })}
          name="heading 3"
        />
        <ToolbarItem
          text="h4"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          isActive={editor.isActive('heading', { level: 4 })}
          name="heading 4"
        />
        <ToolbarItem
          icon={BiLink}
          onClick={setLink}
          isActive={editor.isActive('link')}
          name="link"
        />
        <ToolbarItem
          icon={BiUnlink}
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
          name="unlink"
        />
        <ToolbarItem
          icon={MdOutlineFormatListBulleted}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          name="bullet list"
        />
        <ToolbarItem
          icon={MdOutlineFormatListNumbered}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          name="ordered list"
        />
        <ToolbarItem
          icon={BiCodeBlock}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          name="code block"
        />
        <ToolbarItem
          icon={MdHorizontalRule}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          name="horizontal rule"
        />
        {/* TODO: https://distillery.atlassian.net/browse/INTRA-480
      <ToolbarItem
        icon={CgUndo}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        name="undo"
      />
      <ToolbarItem
        icon={CgRedo}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        name="redo"
      /> */}
        <ToolbarItem icon={FaTable} onClick={openTableDialog} name="table" />
        <ToolbarItem
          icon={RiAlignLeft}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          name="align left"
        />
        <ToolbarItem
          icon={RiAlignCenter}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          name="align center"
        />
        <ToolbarItem
          icon={RiAlignRight}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          name="align right"
        />
        <ToolbarItem
          icon={RiAlignJustify}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          name="align justify"
        />
        <ToolbarItem
          icon={IoMdImages}
          onClick={() => setImageDialogOpen(true)}
          name="insert image"
        />
        <ToolbarItem icon={ImEmbed} onClick={addEmbed} name="insert embed" />
        <ColorPicker editor={editor} />
        {tableDialogOpen && (
          <AddTableDialog onClose={closeTableDialog} onSubmit={addTable} />
        )}
        {imageDialogOpen && (
          <AddImageDialog
            onClose={() => setImageDialogOpen(false)}
            onSubmit={addImage}
            setIsSubmitting={setIsSubmitting}
          />
        )}
      </StyledToolbar>
      {isSubmitting && <FragmentLoadingOverlay />}
    </>
  )
}

const ToolbarItem = ({
  icon,
  onClick,
  disabled,
  isActive,
  name,
  text,
}: ToolbarItemProps) => (
  <Tooltip title={name}>
    <span>
      <StyledToolbarItem
        onClick={onClick}
        disabled={disabled}
        isActive={isActive}
        type="button"
      >
        {icon ? icon(null) : <p>{text}</p>}
      </StyledToolbarItem>
    </span>
  </Tooltip>
)

const ColorPicker = ({ editor }: { editor: Editor }) => (
  <Tooltip title={'color picker'}>
    <StyledColorPicker>
      <input
        type="color"
        onInput={event =>
          editor
            .chain()
            .focus()
            .setColor((event.target as HTMLInputElement).value)
            .run()
        }
        value={editor.getAttributes('textStyle').color}
        defaultValue={colors.neutrals.black}
      />
    </StyledColorPicker>
  </Tooltip>
)

export default EditorToolbar
