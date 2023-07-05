import { FragmentButtonStyled } from './styles'
import { IProps } from './types'

const FragmentButton = (props: IProps) => (
  <FragmentButtonStyled
    data-testid={props.children.toString().replace(/,/g, '')}
    {...props}
  />
)

export default FragmentButton
export type { IProps }
