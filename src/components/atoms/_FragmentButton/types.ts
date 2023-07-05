export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}
