import type { ReactNode } from 'react'

export interface IProps {
  children: ReactNode
}

export interface Tab {
  title: string
  href: string
}

export type Tabs = Array<Tab>
