import { DialogProps } from '@mui/material'

import { IMessageType } from '@tstypes/messages'

import { ILead } from '@/types'

export type IProps = DialogProps & {
  handleClose: (reason?: string) => void
  open: boolean
  isLoading?: boolean
  message?: IMessageType
}

export type LeadFormValues = ILead & {
  country_code: string | number
  '00N6100000I5XNS': string
  oid: string
  retURL: string
  debug: number
  debugEmail: string
}
