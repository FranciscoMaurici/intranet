import { useState } from 'react'
import type { NextPage } from 'next'

import PageTitle from '@components/atoms/PageTitle'
import PageLayout from '@components/templates/PageLayout'

import FragmentButton from '@/components/atoms/_FragmentButton'
import FragmentText from '@/components/atoms/FragmentText'
import OpenPositions from '@/components/organisms/OpenPositions'
import { HeaderContainer } from '@/components/organisms/TechInterviews/styles'
import { DefaultActionPermission } from '@/types/enums/defaultActions'
import { DefaultUserModules } from '@/types/enums/defaultModules'
import { useGetEntity } from '@/utils/hooks/useEntity'
import usePermissions from '@/utils/hooks/usePermissions'

const PositionsView: NextPage = () => {
  const { userCan } = usePermissions()

  const { isLoading, data: openPositions } = useGetEntity('open-positions')
  const [open, toggleDialog] = useState(false)

  return (
    <PageLayout pageTitle="Positions">
      <HeaderContainer>
        <PageTitle>Open Positions</PageTitle>
        {userCan(
          DefaultActionPermission.CREATE,
          DefaultUserModules.OPENPOSITION,
        ) && (
          <FragmentButton
            type="submit"
            variant="primary"
            onClick={() => toggleDialog(true)}
          >
            Add open position
          </FragmentButton>
        )}
      </HeaderContainer>
      <FragmentText>Check out our new opportunities!</FragmentText>
      {userCan(
        DefaultActionPermission.READ,
        DefaultUserModules.OPENPOSITION,
      ) && (
        <OpenPositions
          openPositions={openPositions?.data}
          isLoading={isLoading}
          open={open}
          toggleDialog={toggleDialog}
        />
      )}
    </PageLayout>
  )
}

export default PositionsView
