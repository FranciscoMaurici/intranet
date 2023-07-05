export interface IProps {
  text: string
  parseLinks?: boolean
  onToggle?: () => void
  isExpanded: boolean
  ariaControl: string
}
