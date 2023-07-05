import { IAnnouncement } from '@/types'

export interface IProps {
  announcement: IAnnouncement
  handleOpenEditDialog: () => void
  handleOpenDeleteDialog: () => void
}
