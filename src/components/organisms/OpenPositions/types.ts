import { Dispatch, SetStateAction } from 'react'

import { OpenPosition } from '@prisma/client'

export interface IProps {
  openPositions: OpenPosition[] | null
  isLoading: boolean
  open: boolean
  toggleDialog: Dispatch<SetStateAction<boolean>>
}
