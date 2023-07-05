import type { NextPage } from 'next'

import PageLayout from '@components/templates/PageLayout'

import ManagePermissions from '@/components/organisms/ManagePermissions'
import { DefaultActionPermission } from '@/types/enums/defaultActions'
import { DefaultUserModules } from '@/types/enums/defaultModules'
import { useGetEntity } from '@/utils/hooks/useEntity'
import usePermissions from '@/utils/hooks/usePermissions'

const ConfigurationView: NextPage = () => {
  const { isLoading, data: users } = useGetEntity('users/managepermissions')
  const { userCan } = usePermissions()
  const canManagePermissions = userCan(
    DefaultActionPermission.ADMIN_ACCESS,
    DefaultUserModules.CONFIGURATION,
  )

  if (!canManagePermissions) return null

  return (
    <PageLayout pageTitle="Configuration">
      <ManagePermissions users={users} isLoading={isLoading} />
    </PageLayout>
  )
}

export default ConfigurationView
