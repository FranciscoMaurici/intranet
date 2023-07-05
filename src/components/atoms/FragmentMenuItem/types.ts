import { ReactNode } from 'react'
import { MenuItemProps } from '@mui/material'

export interface IProps extends MenuItemProps {
  children: ReactNode
}
