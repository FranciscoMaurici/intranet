import { Menu } from '@mui/material'

import { IProps } from './types'

const FragmentMenu = ({ anchorEl, onClose, children, ...props }: IProps) => {
  const open = Boolean(anchorEl)

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      {...props}
    >
      {children}
    </Menu>
  )
}

export default FragmentMenu
export type { IProps }
