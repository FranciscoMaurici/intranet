import { ReactNode } from 'react'

export default interface IProps {
  children: ReactNode
  isExpanded: boolean
  initialHeight?: string | number
  onAnimationStart?: () => void
  onAnimationComplete?: () => void
  animate?: Record<string, unknown>
  transition?: Record<string, unknown>
  exit?: Record<string, unknown>
}
