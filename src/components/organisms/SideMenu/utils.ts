import { useSession } from 'next-auth/react'

import { IMenu } from './types'

export const useMenu = (menuKey: string): IMenu | null => {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  const menuEntry = Object.entries(session.user.modulePermission).find(
    ([key]) => key === menuKey,
  )

  if (!menuEntry) {
    return null
  }

  const menuModules = menuEntry[1]
  const moduleValues = Object.values(menuModules)
  const elements = []

  for (const moduleValue of moduleValues) {
    // removes duplicated descriptions
    const permission = moduleValue[0]
    if (
      elements.some(
        element => element.description === permission.module.description,
      )
    )
      continue
    elements.push({
      description: permission.module.description,
      path: permission.module.path,
    })
  }

  return {
    title: menuKey,
    items: elements.map(element => ({
      title: element.description,
      href: element.path,
    })),
  }
}
