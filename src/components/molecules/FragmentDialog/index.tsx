import { FragmentDialogStyled } from './styles'
import { IProps } from './types'

const FragmentDialog = (props: IProps) => (
  <FragmentDialogStyled {...props} disableScrollLock />
)

export default FragmentDialog
export type { IProps }
