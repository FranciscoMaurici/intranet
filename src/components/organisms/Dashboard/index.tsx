import StickyBox from 'react-sticky-box'
import { useSession } from 'next-auth/react'

import PageTitle from '@components/atoms/PageTitle'
import Announcements from '@components/organisms/Announcements'
import DistilleryApps from '@components/organisms/DistilleryApps'

import CelebrationsCard from '../CelebrationsCard'

import { Content, RightContent } from './styles'

import FragmentText from '@/components/atoms/FragmentText'
import { DefaultActionPermission } from '@/types/enums/defaultActions'
import { DefaultUserModules } from '@/types/enums/defaultModules'
import { getFormattedDateString } from '@/utils/dates'
import { useGetEntity } from '@/utils/hooks/useEntity'
import usePermissions from '@/utils/hooks/usePermissions'

const Dashboard = () => {
  const { userCan } = usePermissions()
  const { data: session } = useSession()

  const username = session?.user?.name.split(' ')[0]

  const { isLoading, data: announcements } = useGetEntity('announcements')
  const { isLoading: isLoadingCelebrations, data: celebrations } = useGetEntity(
    'celebrations',
    {
      date: encodeURIComponent(getFormattedDateString()),
    },
  )

  return (
    <>
      <PageTitle>Welcome, {username}</PageTitle>
      <FragmentText>
        {userCan(
          DefaultActionPermission.CREATE,
          DefaultUserModules.ANNOUNCEMENT,
        )
          ? 'What would you like to do today?'
          : 'We have fresh news for you.'}
      </FragmentText>
      <Content>
        {userCan(
          DefaultActionPermission.READ,
          DefaultUserModules.ANNOUNCEMENT,
        ) && (
          <Announcements
            announcements={announcements?.data}
            isLoading={isLoading}
          />
        )}
        <RightContent>
          <StickyBox offsetBottom={15}>
            <CelebrationsCard
              celebrations={celebrations}
              isLoading={isLoadingCelebrations}
            />
            <DistilleryApps />
          </StickyBox>
        </RightContent>
      </Content>
    </>
  )
}

export default Dashboard
