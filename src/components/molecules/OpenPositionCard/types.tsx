import { OpenPosition } from '@prisma/client'

export type IProps = {
  openPosition: OpenPosition
  handleOpenEditDialog: () => void
  handleOpenDeleteDialog: () => void
  onToggle?: () => void
  isExpanded: boolean
}
