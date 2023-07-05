export interface IProps {
  menuItems: ICardMenuItems
}

export type ICardMenuItems = Array<IMenuItem>

interface IMenuItem {
  type: 'edit' | 'delete'
  onClick(): void
  canView: boolean
}
