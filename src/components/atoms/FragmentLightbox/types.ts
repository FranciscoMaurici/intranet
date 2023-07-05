import { CSSProperties } from 'react'

export interface IProps {
  handleClose(): void
  src: string
  style?: CSSProperties
}
