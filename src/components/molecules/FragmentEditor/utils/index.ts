import Color from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { generateHTML, generateJSON, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import DOMPurify from 'isomorphic-dompurify'

import CustomIFrame from '../extensions/custom-iframe'
import CustomImage from '../extensions/custom-image'

export const editorExtensions = [
  StarterKit,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Placeholder.configure({
    placeholder: 'Write something …',
    showOnlyWhenEditable: false,
  }),
  Color,
  TextStyle,
  Link.configure({
    openOnClick: false,
  }),
  Underline,
  CustomIFrame,
  CustomImage,
]

export const htmlToEditorContent = (html: string) =>
  generateJSON(html, editorExtensions)

export const editorContentToHTML = (editorContent: JSONContent) =>
  DOMPurify.sanitize(generateHTML(editorContent, editorExtensions), {
    ADD_TAGS: ['iframe'],
  })

export const extractImagesFromHTML = (htmlContent: string) => {
  let m
  const urls = []
  const myRegex = /<img.*?src="([^">]*\/([^">]*?))".*?>/g
  while ((m = myRegex.exec(htmlContent))) {
    urls.push(m[1])
  }
  return urls
}

export const extractImageFromContent = (element, results): Array<string> => {
  if (element.type === CustomImage.name) {
    results.push(element.attrs.src)
  } else if (element.content) {
    element.content.map(e => {
      extractImageFromContent(e, results)
    })
  }

  return Array.from(new Set<string>(results))
}
