import { MenuItem } from '@mui/material'

import { IProps } from './types'

const FragmentMenuItem = ({ children, ...props }: IProps) => (
  <MenuItem {...props}>{children}</MenuItem>
)

export default FragmentMenuItem
export type { IProps }
