import { ActionPermission } from '@prisma/client'

export const validateModulePermission = (session, entity, action) => {
  if (session?.userData) {
    session.user = session.userData
  }
  if (session?.user?.modulePermission) {
    const entities = entity.split('--OR--')
    const userHasPermission = entities.some(singleEntity =>
      Object.values(session.user.modulePermission)
        .filter(
          modulePermission => modulePermission[singleEntity.toUpperCase()],
        )
        .find(menu => {
          const menusPermission = Object.values(
            menu[singleEntity.toUpperCase()],
          )
          const foundAction = menusPermission.find(
            (actionPermission: Record<string, ActionPermission>) =>
              actionPermission.actionPermission.constant.toUpperCase() ===
                action.toUpperCase() ||
              actionPermission.actionPermission.constant === 'ADMIN_ACCESS',
          )
          return foundAction
        }),
    )

    return userHasPermission
  }
}
