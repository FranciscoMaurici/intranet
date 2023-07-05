import { PageTitleStyled } from './styles'
import { IProps } from './types'

const PageTitle = ({ children }: IProps) => (
  <PageTitleStyled>{children}</PageTitleStyled>
)

export default PageTitle
export type { IProps }
