import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'

import { selectPermissions } from '@slices/userSlice'

import { validateModulePermission } from '@/utils/validateModulePermission'

const usePermissions = () => {
  const { data: session } = useSession()
  const statePermissions = useSelector(selectPermissions)

  const userCan = useCallback(
    (action, entity) => validateModulePermission(session, entity, action),
    [session, statePermissions],
  )

  const permissions = useMemo(
    () => ({
      userCan,
      ...statePermissions,
    }),
    [userCan, statePermissions],
  )

  return permissions
}

export default usePermissions
