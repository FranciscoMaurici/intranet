import { HTMLProps, ReactNode } from 'react'
import { LinkProps } from 'next/link'

export type IProps = Omit<LinkProps & HTMLProps<HTMLAnchorElement>, 'href'> & {
  href?: string
  children: ReactNode
}
