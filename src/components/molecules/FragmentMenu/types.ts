import { ReactNode } from 'react'
import { MenuProps } from '@mui/material'

export type IProps = Omit<MenuProps, 'open'> & {
  children: ReactNode
}
