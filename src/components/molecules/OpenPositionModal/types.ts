import { DialogProps } from '@mui/material'

import { IOpenPositionPostPutRequest } from '@/types'

export type TProps = DialogProps & {
  handleClose: (reason?: string) => void
  open: boolean
  openPosition: IOpenPositionPostPutRequest & { id?: number }
  isLoading: boolean
}

export type TOpenPositionFormValues = IOpenPositionPostPutRequest
