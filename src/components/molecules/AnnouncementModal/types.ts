import { DialogProps } from '@mui/material'
import { JSONContent } from '@tiptap/react'

import { IMessageType } from '@tstypes/messages'

import { IAnnouncement } from '@/types'

export type IProps = DialogProps & {
  handleClose: (reason?: string) => void
  open: boolean
  announcement: Partial<IAnnouncement>
  isLoading: boolean
  message?: IMessageType
}

export type AnnouncementFormValues = IAnnouncement & {
  media?: FileList
  content: string | JSONContent
}
