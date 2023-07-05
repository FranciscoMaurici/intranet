import { StyledCardInputContainer } from './styles'
import { IProps } from './types'

const CardInputContainer = ({
  children,
  flexDirection = 'row',
  margin,
}: IProps) => (
  <StyledCardInputContainer flexDirection={flexDirection} margin={margin}>
    {children}
  </StyledCardInputContainer>
)

export default CardInputContainer
export type { IProps }
