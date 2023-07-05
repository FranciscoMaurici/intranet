export interface IFragmentCardItem {
  title: string
  description: string
  iconSrc: string
  actionButton?: LinkActionButton | CustomActionButton
  alt?: string
}

interface LinkActionButton {
  type: 'link'
  href: string
  title?: string
}

interface CustomActionButton {
  type: 'custom'
  onClick(): void
  title?: string
}
