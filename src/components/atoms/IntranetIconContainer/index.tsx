import { IconContainer } from './styles'
import { IProps } from './types'

const IntranetIconContainer = ({
  size = '3em',
  iconSize = '1.7em',
  borderRadius = '0.5em',
  rightMargin = '0',
  color = 'inherit',
  children,
}: IProps) => (
  <IconContainer
    color={color}
    size={size}
    iconSize={iconSize}
    borderRadius={borderRadius}
    rightMargin={rightMargin}
  >
    <div>{children}</div>
  </IconContainer>
)

export default IntranetIconContainer
export type { IProps }
