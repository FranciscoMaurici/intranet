import Link from 'next/link'

import { StyledLink } from './styles'
import { IProps } from './types'

const FragmentLink = ({ href = '', children, ...props }: IProps) => (
  <StyledLink variant="bodyXSmallBold">
    {href ? <Link href={href}>{children}</Link> : <a {...props}>{children}</a>}
  </StyledLink>
)

export default FragmentLink
export type { IProps }
