import { DialogProps } from '@mui/material'

export type IProps = DialogProps & {
  handleClose: (reason?: string) => void
  handleConfirm?: () => void
  open: boolean
  message: string
  title: string
  isLoading: boolean
  formId?: string
}
