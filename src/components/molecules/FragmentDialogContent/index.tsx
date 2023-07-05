import { FragmentDialogContentStyled } from './styles'
import { IProps } from './types'

const FragmentDialogContent = ({ fullWidth, ...props }: IProps) => (
  <FragmentDialogContentStyled
    className={fullWidth ? 'full-w' : ''}
    {...props}
  />
)

export default FragmentDialogContent
export type { IProps }
