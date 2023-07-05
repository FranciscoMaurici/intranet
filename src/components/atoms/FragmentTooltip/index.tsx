import MUITooltip from '@mui/material/Tooltip'

import { IProps } from './types'

const FragmentTooltip = ({ children, ...props }: IProps) => (
  <MUITooltip {...props}>
    <div>{children}</div>
  </MUITooltip>
)

export default FragmentTooltip
export type { IProps }
