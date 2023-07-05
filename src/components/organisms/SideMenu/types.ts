export type IMenuItem = {
  title: string
  href?: string
  onClick?(): void
}

export type SideMenuSection = { items: IMenuItem[] }

export type SideMenu = Array<SideMenuSection>

export type IMenu = { title: string; items: IMenuItem[] }
