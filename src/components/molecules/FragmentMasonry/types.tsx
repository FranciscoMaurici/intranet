import React from 'react'

export interface IProps {
  children: React.ReactNode[] | JSX.Element[]
  columns?: number
  gapSize?: string
}
