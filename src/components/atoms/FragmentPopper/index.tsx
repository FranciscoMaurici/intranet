import { Popper } from '@mui/material'

import { IProps } from './types'

const FragmentPopper = ({ children, open, anchorEl, ...props }: IProps) => (
  <Popper
    open={open}
    anchorEl={anchorEl?.current}
    role={undefined}
    placement="bottom-start"
    transition
    disablePortal
    {...props}
  >
    {children}
  </Popper>
)

export default FragmentPopper
export type { IProps }
